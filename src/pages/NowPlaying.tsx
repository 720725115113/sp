import { useRef, useState } from "react";
import { usePlayer, formatTime } from "../context/PlayerContext";
import type { Song } from "../types";

export default function NowPlaying({ onClose }: { onClose: () => void }) {
  const p = usePlayer();
  const song = p.currentSong;
  const [tab, setTab] = useState<"playing" | "upnext">("playing");

  if (!song) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl grid place-items-center text-white/60">
        <div className="text-center">
          <p className="mb-4">No song is playing.</p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: `radial-gradient(1200px 800px at 30% 10%, ${
          song.color ?? "#8b5cf6"
        }55 0%, #07070b 60%)`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />
      <div className="relative min-h-full flex flex-col items-center p-4 md:p-6">
        <div className="w-full max-w-5xl">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="text-xs uppercase tracking-widest text-white/70">
              Now playing
            </div>
            {/* Up Next toggle — visible on mobile where the queue is a separate tab */}
            <button
              onClick={() => setTab(tab === "playing" ? "upnext" : "playing")}
              className="h-10 w-10 md:hidden rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
              aria-label="Toggle queue"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h13M3 12h13M3 18h7M17 15l4 4-4 4" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="hidden md:block w-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_360px] gap-8 md:gap-10 items-start">
            {/* Left: playing panel (hidden on mobile when Up Next tab is active) */}
            <div className={`${tab === "upnext" ? "hidden md:block" : ""} max-w-md mx-auto md:mx-0 w-full`}>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  {song.title}
                </h2>
                <p className="text-white/70 mt-1">{song.artist}</p>
                {song.album && (
                  <p className="text-xs text-white/50 mt-1">{song.album}</p>
                )}
              </div>

              {/* Seekable progress — drag or click anywhere to jump to that point */}
              <SeekBar />

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={p.toggleShuffle}
                  className={`h-10 w-10 grid place-items-center rounded-full ${
                    p.shuffle ? "text-emerald-400" : "text-white/70"
                  }`}
                  aria-label="Shuffle"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3l4 4-4 4M3 17l4 4 4-4M3 7h3l3 3 3-3 3-3h3M3 17h3l3-3 3 3 3 3h3" />
                  </svg>
                </button>
                <button
                  onClick={p.prev}
                  className="h-12 w-12 grid place-items-center rounded-full text-white hover:bg-white/10"
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M6 6h2v12H6zM20 6v12L9 12z" />
                  </svg>
                </button>
                <button
                  onClick={p.togglePlay}
                  className="h-16 w-16 rounded-full bg-white text-black grid place-items-center hover:scale-105 transition-transform shadow-2xl"
                  aria-label="Play/Pause"
                >
                  {p.isPlaying ? (
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-[2px]" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={p.next}
                  className="h-12 w-12 grid place-items-center rounded-full text-white hover:bg-white/10"
                  aria-label="Next"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M16 6h2v12h-2zM4 6v12l11-6z" />
                  </svg>
                </button>
                <button
                  onClick={p.cycleRepeat}
                  className={`h-10 w-10 grid place-items-center rounded-full relative ${
                    p.repeat !== "off" ? "text-emerald-400" : "text-white/70"
                  }`}
                  aria-label="Repeat"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                  {p.repeat === "one" && (
                    <span className="absolute -bottom-1 text-[9px] font-bold">1</span>
                  )}
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 mt-8">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/60 shrink-0" fill="currentColor">
                  <path d="M4 10v4h4l5 5V5L8 10H4Zm12.5 2a5 5 0 0 0-2.5-4.33v8.66A5 5 0 0 0 16.5 12Z" />
                </svg>
                <div className="relative flex-1 h-1">
                  <div className="absolute inset-0 bg-white/15 rounded-full" />
                  <div
                    className="absolute inset-y-0 left-0 bg-white rounded-full"
                    style={{ width: `${p.volume * 100}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(p.volume * 100)}
                    onChange={(e) => p.setVolume(Number(e.target.value) / 100)}
                    className="wv-range absolute inset-0 h-full"
                    aria-label="Volume"
                  />
                </div>
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/60 shrink-0" fill="currentColor">
                  <path d="M4 10v4h4l5 5V5L8 10H4Zm12.5 2a5 5 0 0 0-2.5-4.33v8.66A5 5 0 0 0 16.5 12Zm0-7v2.06a8 8 0 0 1 0 13.88V21a10 10 0 0 0 0-18Z" />
                </svg>
              </div>
            </div>

            {/* Right: Up Next / queue panel — Apple Music style */}
            <div className={`${tab === "playing" ? "hidden md:flex" : "flex"} flex-col max-h-[70vh] md:max-h-[80vh]`}>
              <QueuePanel />
            </div>
          </div>
        </div>
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
    <div className="mb-2">
      <div
        ref={trackRef}
        className="relative h-1.5 group"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHoverX(e.clientX - rect.left);
        }}
        onMouseLeave={() => setHoverX(null)}
      >
        <div className="absolute inset-0 bg-white/15 rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-white rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
        {hoverRatio !== null && duration > 0 && (
          <div
            className="pointer-events-none absolute -top-8 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 border border-white/10 text-white text-[10px] shadow-lg"
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
      <div className="flex justify-between text-[11px] text-white/60 tabular-nums mt-2">
        <span>{formatTime(elapsed)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

function QueuePanel() {
  const p = usePlayer();

  return (
    <div className="flex flex-col min-h-0 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        <div className="text-sm font-semibold">Up Next</div>
        <div className="flex items-center gap-1">
          <button
            onClick={p.toggleShuffle}
            className={`h-8 w-8 grid place-items-center rounded-full ${
              p.shuffle ? "text-emerald-400 bg-emerald-400/10" : "text-white/60 hover:text-white"
            }`}
            aria-label="Shuffle"
            title="Shuffle"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3l4 4-4 4M3 17l4 4 4-4M3 7h3l3 3 3-3 3-3h3M3 17h3l3-3 3 3 3 3h3" />
            </svg>
          </button>
          <button
            onClick={p.cycleRepeat}
            className={`h-8 w-8 grid place-items-center rounded-full relative ${
              p.repeat !== "off" ? "text-emerald-400 bg-emerald-400/10" : "text-white/60 hover:text-white"
            }`}
            aria-label="Repeat"
            title="Repeat"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            {p.repeat === "one" && (
              <span className="absolute -bottom-0.5 text-[8px] font-bold">1</span>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 min-h-0 py-2">
        {p.currentSong && (
          <>
            <div className="px-4 pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-white/40">
              Now playing
            </div>
            <QueueRow
              song={p.currentSong}
              active
              playing={p.isPlaying}
              onClick={() => {}}
            />
          </>
        )}

        {p.upNext.length > 0 ? (
          <>
            <div className="px-4 pt-4 pb-1.5 text-[10px] uppercase tracking-wider text-white/40">
              Next up {p.shuffle && "· Shuffle"}
            </div>
            {p.upNext.map((song, i) => (
              <QueueRow
                key={`${song.id}-${i}`}
                song={song}
                onClick={() => p.playQueueIndex(p.currentIndex + 1 + i)}
              />
            ))}
          </>
        ) : (
          <div className="px-4 py-6 text-sm text-white/40">
            No more songs queued. {p.repeat === "off" && "Turn on repeat to keep the music going."}
          </div>
        )}
      </div>
    </div>
  );
}

function QueueRow({
  song,
  active,
  playing,
  onClick,
}: {
  song: Song;
  active?: boolean;
  playing?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        active ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <div className="relative h-10 w-10 rounded overflow-hidden shrink-0">
        <img src={song.coverUrl} alt="" className="h-full w-full object-cover" />
        {active && playing && (
          <div className="absolute inset-0 bg-black/50 grid place-items-center">
            <div className="flex items-end h-3 text-emerald-400">
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
            </div>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className={`truncate text-sm font-medium ${active ? "text-emerald-400" : "text-white"}`}>
          {song.title}
        </div>
        <div className="truncate text-xs text-white/60">{song.artist}</div>
      </div>
      {song.duration && (
        <div className="text-xs text-white/40 tabular-nums shrink-0">{song.duration}</div>
      )}
    </button>
  );
}
