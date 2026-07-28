import { useMemo } from "react";
import { songs as allSongs, playlists } from "../data/songs";
import { SongCard, SongRow } from "../components/SongList";
import { usePlayer } from "../context/PlayerContext";

export default function PlaylistView({ playlistId }: { playlistId: string }) {
  const playlist = useMemo(
    () => playlists.find((p) => p.id === playlistId),
    [playlistId],
  );
  const { playSong, shuffle, toggleShuffle } = usePlayer();

  if (!playlist) {
    return (
      <div className="p-8 text-white/60">Playlist not found.</div>
    );
  }

  const playlistSongs = useMemo(
    () =>
      playlist.songIds
        .map((id) => allSongs.find((s) => s.id === id))
        .filter(Boolean) as typeof allSongs,
    [playlist],
  );

  const totalMinutes = playlistSongs.length * 4; // approximate

  const onPlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0], playlistSongs);
    }
  };

  const onShufflePlay = () => {
    if (playlistSongs.length === 0) return;
    if (!shuffle) toggleShuffle();
    const start =
      playlistSongs[Math.floor(Math.random() * playlistSongs.length)];
    playSong(start, playlistSongs);
  };

  return (
    <div className="fade-in">
      <section
        className="px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-end gap-6"
        style={{
          background: `linear-gradient(180deg, ${
            playlist.color ?? "#8b5cf6"
          } 0%, #0b0b12 100%)`,
        }}
      >
        <img
          src={playlist.coverUrl}
          alt=""
          className="h-48 w-48 md:h-60 md:w-60 rounded-xl object-cover shadow-2xl"
        />
        <div className="flex-1">
          <div className="text-xs uppercase tracking-widest text-white/80">
            Playlist
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight mt-1">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-white/80 mt-3 max-w-2xl">
              {playlist.description}
            </p>
          )}
          <div className="text-sm text-white/70 mt-3">
            {playlistSongs.length} songs · ~ {Math.floor(totalMinutes / 60)} hr{" "}
            {totalMinutes % 60} min
          </div>
        </div>
      </section>

      <div className="px-4 md:px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onPlayAll}
            className="h-14 w-14 rounded-full bg-emerald-500 text-black grid place-items-center shadow-xl shadow-emerald-500/30 hover:scale-105 transition-transform"
            aria-label="Play all"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-[2px]" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            onClick={onShufflePlay}
            className={shuffle ? "text-emerald-400" : "text-white/70 hover:text-white"}
            aria-label="Shuffle play"
            title="Shuffle play"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3l4 4-4 4M3 17l4 4 4-4M3 7h3l3 3 3-3 3-3h3M3 17h3l3-3 3 3 3 3h3" />
            </svg>
          </button>
        </div>

        {/* Mobile: card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-2 mb-6">
          {playlistSongs.map((s) => (
            <SongCard
              key={s.id}
              song={s}
              queue={playlistSongs}
              size="sm"
            />
          ))}
        </div>

        {/* Desktop: table rows */}
        <div className="hidden md:block bg-white/[0.02] rounded-xl border border-white/5">
          <div className="grid grid-cols-[32px_minmax(0,4fr)_minmax(0,2fr)_minmax(0,1fr)_auto] gap-4 px-4 py-2 text-xs uppercase tracking-wider text-white/40 border-b border-white/5">
            <div className="text-center">#</div>
            <div>Title</div>
            <div>Album</div>
            <div className="text-right">Year</div>
            <div>Time</div>
          </div>
          {playlistSongs.map((s, i) => (
            <SongRow
              key={s.id}
              song={s}
              index={i}
              queue={playlistSongs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
