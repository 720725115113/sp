import { useMemo } from "react";
import { SongCard } from "../components/SongList";
import { usePlayer } from "../context/PlayerContext";
import { useCatalog } from "../services/catalog";
import type { Album, Artist, Playlist, Song } from "../types";

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface Props {
  onNavigate: (view: string, id?: string) => void;
}

export default function Home({ onNavigate }: Props) {
  const { songs, playlists, artists, albums } = useCatalog();
  const { recentlyPlayed, playSong, likedSongIds } = usePlayer();

  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const featuredPlaylist = playlists[0] ?? null;

  const recent = useMemo(() => (recentlyPlayed.length ? recentlyPlayed : songs.slice(0, 8)), [recentlyPlayed, songs]);
  const trending = useMemo(() => (songs.length ? shuffleArray(songs).slice(0, 8) : []), [songs]);
  const recommended = useMemo(() => songs.slice(0, 10), [songs]);
  const newReleases = useMemo(() => [...songs].reverse().slice(0, 8), [songs]);
  const madeForYou = useMemo(() => (songs.length ? shuffleArray(songs).slice(0, 8) : []), [songs]);
  const continueListening = useMemo(() => songs.slice(2, 10), [songs]);
  const quickPicks = useMemo(() => songs.slice(0, 6), [songs]);

  // Language filter selections
  const regionalMixes = [
    { title: "Tamil Hits", color: "from-amber-500 to-rose-600", filter: "Tamil" },
    { title: "English Chartbusters", color: "from-blue-500 to-indigo-600", filter: "English" },
    { title: "Hindi Blockbusters", color: "from-emerald-500 to-teal-700", filter: "Hindi" },
  ];

  // Mood mixes
  const moodMixes = [
    { name: "Workout Energy", color: "from-rose-600 to-orange-500", icon: "⚡" },
    { name: "Deep Sleep & Chill", color: "from-indigo-600 to-purple-800", icon: "🌙" },
    { name: "Weekend Party", color: "from-fuchsia-600 to-pink-500", icon: "🎉" },
    { name: "Romance & Beats", color: "from-red-500 to-pink-600", icon: "❤️" },
  ];

  return (
    <div className="animate-fade-in px-4 md:px-8 py-6 space-y-10 pb-16">
      {/* Hero Greeting & Quick Language Mixes */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gradient-primary">
              {greeting}
            </h1>
            <p className="text-white/60 mt-1 text-sm md:text-base font-medium">
              Over 100M+ tracks with gapless playback, crossfade, and lossless quality.
            </p>
          </div>

          {/* Quick regional buttons */}
          <div className="flex flex-wrap gap-2">
            {regionalMixes.map((mix) => (
              <button
                key={mix.title}
                onClick={() => onNavigate("search")}
                className={`px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${mix.color} shadow-lg hover:scale-105 transition-transform`}
              >
                {mix.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Featured Banner */}
      {featuredPlaylist && (
        <section
          className="relative overflow-hidden rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${featuredPlaylist.color ?? "#6D5EF8"} 0%, #141418 80%)`,
          }}
        >
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#18E29A]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end gap-6">
            <img
              src={featuredPlaylist.coverUrl}
              alt=""
              className="h-44 w-44 md:h-56 md:w-56 rounded-2xl object-cover shadow-2xl border border-white/10"
            />
            <div className="flex-1">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md text-[#18E29A] border border-[#18E29A]/30">
                Featured Mix
              </span>
              <h2 className="text-3xl md:text-5xl font-black mt-2 text-white tracking-tight">
                {featuredPlaylist.name}
              </h2>
              <p className="text-white/80 mt-2 max-w-xl text-sm md:text-base leading-relaxed">
                {featuredPlaylist.description || "Handcrafted collection of top hits curated just for your mood."}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => onNavigate("playlist", featuredPlaylist.id)}
                  className="px-8 py-3 rounded-full btn-glow-primary text-black font-extrabold flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Listen Now
                </button>
                <button
                  onClick={() => onNavigate("playlist", featuredPlaylist.id)}
                  className="px-6 py-3 rounded-full btn-glow-secondary text-white font-bold"
                >
                  View Playlist
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Liked Songs Quick Card */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigate("library")}
          className="glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer border border-rose-500/20 hover:border-rose-500/50"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 grid place-items-center text-white shadow-xl">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Liked Songs</h3>
              <p className="text-xs text-white/60 font-medium">{likedSongIds.length} saved tracks</p>
            </div>
          </div>
          <button className="h-10 w-10 rounded-full bg-white/10 grid place-items-center text-white">
            →
          </button>
        </div>

        <div
          onClick={() => onNavigate("search")}
          className="glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer border border-[#18E29A]/20 hover:border-[#18E29A]/50"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#18E29A] to-[#6D5EF8] grid place-items-center text-black font-extrabold text-2xl shadow-xl">
              ⚡
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Discover Weekly</h3>
              <p className="text-xs text-white/60 font-medium">Fresh music updated every Monday</p>
            </div>
          </div>
          <button className="h-10 w-10 rounded-full bg-white/10 grid place-items-center text-white">
            →
          </button>
        </div>
      </section>

      {/* Mood Mixes Grid */}
      <Section title="Mood Mixes">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {moodMixes.map((m) => (
            <button
              key={m.name}
              onClick={() => onNavigate("search")}
              className={`p-5 rounded-2xl bg-gradient-to-br ${m.color} text-left text-white shadow-xl hover:scale-105 transition-transform flex flex-col justify-between h-28`}
            >
              <span className="text-2xl">{m.icon}</span>
              <span className="font-extrabold text-sm md:text-base">{m.name}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Recently Played */}
      <Section title="Recently Played">
        <ScrollRow>
          {recent.map((song) => (
            <SongCard key={`recent-${song.id}`} song={song} queue={recent} />
          ))}
        </ScrollRow>
      </Section>

      {/* Made For You */}
      <Section title="Made For You">
        <ScrollRow>
          {madeForYou.map((song) => (
            <SongCard key={`mfy-${song.id}`} song={song} queue={madeForYou} />
          ))}
        </ScrollRow>
      </Section>

      {/* Trending Tracks */}
      <Section title="Trending Now">
        <ScrollRow>
          {trending.map((song) => (
            <SongCard key={`trending-${song.id}`} song={song} queue={trending} />
          ))}
        </ScrollRow>
      </Section>

      {/* New Releases */}
      <Section title="New Releases">
        <ScrollRow>
          {newReleases.map((song) => (
            <SongCard key={`new-${song.id}`} song={song} queue={newReleases} />
          ))}
        </ScrollRow>
      </Section>

      {/* Continue Listening */}
      <Section title="Continue Listening">
        <ScrollRow>
          {continueListening.map((song) => (
            <SongCard key={`cont-${song.id}`} song={song} queue={continueListening} />
          ))}
        </ScrollRow>
      </Section>

      {/* Quick Picks */}
      <Section title="Quick Picks">
        <ScrollRow>
          {quickPicks.map((song) => (
            <SongCard key={`quick-${song.id}`} song={song} queue={quickPicks} />
          ))}
        </ScrollRow>
      </Section>

      {/* Top Albums */}
      <Section title="Top Albums">
        <ScrollRow>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} onNavigate={onNavigate} />
          ))}
        </ScrollRow>
      </Section>

      {/* Top Artists */}
      <Section title="Popular Artists">
        <ScrollRow>
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} onNavigate={onNavigate} />
          ))}
        </ScrollRow>
      </Section>

      {/* Genres Grid */}
      <Section title="Browse Genres">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Array.from(new Set(songs.map((s) => s.genre).filter(Boolean) as string[])).map((genre, idx) => (
            <button
              key={genre}
              onClick={() => onNavigate("search")}
              className="p-5 rounded-2xl glass-card text-left font-black text-base text-white hover:border-[#18E29A] transition-all"
              style={{
                background: `linear-gradient(135deg, ${genreColors[idx % genreColors.length]} 0%, #141418 100%)`,
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>{title}</span>
        </h2>
      </div>
      {children}
    </section>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x scrollbar-none">{children}</div>;
}

function ArtistCard({ artist, onNavigate }: { artist: Artist; onNavigate: (view: string, id?: string) => void }) {
  return (
    <button
      onClick={() => onNavigate("search")}
      className="group relative text-left w-36 sm:w-44 shrink-0 glass-card p-3.5 rounded-2xl transition-all"
    >
      <div className="relative overflow-hidden rounded-full aspect-square shadow-xl border border-white/10">
        <img src={artist.coverUrl} alt={artist.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="mt-3 text-center font-bold text-sm text-white truncate">{artist.name}</div>
      <div className="text-[11px] text-center text-white/50 uppercase tracking-widest font-semibold mt-0.5">Artist</div>
    </button>
  );
}

function AlbumCard({ album, onNavigate }: { album: Album; onNavigate: (view: string, id?: string) => void }) {
  return (
    <button
      onClick={() => onNavigate("search")}
      className="group relative text-left w-36 sm:w-44 shrink-0 glass-card p-3.5 rounded-2xl transition-all"
    >
      <div className="relative overflow-hidden rounded-xl aspect-square shadow-xl border border-white/10">
        <img src={album.coverUrl} alt={album.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="mt-3 font-bold text-sm text-white truncate">{album.name}</div>
      <div className="text-xs text-white/60 truncate font-medium">{album.artist}</div>
    </button>
  );
}

const genreColors = ["#18E29A", "#6D5EF8", "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#06B6D4"];
