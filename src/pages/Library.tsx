import { useState } from "react";
import { songs, playlists } from "../data/songs";

export default function Library({
  onNavigate,
}: {
  onNavigate: (view: string, id?: string) => void;
}) {
  const [tab, setTab] = useState<"playlists" | "songs" | "artists">("playlists");

  return (
    <div className="fade-in px-4 md:px-8 py-6 md:py-8 space-y-6">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight">
        Your Library
      </h1>

      <div className="flex gap-2">
        {(["playlists", "songs", "artists"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${
              tab === t
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "playlists" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {playlists.map((pl) => (
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
      )}

      {tab === "songs" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {songs.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate("home")}
              className="text-left p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <img
                src={s.coverUrl}
                alt=""
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="font-semibold text-sm mt-2 truncate">
                {s.title}
              </div>
              <div className="text-xs text-white/60 truncate">{s.artist}</div>
            </button>
          ))}
        </div>
      )}

      {tab === "artists" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from(
            songs.reduce((acc, s) => {
              if (!acc.has(s.artist)) acc.set(s.artist, s.coverUrl);
              return acc;
            }, new Map<string, string>()),
          ).map(([artist, cover]) => (
            <div
              key={artist}
              className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <img
                src={cover}
                alt=""
                className="w-full aspect-square object-cover rounded-full shadow-lg"
              />
              <div className="font-semibold mt-3 text-sm truncate">
                {artist}
              </div>
              <div className="text-xs text-white/60">Artist</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
