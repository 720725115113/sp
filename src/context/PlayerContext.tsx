import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AudioQuality, Playlist, Song, Toast } from "../types";

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
  audioQuality: AudioQuality;
  customPlaylists: Playlist[];
  searchHistory: string[];
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
  audioQuality: AudioQuality;
  sleepTimer: number | null;
  likedSongIds: string[];
  recentlyPlayed: Song[];
  upNext: Song[];
  customPlaylists: Playlist[];
  searchHistory: string[];
  toasts: Toast[];
  
  playSong: (song: Song, queue?: Song[]) => void;
  playQueueIndex: (index: number) => void;
  playNext: (song: Song) => void;
  playLast: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
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
  setAudioQuality: (q: AudioQuality) => void;
  setSleepTimerMinutes: (minutes: number | null) => void;

  createPlaylist: (name: string, description?: string, isPrivate?: boolean, isCollaborative?: boolean) => Playlist;
  renamePlaylist: (id: string, name: string) => void;
  deletePlaylist: (id: string) => void;
  togglePinPlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;

  addSearchHistory: (query: string) => void;
  removeSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;

  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
}

const PlayerContext = createContext<PlayerState | null>(null);
const STORAGE_KEY = "wavelength-player-state-v3";

function readPersistedState(defaultSongs: Song[]): PersistedPlayerState {
  const fallback: PersistedPlayerState = {
    queue: defaultSongs,
    currentIndex: -1,
    currentSongId: null,
    elapsed: 0,
    volume: 0.85,
    shuffle: false,
    repeat: "off",
    isPlaying: false,
    likedSongIds: [],
    recentlyPlayed: [],
    playbackSpeed: 1,
    audioQuality: "high",
    customPlaylists: [],
    searchHistory: ["A.R. Rahman", "Anirudh", "Modern Classical", "Lo-Fi Beats"],
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedPlayerState>;
    return {
      queue: Array.isArray(parsed.queue) && parsed.queue.length ? parsed.queue : defaultSongs,
      currentIndex: parsed.currentIndex ?? -1,
      currentSongId: parsed.currentSongId ?? null,
      elapsed: 0, // Always reset progress to 0 on state read
      volume: parsed.volume ?? 0.85,
      shuffle: parsed.shuffle ?? false,
      repeat: parsed.repeat ?? "off",
      isPlaying: parsed.isPlaying ?? false,
      likedSongIds: Array.isArray(parsed.likedSongIds) ? parsed.likedSongIds : [],
      recentlyPlayed: Array.isArray(parsed.recentlyPlayed) ? parsed.recentlyPlayed : [],
      playbackSpeed: parsed.playbackSpeed ?? 1,
      audioQuality: parsed.audioQuality ?? "high",
      customPlaylists: Array.isArray(parsed.customPlaylists) ? parsed.customPlaylists : [],
      searchHistory: Array.isArray(parsed.searchHistory) ? parsed.searchHistory : fallback.searchHistory,
    };
  } catch {
    return fallback;
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
  const preloadAudioRef = useRef<HTMLAudioElement | null>(null);
  const isInitialMountRef = useRef(true);
  const persistedState = useMemo(() => readPersistedState(songs), [songs]);

  const [queue, setQueue] = useState<Song[]>(() => persistedState.queue);
  const [originalQueue, setOriginalQueue] = useState<Song[]>(() => persistedState.queue);
  const [currentIndex, setCurrentIndex] = useState<number>(() => persistedState.currentIndex);
  const [isPlaying, setIsPlaying] = useState(() => persistedState.isPlaying);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolumeState] = useState(() => persistedState.volume);
  const [shuffle, setShuffle] = useState(() => persistedState.shuffle);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">(() => persistedState.repeat);
  const [playbackSpeed, setPlaybackSpeedState] = useState(() => persistedState.playbackSpeed);
  const [audioQuality, setAudioQualityState] = useState<AudioQuality>(() => persistedState.audioQuality);
  const [likedSongIds, setLikedSongIds] = useState<string[]>(() => persistedState.likedSongIds);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>(() => persistedState.recentlyPlayed);
  const [customPlaylists, setCustomPlaylists] = useState<Playlist[]>(() => persistedState.customPlaylists);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => persistedState.searchHistory);
  const [sleepTimerSeconds, setSleepTimerSeconds] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const currentSong = currentIndex >= 0 && currentIndex < queue.length ? queue[currentIndex] : null;
  const upNext = currentIndex >= 0 && currentIndex < queue.length - 1 ? queue.slice(currentIndex + 1, currentIndex + 50) : [];

  const stateRef = useRef({ repeat, queue, currentIndex, shuffle, currentSong, songs, originalQueue });
  useEffect(() => {
    stateRef.current = { repeat, queue, currentIndex, shuffle, currentSong, songs, originalQueue };
  }, [repeat, queue, currentIndex, shuffle, currentSong, songs, originalQueue]);

  // Toasts
  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Ultra-Fast Low-Latency Audio Engine
  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
      a.volume = volume;
      audioRef.current = a;

      a.addEventListener("timeupdate", () => {
        if (!a.duration) return;
        const cur = a.currentTime;
        setElapsed(cur);
        setProgress(cur / a.duration);
      });

      a.addEventListener("loadedmetadata", () => {
        setDuration(a.duration || 0);
      });

      a.addEventListener("ended", () => {
        handleEnded();
      });

      a.addEventListener("error", () => {
        if (a.src) {
          setTimeout(() => {
            a.load();
            if (stateRef.current.currentSong) {
              a.play().catch(() => {});
            }
          }, 300);
        }
      });

      a.addEventListener("play", () => setIsPlaying(true));
      a.addEventListener("pause", () => setIsPlaying(false));
    }
  }, []);

  // Sleep timer countdown
  useEffect(() => {
    if (sleepTimerSeconds === null) return;
    if (sleepTimerSeconds <= 0) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        addToast("Sleep timer finished. Music paused.", "info");
      }
      setSleepTimerSeconds(null);
      return;
    }

    const timer = setInterval(() => {
      setSleepTimerSeconds((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [sleepTimerSeconds]);

  // Volume & Speed effects
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // INSTANT SUB-MILLISECOND PLAYBACK & ALWAYS START FROM 0:00 SECONDS
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !currentSong) return;

    const targetUrl = currentSong.audioUrl;
    if (a.src !== targetUrl) {
      a.src = targetUrl;
      a.currentTime = 0; // ALWAYS FORCE START FROM 0:00 (0 MILLISECONDS)
      setElapsed(0);
      setProgress(0);
      a.load();
    } else {
      // Re-triggering same song: force start from 0:00
      a.currentTime = 0;
      setElapsed(0);
      setProgress(0);
    }
    a.playbackRate = playbackSpeed;

    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      if (persistedState.isPlaying) {
        a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    } else {
      // Immediate millisecond start from 0sec on track change
      a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    // Preload next track in queue
    const nextSong = queue[currentIndex + 1];
    if (nextSong) {
      if (!preloadAudioRef.current) {
        preloadAudioRef.current = new Audio();
        preloadAudioRef.current.preload = "auto";
      }
      preloadAudioRef.current.src = nextSong.audioUrl;
      preloadAudioRef.current.load();
    }
  }, [currentSong?.id, currentIndex]);

  // Update recently played
  useEffect(() => {
    if (!currentSong) return;
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((s) => s.id !== currentSong.id);
      return [currentSong, ...filtered].slice(0, 16);
    });
  }, [currentSong?.id]);

  // Persist state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: PersistedPlayerState = {
      queue,
      currentIndex,
      currentSongId: currentSong?.id ?? null,
      elapsed: 0,
      volume,
      shuffle,
      repeat,
      isPlaying,
      likedSongIds,
      recentlyPlayed,
      playbackSpeed,
      audioQuality,
      customPlaylists,
      searchHistory,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore quota limits
    }
  }, [queue, currentIndex, volume, shuffle, repeat, isPlaying, likedSongIds, recentlyPlayed, playbackSpeed, audioQuality, customPlaylists, searchHistory, currentSong?.id]);

  // Keyboard Shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>("[data-global-search]");
        input?.focus();
        return;
      }
      if (isInput) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setVolume(Math.min(1, volume + 0.05));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setVolume(Math.max(0, volume - 0.05));
      } else if (e.key.toLowerCase() === "l" && currentSong) {
        e.preventDefault();
        toggleLike(currentSong);
      } else if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        toggleShuffle();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        cycleRepeat();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setVolume(volume > 0 ? 0 : 0.85);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [volume, currentSong]);

  // Web Media Session integration
  useEffect(() => {
    if (!navigator.mediaSession || !currentSong) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.title,
      artist: currentSong.artist,
      album: currentSong.album ?? "Wavelength",
      artwork: currentSong.coverUrl
        ? [{ src: currentSong.coverUrl, sizes: "512x512", type: "image/jpeg" }]
        : [],
    });

    navigator.mediaSession.setActionHandler("play", () => togglePlay());
    navigator.mediaSession.setActionHandler("pause", () => togglePlay());
    navigator.mediaSession.setActionHandler("previoustrack", () => prev());
    navigator.mediaSession.setActionHandler("nexttrack", () => next());
    navigator.mediaSession.setActionHandler("seekbackward", () => seekToSeconds(Math.max(0, elapsed - 10)));
    navigator.mediaSession.setActionHandler("seekforward", () => seekToSeconds(Math.min(duration, elapsed + 10)));
  }, [currentSong?.id, elapsed, duration]);

  const handleEnded = () => {
    const { repeat: r } = stateRef.current;
    if (r === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setElapsed(0);
        setProgress(0);
        audioRef.current.play();
      }
      return;
    }
    goNext(true);
  };

  const goNext = (auto = false) => {
    const { queue: q, currentIndex: idx } = stateRef.current;
    if (q.length === 0) return;
    let nextIndex = idx + 1;
    if (nextIndex >= q.length) {
      if (stateRef.current.repeat === "all") {
        nextIndex = 0;
      } else {
        if (auto) setIsPlaying(false);
        return;
      }
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // FORCE INSTANT 0 SECONDS ON NEXT TRACK
    }
    setElapsed(0);
    setProgress(0);
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const playSong = (song: Song, newQueue?: Song[]) => {
    const source = newQueue ?? (originalQueue.length ? originalQueue : songs);
    const normalized = source.filter(Boolean);
    
    let playOrder = [...normalized];
    if (shuffle) {
      const rest = playOrder.filter((s) => s.id !== song.id);
      playOrder = [song, ...shuffleArray(rest)];
    }

    const idx = playOrder.findIndex((s) => s.id === song.id);
    const finalIndex = idx >= 0 ? idx : 0;
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // FORCE INSTANT 0 SECONDS ON PLAY CLICK
    }
    setOriginalQueue(normalized);
    setQueue(playOrder);
    setCurrentIndex(finalIndex);
    setElapsed(0);
    setProgress(0);
    setIsPlaying(true);
    addToast(`Playing "${song.title}"`, "info");
  };

  const playQueueIndex = (index: number) => {
    if (index < 0 || index >= queue.length) return;
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // FORCE INSTANT 0 SECONDS
    }
    setElapsed(0);
    setProgress(0);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const playNext = (song: Song) => {
    setQueue((prev) => {
      const nextQ = [...prev];
      const insertAt = currentIndex >= 0 ? currentIndex + 1 : 0;
      nextQ.splice(insertAt, 0, song);
      return nextQ;
    });
    addToast(`"${song.title}" added to play next`, "info");
  };

  const playLast = (song: Song) => {
    setQueue((prev) => [...prev, song]);
    addToast(`"${song.title}" added to queue`, "info");
  };

  const removeFromQueue = (index: number) => {
    if (index < 0 || index >= queue.length) return;
    setQueue((prev) => prev.filter((_, i) => i !== index));
    if (index < currentIndex) {
      setCurrentIndex((prev) => prev - 1);
    }
    addToast("Removed from queue", "info");
  };

  const reorderQueue = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= queue.length || toIndex < 0 || toIndex >= queue.length) return;
    setQueue((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !currentSong) {
      if (queue.length > 0) setCurrentIndex(0);
      return;
    }
    if (a.paused) {
      a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      a.pause();
      setIsPlaying(false);
    }
  };

  const next = () => goNext(false);

  const prev = () => {
    const a = audioRef.current;
    if (a) {
      a.currentTime = 0; // FORCE INSTANT 0 SECONDS ON PREV
    }
    setElapsed(0);
    setProgress(0);

    if (queue.length === 0) return;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = queue.length - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const seek = (ratio: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const nextSec = Math.max(0, Math.min(1, ratio)) * a.duration;
    a.currentTime = nextSec;
    setElapsed(nextSec);
    setProgress(ratio);
  };

  const seekToSeconds = (seconds: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const clamped = Math.max(0, Math.min(a.duration, seconds));
    a.currentTime = clamped;
    setElapsed(clamped);
    setProgress(clamped / a.duration);
  };

  const setVolume = (v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  };

  const toggleShuffle = () => {
    setShuffle((prevShuffle) => {
      const nextShuffle = !prevShuffle;
      if (nextShuffle) {
        if (currentSong) {
          const rest = originalQueue.filter((s) => s.id !== currentSong.id);
          const shuffledQueue = [currentSong, ...shuffleArray(rest)];
          setQueue(shuffledQueue);
          setCurrentIndex(0);
        } else {
          setQueue(shuffleArray(originalQueue));
        }
        addToast("Shuffle enabled", "info");
      } else {
        setQueue(originalQueue);
        if (currentSong) {
          const idx = originalQueue.findIndex((s) => s.id === currentSong.id);
          setCurrentIndex(idx >= 0 ? idx : 0);
        }
        addToast("Shuffle disabled", "info");
      }
      return nextShuffle;
    });
  };

  const cycleRepeat = () => {
    setRepeat((r) => {
      const nextR = r === "off" ? "all" : r === "all" ? "one" : "off";
      addToast(`Repeat ${nextR}`, "info");
      return nextR;
    });
  };

  const toggleLike = (song: Song) => {
    setLikedSongIds((prev) => {
      const isLiked = prev.includes(song.id);
      if (isLiked) {
        addToast(`Removed "${song.title}" from Liked Songs`, "info");
        return prev.filter((id) => id !== song.id);
      }
      addToast(`Added "${song.title}" to Liked Songs`, "success");
      return [...prev, song.id];
    });
  };

  const setPlaybackSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    addToast(`Speed: ${speed}x`, "info");
  };

  const setAudioQuality = (q: AudioQuality) => {
    setAudioQualityState(q);
    addToast(`Audio Quality: ${q.toUpperCase()}`, "info");
  };

  const setSleepTimerMinutes = (minutes: number | null) => {
    if (minutes === null) {
      setSleepTimerSeconds(null);
      addToast("Sleep timer off", "info");
    } else {
      setSleepTimerSeconds(minutes * 60);
      addToast(`Sleep timer set for ${minutes} minutes`, "info");
    }
  };

  const createPlaylist = (name: string, description = "", isPrivate = false, isCollaborative = false): Playlist => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: name.trim() || "My Playlist",
      description,
      coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
      songIds: [],
      isPrivate,
      isCollaborative,
      isPinned: false,
    };
    setCustomPlaylists((prev) => [newPlaylist, ...prev]);
    addToast(`Created playlist "${newPlaylist.name}"`, "success");
    return newPlaylist;
  };

  const renamePlaylist = (id: string, newName: string) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
    addToast("Playlist renamed", "info");
  };

  const deletePlaylist = (id: string) => {
    setCustomPlaylists((prev) => prev.filter((p) => p.id !== id));
    addToast("Playlist deleted", "info");
  };

  const togglePinPlaylist = (id: string) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPinned: !p.isPinned } : p))
    );
  };

  const addSongToPlaylist = (playlistId: string, songId: string) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id !== playlistId) return p;
        if (p.songIds.includes(songId)) return p;
        return { ...p, songIds: [...p.songIds, songId] };
      })
    );
    addToast("Added track to playlist", "success");
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id !== playlistId) return p;
        return { ...p, songIds: p.songIds.filter((id) => id !== songId) };
      })
    );
    addToast("Removed track from playlist", "info");
  };

  const addSearchHistory = (query: string) => {
    const q = query.trim();
    if (!q) return;
    setSearchHistory((prev) => [q, ...prev.filter((item) => item.toLowerCase() !== q.toLowerCase())].slice(0, 10));
  };

  const removeSearchHistory = (query: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== query));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
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
        audioQuality,
        sleepTimer: sleepTimerSeconds,
        likedSongIds,
        recentlyPlayed,
        upNext,
        customPlaylists,
        searchHistory,
        toasts,

        playSong,
        playQueueIndex,
        playNext,
        playLast,
        removeFromQueue,
        reorderQueue,
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
        setAudioQuality,
        setSleepTimerMinutes,

        createPlaylist,
        renamePlaylist,
        deletePlaylist,
        togglePinPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,

        addSearchHistory,
        removeSearchHistory,
        clearSearchHistory,

        addToast,
        removeToast,
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
