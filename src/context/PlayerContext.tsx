import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Song } from "../types";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface PersistedPlayerState {
  queue: Song[];
  currentIndex: number;
  currentSongId: string | null;
  elapsed: number;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  isPlaying: boolean;
  likedSongIds: string[];
  recentlyPlayed: Song[];
  playbackSpeed: number;
  progressBySongId: Record<string, number>;
}

interface PlayerState {
  queue: Song[];
  originalQueue: Song[];
  currentIndex: number;
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  elapsed: number;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  playbackSpeed: number;
  likedSongIds: string[];
  recentlyPlayed: Song[];
  upNext: Song[];
  playSong: (song: Song, queue?: Song[]) => void;
  playQueueIndex: (index: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (ratio: number) => void;
  seekToSeconds: (seconds: number) => void;
  setVolume: (v: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleLike: (song: Song) => void;
  setPlaybackSpeed: (speed: number) => void;
}

const PlayerContext = createContext<PlayerState | null>(null);
const STORAGE_KEY = "wavelength-player-state";
const LIKED_SONGS_STORAGE_KEY = "wavelength-liked-song-ids";

function readStoredLikedSongIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LIKED_SONGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readPersistedState(defaultSongs: Song[]): PersistedPlayerState {
  if (typeof window === "undefined") {
    return {
      queue: defaultSongs,
      currentIndex: -1,
      currentSongId: null,
      elapsed: 0,
      volume: 0.8,
      shuffle: false,
      repeat: "off",
      isPlaying: false,
      likedSongIds: [],
      recentlyPlayed: [],
      playbackSpeed: 1,
      progressBySongId: {},
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const storedLikedSongIds = readStoredLikedSongIds();
    if (!raw) {
      return {
        queue: defaultSongs,
        currentIndex: -1,
        currentSongId: null,
        elapsed: 0,
        volume: 0.8,
        shuffle: false,
        repeat: "off",
        isPlaying: false,
        likedSongIds: storedLikedSongIds,
        recentlyPlayed: [],
        playbackSpeed: 1,
        progressBySongId: {},
      };
    }
    const parsed = JSON.parse(raw) as Partial<PersistedPlayerState>;
    return {
      queue: Array.isArray(parsed.queue) ? parsed.queue : defaultSongs,
      currentIndex: parsed.currentIndex ?? -1,
      currentSongId: parsed.currentSongId ?? null,
      elapsed: parsed.elapsed ?? 0,
      volume: parsed.volume ?? 0.8,
      shuffle: parsed.shuffle ?? false,
      repeat: parsed.repeat ?? "off",
      isPlaying: parsed.isPlaying ?? false,
      likedSongIds: Array.isArray(parsed.likedSongIds) ? parsed.likedSongIds : storedLikedSongIds,
      recentlyPlayed: Array.isArray(parsed.recentlyPlayed) ? parsed.recentlyPlayed : [],
      playbackSpeed: parsed.playbackSpeed ?? 1,
      progressBySongId: parsed.progressBySongId ?? {},
    };
  } catch {
    return {
      queue: defaultSongs,
      currentIndex: -1,
      currentSongId: null,
      elapsed: 0,
      volume: 0.8,
      shuffle: false,
      repeat: "off",
      isPlaying: false,
      likedSongIds: [],
      recentlyPlayed: [],
      playbackSpeed: 1,
      progressBySongId: {},
    };
  }
}

export function PlayerProvider({
  children,
  songs,
}: {
  children: ReactNode;
  songs: Song[];
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const persistedState = useMemo(() => readPersistedState(songs), [songs]);

  const [queue, setQueue] = useState<Song[]>(() => persistedState.queue.length ? persistedState.queue : songs);
  const [originalQueue, setOriginalQueue] = useState<Song[]>(() => persistedState.queue.length ? persistedState.queue : songs);
  const [currentIndex, setCurrentIndex] = useState<number>(() => persistedState.currentIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(() => persistedState.elapsed);
  const [volume, setVolumeState] = useState(() => persistedState.volume);
  const [shuffle, setShuffle] = useState(() => persistedState.shuffle);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">(() => persistedState.repeat);
  const [playbackSpeed, setPlaybackSpeedState] = useState(() => persistedState.playbackSpeed);
  const [likedSongIds, setLikedSongIds] = useState<string[]>(() => persistedState.likedSongIds);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>(() => persistedState.recentlyPlayed);
  const [progressBySongId, setProgressBySongId] = useState<Record<string, number>>(() => persistedState.progressBySongId);
  const [isReady, setIsReady] = useState(false);

  const currentSong = currentIndex >= 0 ? queue[currentIndex] ?? null : null;
  const upNext =
    currentIndex >= 0 && currentIndex < queue.length - 1
      ? queue.slice(currentIndex + 1)
      : [];

  const stateRef = useRef({ repeat, queue, currentIndex, shuffle, currentSong, songs, originalQueue, progressBySongId });
  useEffect(() => {
    stateRef.current = { repeat, queue, currentIndex, shuffle, currentSong, songs, originalQueue, progressBySongId };
  }, [repeat, queue, currentIndex, shuffle, currentSong, songs, originalQueue, progressBySongId]);

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "metadata";
      a.volume = volume;
      audioRef.current = a;
      a.addEventListener("timeupdate", () => {
        if (!a.duration) return;
        const nextElapsed = a.currentTime;
        setElapsed(nextElapsed);
        setProgress(nextElapsed / a.duration);
        setProgressBySongId((prev) => {
          if (!currentSong?.id) return prev;
          const next = { ...prev, [currentSong.id]: nextElapsed };
          return next;
        });
      });
      a.addEventListener("loadedmetadata", () => {
        setDuration(a.duration || 0);
        const resumeFrom = currentSong?.id ? progressBySongId[currentSong.id] ?? persistedState.elapsed : 0;
        if (resumeFrom > 0) {
          a.currentTime = Math.min(resumeFrom, a.duration || resumeFrom);
          setElapsed(Math.min(resumeFrom, a.duration || resumeFrom));
          setProgress((Math.min(resumeFrom, a.duration || resumeFrom)) / (a.duration || 1));
        }
      });
      a.addEventListener("ended", () => {
        handleEnded();
      });
      a.addEventListener("play", () => setIsPlaying(true));
      a.addEventListener("pause", () => setIsPlaying(false));
      a.addEventListener("canplay", () => setIsReady(true));
    }
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !currentSong) {
      if (!currentSong) {
        setProgress(0);
        setDuration(0);
        setElapsed(0);
      }
      return;
    }

    const resumeFrom = progressBySongId[currentSong.id] ?? persistedState.elapsed;
    if (a.src !== currentSong.audioUrl) {
      a.src = currentSong.audioUrl;
      a.load();
    }
    a.playbackRate = playbackSpeed;
    if (resumeFrom > 0 && a.duration) {
      a.currentTime = Math.min(resumeFrom, a.duration);
      setElapsed(Math.min(resumeFrom, a.duration));
      setProgress(Math.min(resumeFrom, a.duration) / (a.duration || 1));
    }

    a.play().catch(() => {
      setIsPlaying(false);
    });
  }, [currentSong?.id, playbackSpeed]);

  useEffect(() => {
    if (!currentSong) return;
    setRecentlyPlayed((prev) => {
      const next = [currentSong, ...prev.filter((song) => song.id !== currentSong.id)].slice(0, 12);
      return next;
    });
  }, [currentSong?.id]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const persisted = {
      queue,
      currentIndex,
      currentSongId: currentSong?.id ?? null,
      elapsed,
      volume,
      shuffle,
      repeat,
      isPlaying,
      likedSongIds,
      recentlyPlayed,
      playbackSpeed,
      progressBySongId,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    window.localStorage.setItem(LIKED_SONGS_STORAGE_KEY, JSON.stringify(likedSongIds));
  }, [queue, currentIndex, elapsed, volume, shuffle, repeat, isPlaying, likedSongIds, recentlyPlayed, playbackSpeed, progressBySongId, currentSong?.id]);

  useEffect(() => {
    if (songs.length === 0) return;
    const hasCurrent = queue.some((song) => song.id === currentSong?.id);
    if (!hasCurrent && currentSong) {
      setQueue(songs);
      setOriginalQueue(songs);
      setCurrentIndex(-1);
    }
  }, [songs, queue, currentSong?.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>("[data-global-search]");
        searchInput?.focus();
        return;
      }
      if (isTyping) return;
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setVolume(Math.min(1, volume + 0.05));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setVolume(Math.max(0, volume - 0.05));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [volume]);

  useEffect(() => {
    if (!navigator.mediaSession) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong?.title ?? "Wavelength",
      artist: currentSong?.artist ?? "Wavelength",
      album: currentSong?.album ?? "Music",
      artwork: currentSong?.coverUrl
        ? [{ src: currentSong.coverUrl, sizes: "512x512", type: "image/jpeg" }]
        : [],
    });
    navigator.mediaSession.setActionHandler("play", () => togglePlay());
    navigator.mediaSession.setActionHandler("pause", () => togglePlay());
    navigator.mediaSession.setActionHandler("previoustrack", () => prev());
    navigator.mediaSession.setActionHandler("nexttrack", () => next());
    navigator.mediaSession.setActionHandler("seekbackward", () => {
      const a = audioRef.current;
      if (a) a.currentTime = Math.max(0, a.currentTime - 10);
    });
    navigator.mediaSession.setActionHandler("seekforward", () => {
      const a = audioRef.current;
      if (a) a.currentTime = Math.min(a.duration || 0, a.currentTime + 10);
    });
  }, [currentSong?.id, currentSong?.title, currentSong?.artist, currentSong?.album, currentSong?.coverUrl]);

  const handleEnded = () => {
    const { repeat: r } = stateRef.current;
    if (r === "one") {
      const a = audioRef.current;
      if (a) {
        a.currentTime = 0;
        a.play();
      }
      return;
    }
    goNext(true);
  };

  const goNext = (auto = false) => {
    const { queue: q, currentIndex: idx, repeat: r } = stateRef.current;
    if (q.length === 0) return;
    let nextIndex = idx + 1;
    if (nextIndex >= q.length) {
      const sourceList = stateRef.current.originalQueue.length ? stateRef.current.originalQueue : songs;
      const nextQueue = shuffleArray(sourceList);
      setOriginalQueue(sourceList);
      setQueue(nextQueue);
      setCurrentIndex(0);
      if (auto) setIsPlaying(true);
      return;
    }
    if (r === "off" && nextIndex >= q.length) {
      if (auto) setIsPlaying(false);
      return;
    }
    setCurrentIndex(nextIndex);
  };

  const playSong = (song: Song, newQueue?: Song[]) => {
    const source = newQueue ?? originalQueue.length ? originalQueue : songs;
    if (newQueue) setOriginalQueue(newQueue);
    const normalized = (newQueue ?? source).filter(Boolean);
    const playOrder = shuffle ? shuffleArray(normalized) : normalized;
    const idx = playOrder.findIndex((s) => s.id === song.id);
    let finalQueue = playOrder;
    let finalIndex = idx;
    if (idx === -1) {
      finalQueue = [song, ...playOrder];
      finalIndex = 0;
    } else if (shuffle && idx !== 0) {
      const [selected] = playOrder.splice(idx, 1);
      finalQueue = [selected, ...playOrder];
      finalIndex = 0;
    }
    setOriginalQueue(normalized);
    setQueue(finalQueue);
    setCurrentIndex(finalIndex);
    setIsPlaying(true);
    if (song.id) {
      setProgressBySongId((prev) => ({ ...prev, [song.id]: 0 }));
    }
  };

  const playQueueIndex = (index: number) => {
    if (index < 0 || index >= queue.length) return;
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !currentSong) {
      if (queue.length > 0 && currentIndex === -1) {
        setCurrentIndex(0);
      }
      return;
    }
    if (a.paused) {
      a.play().catch(() => setIsPlaying(false));
    } else {
      a.pause();
    }
  };

  const next = () => goNext(false);
  const prev = () => {
    const a = audioRef.current;
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      setElapsed(0);
      setProgress(0);
      return;
    }
    if (queue.length === 0) return;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = queue.length - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const seek = (ratio: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const next = Math.max(0, Math.min(1, ratio)) * a.duration;
    a.currentTime = next;
    setElapsed(next);
    setProgress(next / a.duration);
    if (currentSong?.id) {
      setProgressBySongId((prev) => ({ ...prev, [currentSong.id]: next }));
    }
  };

  const seekToSeconds = (seconds: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const clamped = Math.max(0, Math.min(a.duration, seconds));
    a.currentTime = clamped;
    setElapsed(clamped);
    setProgress(clamped / a.duration);
    if (currentSong?.id) {
      setProgressBySongId((prev) => ({ ...prev, [currentSong.id]: clamped }));
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  };

  const toggleShuffle = () => {
    setShuffle((s) => {
      const turningOn = !s;
      if (turningOn) {
        const current = currentSong;
        const rest = queue.filter((song) => song.id !== current?.id);
        const shuffled = shuffleArray(rest);
        const nextQueue = current ? [current, ...shuffled] : shuffled;
        setQueue(nextQueue);
        setCurrentIndex(current ? 0 : -1);
      } else {
        const current = currentSong;
        const nextQueue = originalQueue;
        setQueue(nextQueue);
        if (current) {
          const idx = nextQueue.findIndex((song) => song.id === current.id);
          setCurrentIndex(idx === -1 ? 0 : idx);
        }
      }
      return turningOn;
    });
  };

  const cycleRepeat = () =>
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));

  const toggleLike = (song: Song) => {
    setLikedSongIds((prev) => {
      if (prev.includes(song.id)) return prev.filter((item) => item !== song.id);
      return [...prev, song.id];
    });
  };

  const setPlaybackSpeed = (speed: number) => {
    const nextSpeed = Math.max(0.5, Math.min(2, speed));
    setPlaybackSpeedState(nextSpeed);
  };

  return (
    <PlayerContext.Provider
      value={{
        queue,
        originalQueue,
        currentIndex,
        currentSong,
        isPlaying,
        progress,
        duration,
        elapsed,
        volume,
        shuffle,
        repeat,
        playbackSpeed,
        likedSongIds,
        recentlyPlayed,
        upNext,
        playSong,
        playQueueIndex,
        togglePlay,
        next,
        prev,
        seek,
        seekToSeconds,
        setVolume,
        toggleShuffle,
        cycleRepeat,
        toggleLike,
        setPlaybackSpeed,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

export function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
