import type { Song } from "../types";
import { useIsSongPlaying } from "./Sidebar";
import { usePlayer } from "../context/PlayerContext";

export function SongCard({
  song,
  onClick,
  queue,
  size = "md",
}: {
  song: Song;
  onClick?: () => void;
  queue?: Song[];
  size?: "sm" | "md" | "lg";
}) {
  const { playSong } = usePlayer();
  const playing = useIsSongPlaying(song.id);
  const dim =
    size === "lg" ? "w-52" : size === "sm" ? "w-36" : "w-44";

  const handlePrimaryClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    playSong(song, queue);
  };

  return (
    <div
      onClick={handlePrimaryClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handlePrimaryClick();
        }
      }}
      role="button"
      tabIndex={0}
      className={`group relative text-left ${dim} shrink-0 rounded-xl p-3 transition-colors hover:bg-white/5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70`}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
      }}
    >
      <div className="relative overflow-hidden rounded-lg aspect-square shadow-lg">
        <img
          src={song.coverUrl}
          alt={song.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;utf8," +
              encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='${
                  song.color ?? "#8b5cf6"
                }'/><stop offset='1' stop-color='#000'/></linearGradient></defs><rect width='200' height='200' fill='url(%23g)'/><text x='100' y='110' font-family='Arial' font-size='80' fill='white' text-anchor='middle'>♪</text></svg>`,
              );
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            playSong(song, queue);
          }}
          type="button"
          className="absolute right-2 bottom-2 h-11 w-11 rounded-full bg-emerald-500 text-black grid place-items-center shadow-xl shadow-emerald-500/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105 hover:bg-emerald-400"
          aria-label="Play"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        {playing && (
          <div className="absolute left-2 bottom-2 h-7 w-7 rounded-full bg-emerald-500 text-black grid place-items-center">
            <div className="flex items-end h-3">
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="font-semibold text-sm text-white truncate">
          {song.title}
        </div>
        <div className="text-xs text-white/60 truncate mt-0.5">
          {song.artist}
        </div>
      </div>
    </div>
  );
}

export function SongRow({
  song,
  index,
  onClick,
  queue,
}: {
  song: Song;
  index: number;
  onClick?: () => void;
  queue?: Song[];
}) {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const isCurrent = currentSong?.id === song.id;
  const isThisPlaying = isCurrent && isPlaying;

  const handleClick = () => {
    if (isCurrent) togglePlay();
    else if (onClick) onClick();
    else playSong(song, queue);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full grid grid-cols-[32px_minmax(0,4fr)_minmax(0,2fr)_auto] md:grid-cols-[32px_minmax(0,4fr)_minmax(0,2fr)_minmax(0,1fr)_auto] gap-4 items-center px-4 py-2.5 rounded-md text-left group transition-colors ${
        isCurrent ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <div className="text-sm text-white/50 tabular-nums text-center">
        {isThisPlaying ? (
          <div className="flex items-end justify-center h-4 text-emerald-400">
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
          </div>
        ) : (
          <>
            <span className="group-hover:hidden">{index + 1}</span>
            <svg
              viewBox="0 0 24 24"
              className="hidden group-hover:block h-4 w-4 mx-auto text-white"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </>
        )}
      </div>
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.coverUrl}
          alt=""
          className="h-10 w-10 rounded object-cover shrink-0"
          loading="lazy"
        />
        <div className="min-w-0">
          <div
            className={`truncate text-sm font-medium ${
              isCurrent ? "text-emerald-400" : "text-white"
            }`}
          >
            {song.title}
          </div>
          <div className="truncate text-xs text-white/60">{song.artist}</div>
        </div>
      </div>
      <div className="hidden md:block truncate text-sm text-white/60">
        {song.album ?? "—"}
      </div>
      <div className="hidden md:block text-sm text-white/50 text-right">
        {song.year ?? ""}
      </div>
      <div className="text-sm text-white/50 tabular-nums">
        {song.duration ?? ""}
      </div>
    </button>
  );
}
