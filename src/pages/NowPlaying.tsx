import { useRef, useState } from "react";
import { usePlayer, formatTime } from "../context/PlayerContext";
import type { AudioQuality } from "../types";

export default function NowPlaying({ onClose }: { onClose: () => void }) {
  const p = usePlayer();
  const song = p.currentSong;
  const [tab, setTab] = useState<"playing" | "lyrics" | "queue">("playing");

  // Touch swipe gesture handling
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;

    // Swipe down to close player
    if (diffY > 120 && Math.abs(diffX) < 80) {
      onClose();
    }
    // Swipe left for Next track
    else if (diffX < -100 && Math.abs(diffY) < 60) {
      p.next();
    }
    // Swipe right for Previous track
    else if (diffX > 100 && Math.abs(diffY) < 60) {
      p.prev();
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

  if (!song) {
    return (
      <div className="fixed inset-0 z-50 bg-[#09090B] grid place-items-center text-white/60">
        <div className="text-center space-y-4">
          <p className="text-lg">No song is currently playing.</p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full btn-glow-secondary text-white font-bold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const sampleLyrics = [
    `[00:10.00] In the neon glow of the midnight train`,
    `[00:25.00] Echoes of rhythm washing down like rain`,
    `[00:40.00] Every single beat syncs right with your heartbeat`,
    `[01:05.00] High fidelity sounds spinning through the street`,
    `[01:25.00] Lost inside the melody, infinite and free`,
    `[01:45.00] Antigravity vibes, you and me...`,
  ];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 overflow-y-auto animate-slide-up select-none"
      style={{
        background: `radial-gradient(1000px 700px at 50% 20%, ${
          song.color ?? "#6D5EF8"
        }55 0%, #09090B 80%)`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" />

      <div className="relative min-h-full flex flex-col items-center p-4 md:p-8 max-w-5xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full glass-card grid place-items-center text-white/80 hover:text-white"
            aria-label="Collapse"
            title="Collapse"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Navigation Tabs */}
          <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
            <button
              onClick={() => setTab("playing")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                tab === "playing" ? "bg-[#18E29A] text-black shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              Playing
            </button>
            <button
              onClick={() => setTab("lyrics")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                tab === "lyrics" ? "bg-[#18E29A] text-black shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              Lyrics
            </button>
            <button
              onClick={() => setTab("queue")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                tab === "queue" ? "bg-[#18E29A] text-black shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              Up Next ({p.upNext.length})
            </button>
          </div>

          <div className="w-10" />
        </div>

        {/* Tab 1: Playing Panel */}
        {tab === "playing" && (
          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_340px] gap-8 items-center flex-1 py-4">
            {/* Artwork & Info */}
            <div className="flex flex-col items-center max-w-md mx-auto w-full space-y-6">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="text-center space-y-1 w-full">
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight truncate">
                  {song.title}
                </h2>
                <p className="text-base text-white/70 font-semibold truncate">{song.artist}</p>
                {song.album && <p className="text-xs text-white/40">{song.album}</p>}
              </div>

              {/* Seekbar */}
              <div className="w-full space-y-2">
                <SeekBar />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 w-full">
                {/* GREEN SHUFFLE BUTTON */}
                <button
                  onClick={p.toggleShuffle}
                  className={`h-11 w-11 grid place-items-center rounded-full transition-all ${
                    p.shuffle
                      ? "bg-[#18E29A]/20 text-[#18E29A] border border-[#18E29A]/40 shadow-[0_0_15px_rgba(24,226,154,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  aria-label="Shuffle"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                  </svg>
                </button>

                <button
                  onClick={p.prev}
                  className="h-12 w-12 grid place-items-center rounded-full text-white hover:bg-white/10 active:scale-95"
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                    <path d="M6 6h2v12H6zM20 6v12L9 12z" />
                  </svg>
                </button>

                <button
                  onClick={p.togglePlay}
                  className="h-16 w-16 rounded-full btn-glow-primary grid place-items-center shrink-0"
                  aria-label="Play/Pause"
                >
                  {p.isPlaying ? (
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-black translate-x-[2px]" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={p.next}
                  className="h-12 w-12 grid place-items-center rounded-full text-white hover:bg-white/10 active:scale-95"
                  aria-label="Next"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                    <path d="M16 6h2v12h-2zM4 6v12l11-6z" />
                  </svg>
                </button>

                <button
                  onClick={p.cycleRepeat}
                  className={`h-11 w-11 grid place-items-center rounded-full relative transition-all ${
                    p.repeat !== "off"
                      ? "bg-[#18E29A]/20 text-[#18E29A] border border-[#18E29A]/40 shadow-[0_0_15px_rgba(24,226,154,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  aria-label="Repeat"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Side Queue View on Desktop */}
            <div className="hidden md:flex flex-col h-[480px] glass-card rounded-3xl p-4 border border-white/10 overflow-hidden">
              <QueuePanel />
            </div>
          </div>
        )}

        {/* Tab 2: Lyrics View */}
        {tab === "lyrics" && (
          <div className="w-full max-w-xl glass-card rounded-3xl p-8 space-y-6 text-center my-auto">
            <h3 className="text-xl font-black text-[#18E29A] tracking-wider uppercase">Lyrics</h3>
            <div className="space-y-4 font-bold text-lg leading-relaxed text-white/80">
              {sampleLyrics.map((line, idx) => (
                <p
                  key={idx}
                  className={`transition-all duration-300 ${
                    idx === 2 ? "text-2xl text-[#18E29A] font-black scale-105" : "hover:text-white"
                  }`}
                >
                  {line.replace(/\[\d+:\d+\.\d+\]/, "")}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Queue Mobile/Desktop */}
        {tab === "queue" && (
          <div className="w-full max-w-xl glass-card rounded-3xl p-4 border border-white/10 h-[500px]">
            <QueuePanel />
          </div>
        )}
      </div>
    </div>
  );
}

function SeekBar() {
  const { progress, duration, elapsed, seek } = usePlayer();
  const [hoverX, setHoverX] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const hoverRatio =
    hoverX !== null && trackRef.current
      ? Math.max(0, Math.min(1, hoverX / trackRef.current.offsetWidth))
      : null;

  return (
    <div className="w-full space-y-1">
      <div
        ref={trackRef}
        className="relative h-2 group cursor-pointer"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHoverX(e.clientX - rect.left);
        }}
        onMouseLeave={() => setHoverX(null)}
      >
        <div className="absolute inset-0 bg-white/15 rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#18E29A] to-[#6D5EF8] rounded-full group-hover:brightness-125"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />

        {hoverRatio !== null && duration > 0 && (
          <div
            className="pointer-events-none absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#141418] border border-white/10 text-white text-[10px] shadow-xl font-bold"
            style={{ left: `${hoverRatio * 100}%` }}
          >
            {formatTime(hoverRatio * duration)}
          </div>
        )}

        <input
          type="range"
          min={0}
          max={1000}
          step={1}
          value={Math.round(progress * 1000)}
          onChange={(e) => seek(Number(e.target.value) / 1000)}
          aria-label="Seek track position"
          className="wv-range absolute inset-0 h-full w-full"
        />
      </div>

      <div className="flex justify-between text-xs text-white/50 font-bold tabular-nums">
        <span>{formatTime(elapsed)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

function QueuePanel() {
  const p = usePlayer();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
        <span className="font-extrabold text-sm text-white">Playback Queue</span>
        <span className="text-xs text-[#18E29A] font-bold">{p.queue.length} tracks</span>
      </div>

      <div className="overflow-y-auto flex-1 py-2 space-y-1 pr-1">
        {p.currentSong && (
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-black text-[#18E29A] tracking-wider">Now Playing</div>
            <div className="glass-card p-2.5 rounded-xl flex items-center justify-between border border-[#18E29A]/30 bg-[#18E29A]/10">
              <div className="flex items-center gap-3 min-w-0">
                <img src={p.currentSong.coverUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-[#18E29A]">{p.currentSong.title}</div>
                  <div className="truncate text-[11px] text-white/60">{p.currentSong.artist}</div>
                </div>
              </div>
              <div className="flex items-end h-3 text-[#18E29A]">
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
                <span className="equalizer-bar" />
              </div>
            </div>
          </div>
        )}

        <div className="text-[10px] uppercase font-black text-white/40 tracking-wider pt-3">Up Next</div>

        {p.upNext.length > 0 ? (
          p.upNext.map((song, i) => (
            <div
              key={`${song.id}-${i}`}
              className="group glass-card p-2 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => p.playQueueIndex(p.currentIndex + 1 + i)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={song.coverUrl} alt="" className="h-9 w-9 rounded-md object-cover" />
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-white">{song.title}</div>
                  <div className="truncate text-[11px] text-white/50">{song.artist}</div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  p.removeFromQueue(p.currentIndex + 1 + i);
                }}
                className="h-7 w-7 rounded-full text-white/40 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from queue"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="text-xs text-white/40 text-center py-8">No remaining songs in queue.</div>
        )}
      </div>
    </div>
  );
}
