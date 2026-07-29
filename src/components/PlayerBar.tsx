import { useRef, useState } from "react";
import { usePlayer, formatTime } from "../context/PlayerContext";
import type { AudioQuality } from "../types";

export default function PlayerBar({
  onOpenNowPlaying,
  onOpenLyrics,
  onOpenQueue,
}: {
  onOpenNowPlaying: () => void;
  onOpenLyrics?: () => void;
  onOpenQueue?: () => void;
}) {
  const p = usePlayer();
  const song = p.currentSong;
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);

  if (!song) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 h-20 glass-panel border-t border-white/10 px-6 flex items-center justify-between text-sm text-white/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 grid place-items-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/30" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          </div>
          <span>Select a song from the library to start streaming.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 z-40 w-full glass-panel border-t border-white/10 px-3 py-2 md:px-6 md:py-3.5 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1.4fr_1fr] items-center gap-2 md:gap-4 shadow-2xl">
      {/* Left: song info & artwork */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenNowPlaying}
          className="group relative h-12 w-12 md:h-14 md:w-14 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg"
          aria-label="Expand player"
        >
          <img
            src={song.coverUrl}
            alt={song.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNowPlaying}
              className="truncate text-sm md:text-base font-bold text-white hover:underline text-left"
            >
              {song.title}
            </button>
            {p.audioQuality === "lossless" && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                Lossless
              </span>
            )}
          </div>
          <div className="truncate text-xs text-white/60 hover:text-white transition-colors cursor-pointer">
            {song.artist}
          </div>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={() => p.toggleLike(song)}
          className={`h-9 w-9 grid place-items-center rounded-full transition-transform active:scale-90 ${
            p.likedSongIds.includes(song.id) ? "text-rose-500" : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Like song"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={p.likedSongIds.includes(song.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      {/* Center: controls & seekbar */}
      <div className="flex flex-col items-center gap-1.5 min-w-0">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {/* PROMINENT SHUFFLE BUTTON (BESIDE PREVIOUS) */}
          <button
            onClick={p.toggleShuffle}
            aria-label="Shuffle"
            title={p.shuffle ? "Shuffle Enabled" : "Shuffle Disabled"}
            className={`h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-full transition-all duration-200 ${
              p.shuffle
                ? "bg-[#18E29A]/20 text-[#18E29A] border border-[#18E29A]/40 shadow-[0_0_12px_rgba(24,226,154,0.4)]"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>

          {/* PREVIOUS */}
          <button
            onClick={p.prev}
            aria-label="Previous"
            className="h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor">
              <path d="M6 6h2v12H6zM20 6v12L9 12z" />
            </svg>
          </button>

          {/* PLAY / PAUSE (GLOWING BUTTON) */}
          <button
            onClick={p.togglePlay}
            aria-label="Play or Pause"
            className="h-11 w-11 md:h-13 md:w-13 rounded-full btn-glow-primary grid place-items-center shrink-0"
          >
            {p.isPlaying ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-[1px]" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* NEXT */}
          <button
            onClick={p.next}
            aria-label="Next"
            className="h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-full text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor">
              <path d="M16 6h2v12h-2zM4 6v12l11-6z" />
            </svg>
          </button>

          {/* REPEAT */}
          <button
            onClick={p.cycleRepeat}
            aria-label="Repeat"
            title={`Repeat: ${p.repeat.toUpperCase()}`}
            className={`h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-full relative transition-all duration-200 ${
              p.repeat !== "off"
                ? "bg-[#18E29A]/20 text-[#18E29A] border border-[#18E29A]/40 shadow-[0_0_12px_rgba(24,226,154,0.4)]"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            {p.repeat === "one" && (
              <span className="absolute bottom-1 font-extrabold text-[9px] text-[#18E29A]">1</span>
            )}
          </button>
        </div>

        {/* Seekbar */}
        <ProgressBar />
      </div>

      {/* Right: volume & audio tools */}
      <div className="hidden md:flex items-center justify-end gap-2 text-white/70">
        {/* Speed Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSpeedMenu(!showSpeedMenu);
              setShowQualityMenu(false);
              setShowSleepMenu(false);
            }}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white"
            aria-label="Speed"
          >
            {p.playbackSpeed}x
          </button>

          {showSpeedMenu && (
            <div className="absolute bottom-10 right-0 bg-[#141418] border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 w-24">
              {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    p.setPlaybackSpeed(s);
                    setShowSpeedMenu(false);
                  }}
                  className={`text-xs py-1 px-2 rounded text-left font-medium ${
                    p.playbackSpeed === s ? "bg-[#18E29A]/20 text-[#18E29A]" : "hover:bg-white/5 text-white/80"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Audio Quality */}
        <div className="relative">
          <button
            onClick={() => {
              setShowQualityMenu(!showQualityMenu);
              setShowSpeedMenu(false);
              setShowSleepMenu(false);
            }}
            className="px-2 py-1 rounded-md text-[11px] font-bold uppercase bg-white/5 border border-white/10 hover:bg-white/10 text-white/80"
            aria-label="Audio Quality"
          >
            {p.audioQuality.slice(0, 4)}
          </button>

          {showQualityMenu && (
            <div className="absolute bottom-10 right-0 bg-[#141418] border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 w-32">
              {(["normal", "high", "lossless"] as AudioQuality[]).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    p.setAudioQuality(q);
                    setShowQualityMenu(false);
                  }}
                  className={`text-xs py-1 px-2.5 rounded text-left font-medium capitalize ${
                    p.audioQuality === q ? "bg-[#18E29A]/20 text-[#18E29A]" : "hover:bg-white/5 text-white/80"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sleep Timer */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSleepMenu(!showSleepMenu);
              setShowSpeedMenu(false);
              setShowQualityMenu(false);
            }}
            className={`h-8 w-8 grid place-items-center rounded-full ${
              p.sleepTimer !== null ? "text-[#18E29A] bg-[#18E29A]/20" : "hover:text-white hover:bg-white/10"
            }`}
            aria-label="Sleep timer"
            title="Sleep timer"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>

          {showSleepMenu && (
            <div className="absolute bottom-10 right-0 bg-[#141418] border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 w-36">
              {[null, 15, 30, 45, 60].map((m) => (
                <button
                  key={m ?? 0}
                  onClick={() => {
                    p.setSleepTimerMinutes(m);
                    setShowSleepMenu(false);
                  }}
                  className="text-xs py-1 px-2.5 rounded text-left hover:bg-white/5 text-white/80"
                >
                  {m === null ? "Off" : `${m} minutes`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lyrics Button */}
        {onOpenLyrics && (
          <button
            onClick={onOpenLyrics}
            className="h-8 w-8 grid place-items-center rounded-full hover:text-white hover:bg-white/10"
            aria-label="Lyrics"
            title="Lyrics"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}

        {/* Queue Button */}
        {onOpenQueue && (
          <button
            onClick={onOpenQueue}
            className="h-8 w-8 grid place-items-center rounded-full hover:text-white hover:bg-white/10"
            aria-label="Queue"
            title="Queue"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          </button>
        )}

        {/* Volume & Mute */}
        <button
          onClick={() => p.setVolume(p.volume > 0 ? 0 : 0.85)}
          className="h-8 w-8 grid place-items-center rounded-full hover:text-white hover:bg-white/10"
          aria-label="Mute"
        >
          {p.volume === 0 ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-rose-400" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        <div className="w-24 relative h-1 flex items-center group">
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(p.volume * 100)}
            onChange={(e) => p.setVolume(Number(e.target.value) / 100)}
            className="wv-range absolute inset-0 h-full w-full"
            aria-label="Volume slider"
          />
        </div>
      </div>
    </div>
  );
}

function ProgressBar() {
  const { progress, duration, elapsed, seek } = usePlayer();
  const [hoverX, setHoverX] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const hoverRatio =
    hoverX !== null && trackRef.current
      ? Math.max(0, Math.min(1, hoverX / trackRef.current.offsetWidth))
      : null;

  return (
    <div className="flex items-center gap-2 w-full max-w-xl text-[11px] text-white/50 tabular-nums font-semibold">
      <span className="w-9 text-right">{formatTime(elapsed)}</span>
      <div
        ref={trackRef}
        className="relative flex-1 h-1.5 group cursor-pointer"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHoverX(e.clientX - rect.left);
        }}
        onMouseLeave={() => setHoverX(null)}
      >
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#18E29A] to-[#6D5EF8] rounded-full group-hover:brightness-125"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />

        {hoverRatio !== null && duration > 0 && (
          <div
            className="pointer-events-none absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#141418] border border-white/10 text-white text-[10px] shadow-xl font-bold"
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
          aria-label="Seek timeline"
          className="wv-range absolute inset-0 h-full w-full"
        />
      </div>
      <span className="w-9">{formatTime(duration)}</span>
    </div>
  );
}
