import { useMemo } from "react";
import { SongCard } from "../components/SongList";
import { usePlayer } from "../context/PlayerContext";
import { useCatalog } from "../services/catalog";
import type { Album, Artist, Playlist, Song } from "../types";

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

interface Props {
  onNavigate: (view: string, id?: string) => void;
}

export default function Home({ onNavigate }: Props) {
  const { songs, playlists, artists, albums } = useCatalog();
  const { recentlyPlayed } = usePlayer();
  const hour = new Date().getHours();
  const greet =
    hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const featuredPlaylist = playlists[0] ?? null;
  const featuredSongs = useMemo(() => {
    if (!featuredPlaylist) return songs.slice(0, 8);
    return featuredPlaylist.songIds
      .map((id) => songs.find((song) => song.id === id))
      .filter(Boolean) as Song[];
  }, [featuredPlaylist, songs]);

  const recent = recentlyPlayed.length ? recentlyPlayed : songs.slice(0, 6);
  const trending = useMemo(() => {
    if (!songs.length) return [];
    return shuffleArray(songs).slice(0, 8);
  }, [songs]);
  const recommended = songs.slice(0, 9);

  return (
    <div className="fade-in px-4 md:px-8 py-6 md:py-8 space-y-10">
      <section>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gradient">
          {greet}
        </h1>
        <p className="text-white/60 mt-2 text-sm md:text-base">
          Your music, always ready. Everything streams from the latest catalog with seamless playback.
        </p>
      </section>

      {featuredPlaylist && (
        <section className="relative overflow-hidden rounded-2xl p-6 md:p-10 glow" style={{ background: `linear-gradient(135deg, ${featuredPlaylist.color ?? "#8b5cf6"} 0%, #0b0b12 80%)` }}>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <img src={featuredPlaylist.coverUrl} alt="" className="h-40 w-40 md:h-52 md:w-52 rounded-xl object-cover shadow-2xl" />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-white/70">Featured playlist</div>
              <h2 className="text-3xl md:text-5xl font-black mt-1 tracking-tight">{featuredPlaylist.name}</h2>
              <p className="text-white/80 mt-2 max-w-lg">{featuredPlaylist.description}</p>
              <div className="mt-5 flex gap-3">
                <button onClick={() => onNavigate("playlist", featuredPlaylist.id)} className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">Play</button>
                <button onClick={() => onNavigate("playlist", featuredPlaylist.id)} className="px-6 py-2.5 rounded-full bg-black/30 text-white font-semibold border border-white/20 hover:bg-black/50">View</button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Section title="Recently played">
        <ScrollRow>{recent.map((song) => <SongCard key={song.id} song={song} queue={songs} />)}</ScrollRow>
      </Section>

      <Section title="Trending">
        <ScrollRow>{trending.map((song) => <SongCard key={song.id} song={song} queue={trending} />)}</ScrollRow>
      </Section>

      <Section title="New releases">
        <ScrollRow>{recommended.map((song) => <SongCard key={song.id} song={song} queue={recommended} />)}</ScrollRow>
      </Section>

      <Section title="Recommended">
        <ScrollRow>{songs.slice(0, 10).map((song) => <SongCard key={song.id} song={song} queue={songs} />)}</ScrollRow>
      </Section>

      <Section title="Top artists">
        <ScrollRow>{artists.slice(0, 8).map((artist) => <ArtistCard key={artist.id} artist={artist} onNavigate={onNavigate} />)}</ScrollRow>
      </Section>

      <Section title="Albums">
        <ScrollRow>{albums.slice(0, 8).map((album) => <AlbumCard key={album.id} album={album} onNavigate={onNavigate} />)}</ScrollRow>
      </Section>

      <Section title="Playlists">
        <ScrollRow>{playlists.slice(0, 8).map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} onNavigate={onNavigate} />)}</ScrollRow>
      </Section>

      <footer className="text-xs text-white/40 pt-6 border-t border-white/5">Wavelength · Modern streaming experience with persistent playback.</footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3">{title}</h2>
      {children}
    </section>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x">{children}</div>;
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

function PlaylistCard({ playlist, onNavigate }: { playlist: Playlist; onNavigate: (view: string, id?: string) => void }) {
  return (
    <button onClick={() => onNavigate("playlist", playlist.id)} className="group relative text-left w-40 shrink-0 rounded-xl p-3 transition-colors hover:bg-white/5" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}>
      <div className="relative overflow-hidden rounded-lg aspect-square shadow-lg">
        <img src={playlist.coverUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="mt-3 text-sm font-semibold text-white truncate">{playlist.name}</div>
      <div className="text-xs text-white/60 truncate">{playlist.songIds.length} songs</div>
    </button>
  );
}
