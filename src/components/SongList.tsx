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
      className={`group relative text-left ${dim} shrink-0 glass-card p-3 cursor-pointer select-none`}
    >
      <div className="relative overflow-hidden rounded-xl aspect-square shadow-lg bg-black/40">
        <img
          src={song.coverUrl}
          alt={song.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https.images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80";
          }}
        />

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playSong(song, queue);
          }}
          type="button"
          className="absolute right-2.5 bottom-2.5 h-11 w-11 rounded-full btn-glow-primary grid place-items-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shrink-0"
          aria-label="Play track"
        >
          {isThisPlaying ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px]" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Equalizer animation when active */}
        {isThisPlaying && (
          <div className="absolute left-3 bottom-3 flex items-end gap-0.5 h-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md">
            <span className="equalizer-bar" />
            <span className="equalizer-bar" />
            <span className="equalizer-bar" />
            <span className="equalizer-bar" />
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className={`absolute top-2.5 left-2.5 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md grid place-items-center transition-all opacity-0 group-hover:opacity-100 ${
            isLiked ? "text-rose-500 opacity-100" : "text-white/80 hover:text-white"
          }`}
          aria-label="Like track"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* 3-Dot Options Button */}
        <div className="absolute top-2.5 right-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md grid place-items-center text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Track options"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>

          {/* Context Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-9 w-44 bg-[#141418] border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 text-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playNext(song);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-white/10 text-white flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#18E29A]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Play Next
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playLast(song);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-white/10 text-white flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#18E29A]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                Add to Queue
              </button>

              {customPlaylists.length > 0 && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPlaylistSubmenu(!showPlaylistSubmenu);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-white/10 text-white flex items-center justify-between"
                  >
                    <span>Add to Playlist</span>
                    <span>›</span>
                  </button>

                  {showPlaylistSubmenu && (
                    <div className="absolute right-full top-0 mr-1 w-40 bg-[#1C1C22] border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 flex flex-col gap-1">
                      {customPlaylists.map((pl) => (
                        <button
                          key={pl.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            addSongToPlaylist(pl.id, song.id);
                            setShowMenu(false);
                            setShowPlaylistSubmenu(false);
                          }}
                          className="w-full px-2.5 py-1 rounded text-left truncate text-white/80 hover:text-white hover:bg-white/10"
                        >
                          {pl.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button onClick={handleShare} className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-white/10 text-white">
                Share Link
              </button>
              <button onClick={handleDownload} className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-white/10 text-white">
                Download MP3
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-3">
        <div className={`font-bold text-sm truncate ${isCurrent ? "text-[#18E29A]" : "text-white"}`}>
          {song.title}
        </div>
        <div className="text-xs text-white/60 truncate mt-0.5 font-medium">
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
  const { playSong, currentSong, isPlaying, togglePlay, toggleLike, likedSongIds, playNext, playLast } = usePlayer();
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
      className={`w-full grid grid-cols-[32px_minmax(0,4fr)_minmax(0,2fr)_auto] md:grid-cols-[36px_minmax(0,4fr)_minmax(0,2.5fr)_minmax(0,1fr)_auto] gap-4 items-center px-4 py-3 rounded-xl text-left group transition-all cursor-pointer ${
        isCurrent ? "bg-[#18E29A]/10 border border-[#18E29A]/20" : "hover:bg-white/5 border border-transparent"
      }`}
    >
      {/* Index or Equalizer */}
      <div className="text-sm font-semibold text-white/50 text-center shrink-0">
        {isThisPlaying ? (
          <div className="flex items-end justify-center h-4">
            <span className="equalizer-bar" />
            <span className="equalizer-bar" />
            <span className="equalizer-bar" />
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
          className="h-11 w-11 rounded-lg object-cover shrink-0 shadow-md"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className={`truncate text-sm font-bold ${isCurrent ? "text-[#18E29A]" : "text-white"}`}>
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
          className={`h-8 w-8 grid place-items-center rounded-full ${
            isLiked ? "text-rose-500" : "text-white/40 hover:text-white opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Like song"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <span className="text-xs text-white/50 tabular-nums font-semibold w-10 text-right">
          {song.duration ?? "3:30"}
        </span>
      </div>
    </div>
  );
}
