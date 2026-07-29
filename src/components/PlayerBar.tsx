import { useRef, useState } from "react";
import { usePlayer, formatTime } from "../context/PlayerContext";

export default function PlayerBar({
  onOpenNowPlaying,
}: {
  onOpenNowPlaying: () => void;
}) {
  const p = usePlayer();
  const song = p.currentSong;

  if (!song) {
    return (
      <div className="h-20 md:h-24 border-t border-white/10 bg-black/80 backdrop-blur-xl px-4 flex items-center text-sm text-white/40">
        Pick a song to start listening.
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 z-30 w-full min-h-[88px] border-t border-white/10 bg-black/90 backdrop-blur-2xl px-3 py-2 md:px-4 md:py-3 grid grid-cols-1 sm:grid-cols-[1fr_1.2fr_1fr] items-center gap-2 md:gap-3">
      {/* Left: song info */}
      <button
        onClick={onOpenNowPlaying}
        className="flex items-center gap-3 min-w-0 text-left justify-center sm:justify-start"
      >
        <img
          src={song.coverUrl}
          alt=""
          className="h-12 w-12 md:h-14 md:w-14 rounded-md object-cover shrink-0 shadow-lg"
        />
        <div className="min-w-0 hidden sm:block">
          <div className="truncate text-sm font-semibold">{song.title}</div>
          <div className="truncate text-xs text-white/60">{song.artist}</div>
        </div>
      </button>

      {/* Center: controls + progress */}
      <div className="flex flex-col items-center gap-2 min-w-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5">
          <IconBtn
            onClick={p.toggleShuffle}
            active={p.shuffle}
            label="Shuffle"
            forceWhite={true}
          >
            <path d="M17 3 21 7l-4 4M3 17l4 4 4-4M3 7h3l3 3 3-3 3-3h3M3 17h3l3-3 3 3 3 3h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </IconBtn>
          <IconBtn onClick={p.prev} label="Previous" forceWhite={true}>
            <path d="M6 6h2v12H6zM20 6v12L9 12z" fill="currentColor" />
          </IconBtn>
          <button
            onClick={p.togglePlay}
            aria-label="Play/Pause"
            className="h-12 w-12 md:h-13 md:w-13 rounded-full bg-white text-black grid place-items-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-white/20 flex-shrink-0"
          >
            {p.isPlaying ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px]" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <IconBtn onClick={p.next} label="Next" forceWhite={true}>
            <path d="M16 6h2v12h-2zM4 6v12l11-6z" fill="currentColor" />
          </IconBtn>
          <IconBtn onClick={p.cycleRepeat} active={p.repeat !== "off"} label="Repeat" forceWhite={true}>
            {p.repeat === "one" ? (
              <>
                <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <text x="12" y="15" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="700">1</text>
              </>
            ) : (
              <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </IconBtn>
        </div>
        <ProgressBar />
      </div>

      {/* Right: volume */}
      <div className="hidden sm:flex items-center justify-end gap-2">
        <button onClick={() => p.toggleLike(song)} className={`h-8 w-8 grid place-items-center rounded-full ${p.likedSongIds.includes(song.id) ? "text-rose-400" : "text-white hover:text-white"}`} aria-label="Like">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={p.likedSongIds.includes(song.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M12 20s-6.5-4.2-8.5-8A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.5 5.6C18.5 15.8 12 20 12 20Z" />
          </svg>
        </button>
        <button onClick={() => p.setPlaybackSpeed(p.playbackSpeed === 1 ? 1.25 : p.playbackSpeed === 1.25 ? 1.5 : 1)} className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white hover:text-white" aria-label="Playback speed">
          {p.playbackSpeed.toFixed(2).replace(/\.00$/, "") + "x"}
        </button>
        <IconBtn onClick={() => p.setVolume(p.volume > 0 ? 0 : 0.8)} label="Mute">
          {p.volume === 0 ? (
            <path d="M4 10v4h4l5 5V5L8 10H4Zm14.5 2-2.5-2.5L13.5 12 16 14.5 18.5 12Z" />
          ) : (
            <path d="M4 10v4h4l5 5V5L8 10H4Zm12.5 2a5 5 0 0 0-2.5-4.33v8.66A5 5 0 0 0 16.5 12Zm0-7v2.06a8 8 0 0 1 0 13.88V21a10 10 0 0 0 0-18Z" />
          )}
        </IconBtn>
        <div className="w-28">
          <VolumeSlider />
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  active,
  label,
  forceWhite = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
  forceWhite?: boolean;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-full transition-all duration-200 flex-shrink-0 border border-white/20 ${
        active ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_0_2px_rgba(52,211,153,0.2)]" : forceWhite ? "text-white bg-white/10 hover:text-white hover:bg-white/25 active:bg-white/35 shadow-sm" : "text-white/70 hover:text-white hover:bg-white/10"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        {children}
      </svg>
    </button>
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
    <div className="flex items-center gap-2 w-full max-w-xl text-[11px] text-white/60 tabular-nums">
      <span className="w-10 text-right">{formatTime(elapsed)}</span>
      <div
        ref={trackRef}
        className="relative flex-1 h-1 group"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHoverX(e.clientX - rect.left);
        }}
        onMouseLeave={() => setHoverX(null)}
      >
        <div className="absolute inset-0 bg-white/15 rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-white group-hover:bg-emerald-400 rounded-full"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />
        {hoverRatio !== null && duration > 0 && (
          <div
            className="pointer-events-none absolute -top-7 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 border border-white/10 text-white text-[10px] shadow-lg"
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
          aria-label="Seek"
          className="wv-range absolute inset-0 h-full w-full"
        />
      </div>
      <span className="w-10">{formatTime(duration)}</span>
    </div>
  );
}

function VolumeSlider() {
  const { volume, setVolume } = usePlayer();
  return (
    <div className="relative h-1">
      <div className="absolute inset-0 bg-white/15 rounded-full" />
      <div
        className="absolute inset-y-0 left-0 bg-white/80 rounded-full"
        style={{ width: `${volume * 100}%` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(volume * 100)}
        onChange={(e) => setVolume(Number(e.target.value) / 100)}
        className="wv-range absolute inset-0 h-full"
      />
    </div>
  );
}
