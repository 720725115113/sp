import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Song } from "../types";
import { songs as allSongs } from "../data/songs";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface PlayerState {
  queue: Song[]; // the list currently being played from, in play order
  originalQueue: Song[]; // the un-shuffled source order (for restoring)
  currentIndex: number;
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number; // 0..1
  duration: number; // seconds
  elapsed: number; // seconds
  volume: number; // 0..1
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  upNext: Song[]; // songs coming up after the current one, in play order
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
}

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [originalQueue, setOriginalQueue] = useState<Song[]>(allSongs);
  const [queue, setQueue] = useState<Song[]>(allSongs);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">("off");

  const currentSong = currentIndex >= 0 ? queue[currentIndex] ?? null : null;
  const upNext =
    currentIndex >= 0 && currentIndex < queue.length - 1
      ? queue.slice(currentIndex + 1)
      : [];

  // Ensure a single <audio> element exists
  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "metadata";
      audioRef.current = a;
      a.addEventListener("timeupdate", () => {
        if (a.duration) {
          setElapsed(a.currentTime);
          setProgress(a.currentTime / a.duration);
        }
      });
      a.addEventListener("loadedmetadata", () => {
        setDuration(a.duration || 0);
      });
      a.addEventListener("ended", () => {
        handleEnded();
      });
      a.addEventListener("play", () => setIsPlaying(true));
      a.addEventListener("pause", () => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Load song when currentSong changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !currentSong) return;
    if (a.src !== currentSong.audioUrl) {
      a.src = currentSong.audioUrl;
    }
    a.play().catch(() => {
      // Autoplay may be blocked until the user interacts.
      setIsPlaying(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong?.id]);

  // Keep a ref in sync with the latest state for the `ended` event listener,
  // which is registered once on mount and would otherwise close over stale
  // values (e.g. an old `repeat` mode), breaking autoplay.
  const stateRef = useRef({ repeat, queue, currentIndex, shuffle });
  useEffect(() => {
    stateRef.current = { repeat, queue, currentIndex, shuffle };
  }, [repeat, queue, currentIndex, shuffle]);

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
    // Auto-advance to the next track in the queue.
    goNext(true);
  };

  const goNext = (auto = false) => {
    const { queue: q, currentIndex: idx, repeat: r } = stateRef.current;
    if (q.length === 0) return;
    let nextIndex = idx + 1;
    if (nextIndex >= q.length) {
      if (r === "all") {
        nextIndex = 0;
      } else {
        // End of the queue reached naturally — stop playback instead of
        // silently looping, unless the user explicitly turned on "repeat all".
        if (auto) setIsPlaying(false);
        return;
      }
    }
    setCurrentIndex(nextIndex);
  };

  const playSong = (song: Song, newQueue?: Song[]) => {
    const source = newQueue ?? originalQueue;
    if (newQueue) setOriginalQueue(newQueue);

    const playOrder = shuffle ? shuffleArray(source) : source;
    const idx = playOrder.findIndex((s) => s.id === song.id);
    let finalQueue = playOrder;
    let finalIndex = idx;
    if (idx === -1) {
      finalQueue = [song, ...playOrder];
      finalIndex = 0;
    } else if (shuffle && idx !== 0) {
      // Bring the requested song to the front of the shuffled play order
      // so it starts immediately, with the rest of the shuffle intact.
      finalQueue = [
        playOrder[idx],
        ...playOrder.slice(0, idx),
        ...playOrder.slice(idx + 1),
      ];
      finalIndex = 0;
    }
    setQueue(finalQueue);
    setCurrentIndex(finalIndex);
  };

  const playQueueIndex = (index: number) => {
    if (index < 0 || index >= queue.length) return;
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !currentSong) {
      if (queue.length > 0 && currentIndex === -1) {
        setCurrentIndex(0);
      }
      return;
    }
    if (a.paused) a.play();
    else a.pause();
  };

  const next = () => goNext(false);
  const prev = () => {
    const a = audioRef.current;
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      return;
    }
    if (queue.length === 0) return;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = queue.length - 1;
    setCurrentIndex(prevIndex);
  };

  const seek = (ratio: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    a.currentTime = Math.max(0, Math.min(1, ratio)) * a.duration;
    setProgress(Math.max(0, Math.min(1, ratio)));
    setElapsed(a.currentTime);
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
    setShuffle((s) => {
      const turningOn = !s;
      if (turningOn) {
        // Shuffle everything except the song currently playing, which stays
        // in place at the front so "Up Next" reflects the new play order.
        const current = currentIndex >= 0 ? queue[currentIndex] : null;
        const rest = queue.filter((_, i) => i !== currentIndex);
        const shuffled = shuffleArray(rest);
        setQueue(current ? [current, ...shuffled] : shuffled);
        setCurrentIndex(0);
      } else {
        // Restore original order, keeping the current song selected.
        const current = currentIndex >= 0 ? queue[currentIndex] : null;
        setQueue(originalQueue);
        if (current) {
          const idx = originalQueue.findIndex((s) => s.id === current.id);
          setCurrentIndex(idx === -1 ? 0 : idx);
        }
      }
      return turningOn;
    });
  };

  const cycleRepeat = () =>
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));

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
