import { useMemo, useState } from "react";
import { SongCard, SongRow } from "../components/SongList";
import { useCatalog } from "../services/catalog";
import { usePlayer } from "../context/PlayerContext";
import type { Album, Artist, Playlist, Song } from "../types";

interface Props {
  onNavigate: (view: string, id?: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
}

type FilterChip = "all" | "songs" | "albums" | "artists" | "playlists" | "podcasts";

export default function Search({ onNavigate, query, onQueryChange }: Props) {
  const { songs, playlists, artists, albums } = useCatalog();
  const { searchHistory, addSearchHistory, removeSearchHistory, clearSearchHistory, addToast } = usePlayer();
  const [activeChip, setActiveChip] = useState<FilterChip>("all");

  const trendingTags = ["A.R. Rahman", "Anirudh Ravichander", "Electronic Lo-Fi", "Synthwave 80s", "Taylor Swift", "Instrumental Chill"];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { songs: [], playlists: [], artists: [], albums: [] };

    return {
      songs: songs.filter((s) => [s.title, s.artist, s.album ?? "", s.genre ?? ""].some((val) => val.toLowerCase().includes(q))),
      playlists: playlists.filter((p) => [p.name, p.description ?? ""].some((val) => val.toLowerCase().includes(q))),
      artists: artists.filter((a) => a.name.toLowerCase().includes(q)),
      albums: albums.filter((al) => al.name.toLowerCase().includes(q) || al.artist.toLowerCase().includes(q)),
    };
  }, [query, songs, playlists, artists, albums]);

  const isSearching = query.trim().length > 0;

  const handleSelectQuery = (term: string) => {
    onQueryChange(term);
    addSearchHistory(term);
  };

  return (
    <div className="animate-fade-in px-4 md:px-8 py-6 space-y-8 pb-16">
      {/* Header & Voice / Input Search */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Search</h1>
        
        <div className="relative glass-input rounded-2xl p-3 flex items-center gap-3 shadow-xl">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#18E29A] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                addSearchHistory(query.trim());
              }
            }}
            placeholder="Search songs, artists, albums, or playlists..."
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/40 font-medium"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="h-6 w-6 rounded-full bg-white/10 grid place-items-center text-white/70 hover:text-white"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      {isSearching && (
        <div className="flex flex-wrap gap-2">
          {(["all", "songs", "albums", "artists", "playlists", "podcasts"] as FilterChip[]).map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeChip === chip
                  ? "bg-[#18E29A] text-black shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/15"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Search History & Trending Searches when idle */}
      {!isSearching && (
        <div className="space-y-8">
          {/* Recent Searches */}
          {searchHistory.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Recent Searches</h2>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-white/50 hover:text-[#18E29A] font-semibold"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((item) => (
                  <div
                    key={item}
                    className="glass-card px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white cursor-pointer"
                  >
                    <span onClick={() => handleSelectQuery(item)}>{item}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearchHistory(item);
                      }}
                      className="text-white/40 hover:text-rose-400"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">Trending Searches</h2>
            <div className="flex flex-wrap gap-2.5">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelectQuery(tag)}
                  className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-[#18E29A]/40 text-xs font-bold text-white hover:text-[#18E29A] transition-all"
                >
                  🔥 {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Browse Genres Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-white">Browse All Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from(new Set(songs.map((s) => s.genre).filter(Boolean) as string[])).map((genre, idx) => (
                <button
                  key={genre}
                  onClick={() => handleSelectQuery(genre)}
                  className="relative aspect-[4/3] rounded-2xl p-5 text-left font-black text-lg text-white overflow-hidden shadow-xl hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${palette[idx % palette.length]} 0%, #141418 100%)`,
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Search Results */}
      {isSearching && (
        <div className="space-y-8">
          {(activeChip === "all" || activeChip === "songs") && results.songs.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-white">Songs</h2>
              <div className="hidden md:block glass-card rounded-2xl overflow-hidden p-2">
                {results.songs.map((s, idx) => (
                  <SongRow key={s.id} song={s} index={idx} queue={results.songs} />
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-3">
                {results.songs.map((s) => (
                  <SongCard key={s.id} song={s} queue={results.songs} size="sm" />
                ))}
              </div>
            </section>
          )}

          {(activeChip === "all" || activeChip === "playlists") && results.playlists.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-white">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => onNavigate("playlist", pl.id)}
                    className="glass-card p-3 rounded-2xl text-left transition-all"
                  >
                    <img src={pl.coverUrl} alt="" className="w-full aspect-square object-cover rounded-xl shadow-lg" />
                    <div className="font-bold text-sm text-white truncate mt-3">{pl.name}</div>
                    <div className="text-xs text-white/50">{pl.songIds.length} tracks</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {(activeChip === "all" || activeChip === "artists") && results.artists.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-white">Artists</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {results.artists.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => onNavigate("search")}
                    className="w-36 shrink-0 glass-card p-3.5 rounded-2xl text-center"
                  >
                    <img src={art.coverUrl} alt="" className="w-full aspect-square object-cover rounded-full shadow-lg" />
                    <div className="font-bold text-sm text-white truncate mt-3">{art.name}</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {(activeChip === "all" || activeChip === "albums") && results.albums.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-white">Albums</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {results.albums.map((al) => (
                  <button
                    key={al.id}
                    onClick={() => onNavigate("search")}
                    className="w-36 shrink-0 glass-card p-3.5 rounded-2xl text-left"
                  >
                    <img src={al.coverUrl} alt="" className="w-full aspect-square object-cover rounded-xl shadow-lg" />
                    <div className="font-bold text-sm text-white truncate mt-3">{al.name}</div>
                    <div className="text-xs text-white/60 truncate">{al.artist}</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {results.songs.length === 0 && results.playlists.length === 0 && results.artists.length === 0 && results.albums.length === 0 && (
            <div className="glass-card p-12 text-center rounded-3xl space-y-2">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-bold text-white">No results found for "{query}"</h3>
              <p className="text-xs text-white/50">Try checking spelling or search for another song or artist.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const palette = ["#EF4444", "#F59E0B", "#10B981", "#06B6D4", "#6366F1", "#A855F7", "#EC4899", "#18E29A"];
