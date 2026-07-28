import { useMemo, useState } from "react";
import { songs, playlists } from "../data/songs";
import { SongCard, SongRow } from "../components/SongList";
import type { Song } from "../types";

interface Props {
  onNavigate: (view: string, id?: string) => void;
}

const genres = Array.from(
  new Set(songs.map((s) => s.genre).filter(Boolean) as string[]),
);

export default function Search({ onNavigate }: Props) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return { songs: [], playlists: [] };
    return {
      songs: songs.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.artist.toLowerCase().includes(query) ||
          (s.album ?? "").toLowerCase().includes(query) ||
          (s.genre ?? "").toLowerCase().includes(query),
      ),
      playlists: playlists.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.description ?? "").toLowerCase().includes(query),
      ),
    };
  }, [q]);

  const isSearching = q.trim().length > 0;

  return (
    <div className="fade-in px-4 md:px-8 py-6 md:py-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-5">
          Search
        </h1>
        <div className="relative max-w-xl">
          <svg
            viewBox="0 0 24 24"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Songs, artists, albums or genres…"
            className="w-full pl-12 pr-4 py-3.5 bg-white/10 rounded-full text-sm placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      {!isSearching && (
        <section>
          <h2 className="text-xl font-bold mb-3">Browse by genre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {genres.map((g, i) => (
              <button
                key={g}
                onClick={() => setQ(g)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden text-left p-4 font-bold text-lg"
                style={{
                  background: `linear-gradient(135deg, ${palette[i % palette.length]} 0%, #0b0b12 100%)`,
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </section>
      )}

      {isSearching && (
        <>
          {results.playlists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => onNavigate("playlist", pl.id)}
                    className="text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={pl.coverUrl}
                      alt=""
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                    <div className="font-semibold mt-3 text-sm truncate">
                      {pl.name}
                    </div>
                    <div className="text-xs text-white/60 truncate">
                      {pl.songIds.length} songs
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {results.songs.length > 0 ? (
            <section>
              <h2 className="text-xl font-bold mb-3">Songs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-6 md:hidden">
                {results.songs.slice(0, 6).map((s) => (
                  <SongCard key={s.id} song={s} queue={results.songs} size="sm" />
                ))}
              </div>
              <div className="hidden md:block bg-white/[0.02] rounded-xl border border-white/5">
                <div className="grid grid-cols-[32px_minmax(0,4fr)_minmax(0,2fr)_minmax(0,1fr)_auto] gap-4 px-4 py-2 text-xs uppercase tracking-wider text-white/40 border-b border-white/5">
                  <div className="text-center">#</div>
                  <div>Title</div>
                  <div>Album</div>
                  <div className="text-right">Year</div>
                  <div>Time</div>
                </div>
                {results.songs.map((s, i) => (
                  <SongRow key={s.id} song={s} index={i} queue={results.songs} />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-white/60 text-sm">
              No songs found for "{q}". Try another keyword.
            </div>
          )}
        </>
      )}
    </div>
  );
}

const palette = [
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#22c55e",
];

// Suppress unused warning helper (not used currently)
export type _Song = Song;
