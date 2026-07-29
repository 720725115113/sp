import { useMemo, useState } from "react";
import { useCatalog } from "../services/catalog";
import { SongCard } from "../components/SongList";
import { usePlayer } from "../context/PlayerContext";
import type { Playlist } from "../types";

export default function Library({
  onNavigate,
  onCreatePlaylistModal,
}: {
  onNavigate: (view: string, id?: string) => void;
  onCreatePlaylistModal?: () => void;
}) {
  const [tab, setTab] = useState<"playlists" | "songs" | "liked" | "artists" | "albums">("playlists");
  const { songs, playlists, artists, albums } = useCatalog();
  const { likedSongIds, customPlaylists, deletePlaylist, togglePinPlaylist } = usePlayer();

  const allPlaylists = useMemo(() => {
    return [...customPlaylists, ...playlists];
  }, [customPlaylists, playlists]);

  const likedSongs = useMemo(
    () => songs.filter((song) => likedSongIds.includes(song.id)),
    [likedSongIds, songs],
  );

  return (
    <div className="animate-fade-in px-4 md:px-8 py-6 space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Your Library</h1>
          <p className="text-sm text-white/60 font-medium mt-1">Manage your custom playlists, favorite tracks, and saved albums.</p>
        </div>

        <button
          onClick={onCreatePlaylistModal}
          className="px-5 py-2.5 rounded-full btn-glow-primary text-black font-extrabold text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Playlist
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {(["playlists", "songs", "liked", "artists", "albums"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              tab === item
                ? "bg-gradient-to-r from-[#18E29A] to-[#6D5EF8] text-black shadow-lg"
                : "bg-white/5 text-white/70 hover:bg-white/15"
            }`}
          >
            {item === "liked" ? `Liked (${likedSongs.length})` : item}
          </button>
        ))}
      </div>

      {/* Playlists Tab */}
      {tab === "playlists" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => onNavigate("playlist", pl.id)}
              className="group relative glass-card p-3.5 rounded-2xl cursor-pointer text-left transition-all"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-lg">
                <img src={pl.coverUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                
                {/* Pin button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePinPlaylist(pl.id);
                  }}
                  className={`absolute top-2 right-2 h-7 w-7 rounded-full bg-black/50 backdrop-blur-md grid place-items-center ${
                    pl.isPinned ? "text-[#18E29A]" : "text-white/40 hover:text-white"
                  }`}
                  title="Pin playlist"
                >
                  📌
                </button>
              </div>

              <div className="mt-3 flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-white truncate">{pl.name}</div>
                  <div className="text-xs text-white/50">{pl.songIds?.length ?? 0} songs</div>
                </div>

                {pl.id.startsWith("playlist-") && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlaylist(pl.id);
                    }}
                    className="h-6 w-6 rounded-full text-white/40 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete playlist"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Songs Tab */}
      {tab === "songs" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} queue={songs} />
          ))}
        </div>
      )}

      {/* Liked Songs Tab */}
      {tab === "liked" && (
        likedSongs.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {likedSongs.map((song) => (
              <SongCard key={song.id} song={song} queue={likedSongs} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-10 text-center space-y-3">
            <div className="text-4xl">❤️</div>
            <h3 className="text-xl font-bold text-white">No liked songs yet</h3>
            <p className="text-xs text-white/60 max-w-sm mx-auto">
              Tap the heart icon on any track to save it here for quick listening anytime.
            </p>
          </div>
        )
      )}

      {/* Artists Tab */}
      {tab === "artists" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <div key={artist.id} className="glass-card p-4 rounded-2xl text-center">
              <img src={artist.coverUrl} alt="" className="w-full aspect-square object-cover rounded-full shadow-lg" />
              <div className="font-bold text-sm text-white truncate mt-3">{artist.name}</div>
              <div className="text-xs text-white/50">Artist</div>
            </div>
          ))}
        </div>
      )}

      {/* Albums Tab */}
      {tab === "albums" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="glass-card p-3.5 rounded-2xl text-left">
              <img src={album.coverUrl} alt="" className="w-full aspect-square object-cover rounded-xl shadow-lg" />
              <div className="font-bold text-sm text-white truncate mt-3">{album.name}</div>
              <div className="text-xs text-white/50 truncate">{album.artist}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
