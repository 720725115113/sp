import { useMemo, useState } from "react";
import { SongCard, SongRow } from "../components/SongList";
import { usePlayer } from "../context/PlayerContext";
import { useCatalog } from "../services/catalog";

export default function PlaylistView({ playlistId }: { playlistId: string }) {
  const { playlists, songs } = useCatalog();
  const { customPlaylists, playSong, shuffle, toggleShuffle, deletePlaylist, renamePlaylist, addToast } = usePlayer();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const playlist = useMemo(() => {
    return (
      customPlaylists.find((item) => item.id === playlistId) ||
      playlists.find((item) => item.id === playlistId)
    );
  }, [playlistId, customPlaylists, playlists]);

  if (!playlist) {
    return (
      <div className="p-12 text-center text-white/60">
        <h2 className="text-xl font-bold text-white mb-2">Playlist not found</h2>
        <p className="text-sm">The playlist might have been deleted or moved.</p>
      </div>
    );
  }

  const playlistSongs = useMemo(
    () => (playlist.songIds || []).map((id) => songs.find((song) => song.id === id)).filter(Boolean) as typeof songs,
    [playlist.songIds, songs],
  );

  const totalMinutes = Math.max(1, playlistSongs.length * 3.8);

  const onPlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0], playlistSongs);
    }
  };

  const onShufflePlay = () => {
    if (playlistSongs.length === 0) return;
    if (!shuffle) toggleShuffle();
    const randomStart = playlistSongs[Math.floor(Math.random() * playlistSongs.length)];
    playSong(randomStart, playlistSongs);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Playlist link copied to clipboard!", "success");
    }
  };

  const handleSaveRename = () => {
    if (editName.trim()) {
      renamePlaylist(playlist.id, editName.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in pb-16">
      {/* Header Banner */}
      <section
        className="px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-end gap-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${playlist.color ?? "#6D5EF8"}44 0%, #09090B 100%)`,
        }}
      >
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="h-44 w-44 md:h-56 md:w-56 rounded-2xl object-cover shadow-2xl border border-white/10 shrink-0"
        />

        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-white/10 text-[#18E29A] border border-[#18E29A]/30">
              {playlist.isCollaborative ? "Collaborative Playlist" : playlist.isPrivate ? "Private Playlist" : "Public Playlist"}
            </span>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-2xl font-black bg-white/10 border border-white/20 rounded-xl px-3 py-1 text-white outline-none"
              />
              <button onClick={handleSaveRename} className="px-4 py-1.5 rounded-xl bg-[#18E29A] text-black font-bold text-xs">Save</button>
            </div>
          ) : (
            <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white truncate">
              {playlist.name}
            </h1>
          )}

          {playlist.description && (
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              {playlist.description}
            </p>
          )}

          <div className="text-xs md:text-sm text-white/50 font-semibold pt-1">
            {playlistSongs.length} songs · approx {Math.floor(totalMinutes)} mins
          </div>
        </div>
      </section>

      {/* Control Buttons */}
      <div className="px-4 md:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onPlayAll}
              className="h-14 w-14 rounded-full btn-glow-primary grid place-items-center shrink-0"
              aria-label="Play all"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-black translate-x-[1px]" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              onClick={onShufflePlay}
              className={`h-11 w-11 rounded-full grid place-items-center transition-all ${
                shuffle
                  ? "bg-[#18E29A]/20 text-[#18E29A] border border-[#18E29A]/40"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Shuffle play"
              title="Shuffle play"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>

            <button
              onClick={handleShare}
              className="h-11 w-11 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Share playlist"
              title="Share link"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>

          {playlist.id.startsWith("playlist-") && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditName(playlist.name);
                  setIsEditing(true);
                }}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-xs font-bold text-white"
              >
                Rename
              </button>
              <button
                onClick={() => deletePlaylist(playlist.id)}
                className="px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-bold text-rose-400"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Mobile: card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-3">
          {playlistSongs.map((s) => (
            <SongCard key={s.id} song={s} queue={playlistSongs} size="sm" />
          ))}
        </div>

        {/* Desktop: table rows */}
        <div className="hidden md:block glass-card rounded-2xl p-2 border border-white/10">
          <div className="grid grid-cols-[36px_minmax(0,4fr)_minmax(0,2.5fr)_minmax(0,1fr)_auto] gap-4 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/10">
            <div className="text-center">#</div>
            <div>Title</div>
            <div>Album</div>
            <div className="text-right">Year</div>
            <div className="text-right">Time</div>
          </div>
          {playlistSongs.map((s, i) => (
            <SongRow key={s.id} song={s} index={i} queue={playlistSongs} />
          ))}
        </div>
      </div>
    </div>
  );
}
