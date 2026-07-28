import { useEffect, useState } from "react";
import Sidebar, { MiniSidebar } from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import { PlayerProvider } from "./context/PlayerContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Admin from "./pages/Admin";
import PlaylistView from "./pages/Playlist";
import NowPlaying from "./pages/NowPlaying";
import { playlists } from "./data/songs";

type View =
  | { name: "home" }
  | { name: "search" }
  | { name: "library" }
  | { name: "admin" }
  | { name: "playlist"; id: string };

function parseHash(): View {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h) return { name: "home" };
  const [name, id] = h.split("/");
  if (
    name === "home" ||
    name === "search" ||
    name === "library" ||
    name === "admin"
  )
    return { name };
  if (name === "playlist" && id) return { name: "playlist", id };
  return { name: "home" };
}

function viewToString(v: View) {
  if (v.name === "playlist") return `playlist/${v.id}`;
  return v.name;
}

export default function App() {
  const [view, setView] = useState<View>(() => parseHash());
  const [nowPlaying, setNowPlaying] = useState(false);

  useEffect(() => {
    const onHash = () => setView(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (name: string, id?: string) => {
    let next: View;
    if (name === "playlist" && id) next = { name: "playlist", id };
    else next = { name: name as View["name"] } as View;
    window.location.hash = `/${viewToString(next)}`;
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The "current view key" for sidebar active state
  const currentView =
    view.name === "playlist" ? `playlist:${(view as { id: string }).id}` : view.name;

  return (
    <PlayerProvider>
      <div className="h-full flex flex-col">
        <div className="flex-1 flex min-h-0">
          <Sidebar
            onNavigate={navigate}
            currentView={currentView}
            playlistIds={playlists.map((p) => ({ id: p.id, name: p.name }))}
          />
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121218] via-[#0a0a10] to-[#07070b]">
            <TopBar view={view} onNavigate={navigate} />
            {view.name === "home" && <Home onNavigate={navigate} />}
            {view.name === "search" && <Search onNavigate={navigate} />}
            {view.name === "library" && <Library onNavigate={navigate} />}
            {view.name === "admin" && <Admin />}
            {view.name === "playlist" && (
              <PlaylistView playlistId={(view as { id: string }).id} />
            )}
          </main>
        </div>

        {/* Mobile bottom nav */}
        <MiniSidebar
          onNavigate={(n) => navigate(n)}
          currentView={view.name}
        />

        {/* Player */}
        <PlayerBar onOpenNowPlaying={() => setNowPlaying(true)} />

        {nowPlaying && <NowPlaying onClose={() => setNowPlaying(false)} />}
      </div>
    </PlayerProvider>
  );
}

function TopBar({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (v: string) => void;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 md:px-8 py-3 bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-2">
        <button
          onClick={() => history.back()}
          className="h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 grid place-items-center text-white/70 hover:text-white"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          onClick={() => history.forward()}
          className="h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 grid place-items-center text-white/70 hover:text-white"
          aria-label="Forward"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <div className="hidden sm:block text-xs text-white/50 capitalize ml-2">
          {view.name === "playlist" ? "Playlist" : view.name}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate("search")}
          className="md:hidden h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 grid place-items-center text-white/80"
          aria-label="Search"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="h-9 px-3 md:px-4 rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 grid place-items-center text-xs font-semibold shadow-lg shadow-violet-500/20">
          Guest · Free
        </div>
      </div>
    </div>
  );
}
