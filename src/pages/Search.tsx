import { useMemo } from "react";
import { SongCard, SongRow } from "../components/SongList";
import { useCatalog } from "../services/catalog";
import type { Album, Artist, Playlist, Song } from "../types";

interface Props {
  onNavigate: (view: string, id?: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export default function Search({ onNavigate, query, onQueryChange }: Props) {
  const { songs, playlists, artists, albums } = useCatalog();

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return { songs: [], playlists: [], artists: [], albums: [] };

    return {
      songs: songs.filter((song) => [song.title, song.artist, song.album ?? "", song.genre ?? ""].some((value) => value.toLowerCase().includes(normalized))),
      playlists: playlists.filter((playlist) => [playlist.name, playlist.description ?? ""].some((value) => value.toLowerCase().includes(normalized))),
      artists: artists.filter((artist) => artist.name.toLowerCase().includes(normalized)),
      albums: albums.filter((album) => album.name.toLowerCase().includes(normalized) || album.artist.toLowerCase().includes(normalized)),
    };
  }, [albums, artists, playlists, query, songs]);

  const isSearching = query.trim().length > 0;

  return (
    <div className="fade-in px-4 md:px-8 py-6 md:py-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-5">Search</h1>
        <div className="relative max-w-2xl">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search songs, artists, albums or playlists…"
            className="w-full rounded-full border border-white/10 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>
      </div>

      {!isSearching && (
        <section>
          <h2 className="text-xl font-bold mb-3">Browse by genre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from(new Set(songs.map((song) => song.genre).filter(Boolean) as string[])).map((genre, index) => (
              <button key={genre} onClick={() => onQueryChange(genre)} className="relative aspect-[4/3] rounded-xl overflow-hidden text-left p-4 font-bold text-lg" style={{ background: `linear-gradient(135deg, ${palette[index % palette.length]} 0%, #0b0b12 100%)` }}>
                {genre}
              </button>
            ))}
          </div>
        </section>
      )}

      {isSearching && (
        <>
          {results.playlists.length > 0 && <Section title="Playlists"><Grid>{results.playlists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} onNavigate={onNavigate} />)}</Grid></Section>}
          {results.artists.length > 0 && <Section title="Artists"><ScrollRow>{results.artists.map((artist) => <ArtistCard key={artist.id} artist={artist} onNavigate={onNavigate} />)}</ScrollRow></Section>}
          {results.albums.length > 0 && <Section title="Albums"><ScrollRow>{results.albums.map((album) => <AlbumCard key={album.id} album={album} onNavigate={onNavigate} />)}</ScrollRow></Section>}
          {results.songs.length > 0 ? (
            <section>
              <h2 className="text-xl font-bold mb-3">Songs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-6 md:hidden">
                {results.songs.slice(0, 6).map((song) => <SongCard key={song.id} song={song} queue={results.songs} size="sm" />)}
              </div>
              <div className="hidden md:block bg-white/[0.02] rounded-xl border border-white/5">
                <div className="grid grid-cols-[32px_minmax(0,4fr)_minmax(0,2fr)_minmax(0,1fr)_auto] gap-4 px-4 py-2 text-xs uppercase tracking-wider text-white/40 border-b border-white/5">
                  <div className="text-center">#</div>
                  <div>Title</div>
                  <div>Album</div>
                  <div className="text-right">Year</div>
                  <div>Time</div>
                </div>
                {results.songs.map((song, index) => <SongRow key={song.id} song={song} index={index} queue={results.songs} />)}
              </div>
            </section>
          ) : (
            <div className="text-white/60 text-sm">No results for “{query}”.</div>
          )}
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{children}</div>;
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x">{children}</div>;
}

function PlaylistCard({ playlist, onNavigate }: { playlist: Playlist; onNavigate: (view: string, id?: string) => void }) {
  return (
    <button onClick={() => onNavigate("playlist", playlist.id)} className="text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <img src={playlist.coverUrl} alt="" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
      <div className="font-semibold mt-3 text-sm truncate">{playlist.name}</div>
      <div className="text-xs text-white/60 truncate">{playlist.songIds.length} songs</div>
    </button>
  );
}

function ArtistCard({ artist, onNavigate }: { artist: Artist; onNavigate: (view: string, id?: string) => void }) {
  return (
    <button onClick={() => onNavigate("search")} className="group relative text-left w-40 shrink-0 rounded-xl p-3 transition-colors hover:bg-white/5" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}>
      <div className="relative overflow-hidden rounded-full aspect-square shadow-lg">
        <img src={artist.coverUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="mt-3 text-center text-sm font-semibold text-white truncate">{artist.name}</div>
    </button>
  );
}

function AlbumCard({ album, onNavigate }: { album: Album; onNavigate: (view: string, id?: string) => void }) {
  return (
    <button onClick={() => onNavigate("search")} className="group relative text-left w-40 shrink-0 rounded-xl p-3 transition-colors hover:bg-white/5" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}>
      <div className="relative overflow-hidden rounded-lg aspect-square shadow-lg">
        <img src={album.coverUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="mt-3 text-sm font-semibold text-white truncate">{album.name}</div>
      <div className="text-xs text-white/60 truncate">{album.artist}</div>
    </button>
  );
}

const palette = ["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#6366f1", "#a855f7", "#ec4899", "#22c55e"];
