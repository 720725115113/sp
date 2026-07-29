import { useState } from "react";
import type { Song } from "../types";
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
  const { playSong, currentSong, isPlaying, toggleLike, likedSongIds, playNext, playLast, customPlaylists, addSongToPlaylist, addToast } = usePlayer();
  const [showMenu, setShowMenu] = useState(false);
  const [showPlaylistSubmenu, setShowPlaylistSubmenu] = useState(false);

  const isCurrent = currentSong?.id === song.id;
  const isThisPlaying = isCurrent && isPlaying;
  const isLiked = likedSongIds.includes(song.id);

  const dim =
    size === "lg" ? "w-48 sm:w-56" : size === "sm" ? "w-32 sm:w-36" : "w-40 sm:w-44";

  const handlePrimaryClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    playSong(song, queue);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    const link = document.createElement("a");
    link.href = song.audioUrl;
    link.download = `${song.artist} - ${song.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Downloading "${song.title}"`, "info");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Track link copied to clipboard!", "success");
    }
  };

  return (
    <div
      onClick={handlePrimaryClick}
      className={`group relative text-left ${dim} shrink-0 glass-card-premium p-3 cursor-pointer select-none`}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-square shadow-2xl bg-black/60 border border-white/10">
        <img
          src={song.coverUrl}
          alt={song.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80";
          }}
        />

        {/* Dynamic Glow Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Glowing Play Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playSong(song, queue);
          }}
          type="button"
          className="absolute right-3 bottom-3 h-12 w-12 rounded-full btn-glow-primary grid place-items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-2xl shrink-0 icon-btn-smooth"
          aria-label="Play track"
        >
          {isThisPlaying ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-black translate-x-[1.5px]" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Equalizer Visualizer Badge */}
        {isThisPlaying && (
          <div className="absolute left-3 bottom-3 px-2.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#18E29A]/40 flex items-center gap-1.5 shadow-lg">
            <div className="eq-container">
              <span className="eq-bar-smooth" />
              <span className="eq-bar-smooth" />
              <span className="eq-bar-smooth" />
              <span className="eq-bar-smooth" />
            </div>
          </div>
        )}

        {/* Smooth Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className={`absolute top-2.5 left-2.5 h-8 w-8 rounded-full bg-black/50 backdrop-blur-md grid place-items-center icon-btn-smooth transition-all opacity-0 group-hover:opacity-100 ${
            isLiked ? "text-rose-500 opacity-100 bg-rose-500/20 border border-rose-500/30" : "text-white/80 hover:text-white"
          }`}
          aria-label="Like track"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* 3-Dot Options Button */}
        <div className="absolute top-2.5 right-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-md grid place-items-center text-white/80 hover:text-white icon-btn-smooth opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Track options"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>

          {/* Smooth Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-9 w-44 bg-[#141418] border border-white/10 rounded-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 text-xs backdrop-blur-2xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playNext(song);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 text-white flex items-center gap-2 font-medium"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#18E29A]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Play Next
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playLast(song);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 text-white flex items-center gap-2 font-medium"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#18E29A]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Add to Queue
              </button>

              {customPlaylists.length > 0 && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPlaylistSubmenu(!showPlaylistSubmenu);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 text-white flex items-center justify-between font-medium"
                  >
                    <span>Add to Playlist</span>
                    <span>›</span>
                  </button>

                  {showPlaylistSubmenu && (
                    <div className="absolute right-full top-0 mr-1.5 w-40 bg-[#1C1C22] border border-white/10 rounded-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1">
                      {customPlaylists.map((pl) => (
                        <button
                          key={pl.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            addSongToPlaylist(pl.id, song.id);
                            setShowMenu(false);
                            setShowPlaylistSubmenu(false);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl text-left truncate text-white/80 hover:text-white hover:bg-white/10 font-medium"
                        >
                          {pl.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button onClick={handleShare} className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 text-white font-medium">
                Share Link
              </button>
              <button onClick={handleDownload} className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/10 text-white font-medium">
                Download MP3
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-3.5 space-y-0.5">
        <div className={`font-extrabold text-sm truncate font-heading ${isCurrent ? "text-[#18E29A]" : "text-white group-hover:text-[#18E29A] transition-colors"}`}>
          {song.title}
        </div>
        <div className="text-xs text-white/60 truncate font-medium">
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
  const { playSong, currentSong, isPlaying, togglePlay, toggleLike, likedSongIds } = usePlayer();
  const isCurrent = currentSong?.id === song.id;
  const isThisPlaying = isCurrent && isPlaying;
  const isLiked = likedSongIds.includes(song.id);

  const handleClick = () => {
    if (isCurrent) togglePlay();
    else if (onClick) onClick();
    else playSong(song, queue);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full grid grid-cols-[32px_minmax(0,4fr)_minmax(0,2fr)_auto] md:grid-cols-[36px_minmax(0,4fr)_minmax(0,2.5fr)_minmax(0,1fr)_auto] gap-4 items-center px-4 py-3 rounded-2xl text-left group transition-all duration-200 cursor-pointer ${
        isCurrent
          ? "bg-[#18E29A]/15 border border-[#18E29A]/30 shadow-lg"
          : "hover:bg-white/5 border border-transparent"
      }`}
    >
      {/* Index or Equalizer */}
      <div className="text-sm font-bold text-white/40 text-center shrink-0">
        {isThisPlaying ? (
          <div className="flex items-end justify-center h-4">
            <span className="eq-bar-smooth" />
            <span className="eq-bar-smooth" />
            <span className="eq-bar-smooth" />
          </div>
        ) : (
          <>
            <span className="group-hover:hidden">{index + 1}</span>
            <svg
              viewBox="0 0 24 24"
              className="hidden group-hover:block h-4 w-4 mx-auto text-[#18E29A]"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </>
        )}
      </div>

      {/* Cover & Title */}
      <div className="flex items-center gap-3.5 min-w-0">
        <img
          src={song.coverUrl}
          alt=""
          className="h-11 w-11 rounded-xl object-cover shrink-0 shadow-md border border-white/10"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className={`truncate text-sm font-extrabold font-heading ${isCurrent ? "text-[#18E29A]" : "text-white group-hover:text-[#18E29A] transition-colors"}`}>
            {song.title}
          </div>
          <div className="truncate text-xs text-white/60 font-medium">{song.artist}</div>
        </div>
      </div>

      {/* Album */}
      <div className="hidden md:block truncate text-sm text-white/60 font-medium">
        {song.album ?? "Single"}
      </div>

      {/* Year */}
      <div className="hidden md:block text-xs text-white/40 text-right font-medium">
        {song.year ?? ""}
      </div>

      {/* Actions & Duration */}
      <div className="flex items-center gap-3 justify-end shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className={`h-8 w-8 grid place-items-center rounded-full icon-btn-smooth ${
            isLiked ? "text-rose-500" : "text-white/40 hover:text-white opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Like song"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <span className="text-xs text-white/50 tabular-nums font-bold w-10 text-right">
          {song.duration ?? "3:30"}
        </span>
      </div>
    </div>
  );
}
