import { useState } from "react";
import { useCatalog } from "../services/catalog";
import { SongCard } from "../components/SongList";

export default function Library({ onNavigate }: { onNavigate: (view: string, id?: string) => void }) {
  const [tab, setTab] = useState<"playlists" | "songs" | "artists">("playlists");
  const { songs, playlists, artists } = useCatalog();

  return (
    <div className="fade-in px-4 md:px-8 py-6 md:py-8 space-y-6">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight">Your Library</h1>
      <div className="flex gap-2">
        {(["playlists", "songs", "artists"] as const).map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${tab === item ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"}`}>
            {item}
          </button>
        ))}
      </div>

      {tab === "playlists" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {playlists.map((playlist) => (
            <button key={playlist.id} onClick={() => onNavigate("playlist", playlist.id)} className="text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <img src={playlist.coverUrl} alt="" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
              <div className="font-semibold mt-3 text-sm truncate">{playlist.name}</div>
              <div className="text-xs text-white/60 truncate">{playlist.songIds.length} songs</div>
            </button>
          ))}
        </div>
      )}

      {tab === "songs" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {songs.map((song) => <SongCard key={song.id} song={song} queue={songs} />)}
        </div>
      )}

      {tab === "artists" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <div key={artist.id} className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <img src={artist.coverUrl} alt="" className="w-full aspect-square object-cover rounded-full shadow-lg" />
              <div className="font-semibold mt-3 text-sm truncate">{artist.name}</div>
              <div className="text-xs text-white/60">Artist</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
