import { useEffect, useState } from "react";
import Sidebar, { MiniSidebar } from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import PremiumHeader from "./components/PremiumHeader";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import PlaylistView from "./pages/Playlist";
import NowPlaying from "./pages/NowPlaying";
import { useCatalog } from "./services/catalog";

type View =
  | { name: "home" }
  | { name: "search" }
  | { name: "library" }
  | { name: "playlist"; id: string };

function parseHash(): View {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h) return { name: "home" };
  const [name, id] = h.split("/");
  if (name === "home" || name === "search" || name === "library") return { name };
  if (name === "playlist" && id) return { name: "playlist", id };
  return { name: "home" };
}

function viewToString(v: View) {
  if (v.name === "playlist") return `playlist/${v.id}`;
  return v.name;
}

export default function App() {
  const catalog = useCatalog();
  const [view, setView] = useState<View>(() => parseHash());
  const [searchQuery, setSearchQuery] = useState("");
  const [nowPlaying, setNowPlaying] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const currentView =
    view.name === "playlist" ? `playlist:${(view as { id: string }).id}` : view.name;

  return (
    <PlayerProvider songs={catalog.songs}>
      <AppContent
        view={view}
        currentView={currentView}
        navigate={navigate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        nowPlaying={nowPlaying}
        setNowPlaying={setNowPlaying}
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        catalog={catalog}
      />
    </PlayerProvider>
  );
}

function AppContent({
  view,
  currentView,
  navigate,
  searchQuery,
  setSearchQuery,
  nowPlaying,
  setNowPlaying,
  showCreateModal,
  setShowCreateModal,
  catalog,
}: {
  view: View;
  currentView: string;
  navigate: (name: string, id?: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  nowPlaying: boolean;
  setNowPlaying: (v: boolean) => void;
  showCreateModal: boolean;
  setShowCreateModal: (v: boolean) => void;
  catalog: ReturnType<typeof useCatalog>;
}) {
  const { toasts, removeToast, createPlaylist } = usePlayer();
  const [newPlName, setNewPlName] = useState("");
  const [newPlDesc, setNewPlDesc] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isCollab, setIsCollab] = useState(false);

  const handleCreatePlaylistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlName.trim()) return;
    const pl = createPlaylist(newPlName, newPlDesc, isPrivate, isCollab);
    setNewPlName("");
    setNewPlDesc("");
    setShowCreateModal(false);
    navigate("playlist", pl.id);
  };

  return (
    <div className="h-full flex flex-col bg-[#09090B] text-white">
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => removeToast(t.id)}
            className="pointer-events-auto glass-card px-4 py-2.5 rounded-2xl shadow-2xl border border-[#18E29A]/40 text-xs font-bold text-white flex items-center gap-2 animate-fade-in"
          >
            <span>{t.type === "success" ? "✅" : t.type === "error" ? "❌" : "🎵"}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Main Body Grid */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <Sidebar
          onNavigate={navigate}
          currentView={currentView}
          playlistIds={catalog.playlists.map((p) => ({ id: p.id, name: p.name }))}
          onCreatePlaylistModal={() => setShowCreateModal(true)}
        />

        <main className="flex-1 overflow-y-auto pb-28 md:pb-32 bg-[#09090B]">
          <PremiumHeader
            onSearchClick={() => navigate("search")}
            onNavigate={navigate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {view.name === "home" && <Home onNavigate={navigate} />}
          {view.name === "search" && (
            <Search
              onNavigate={navigate}
              query={searchQuery}
              onQueryChange={setSearchQuery}
            />
          )}
          {view.name === "library" && (
            <Library
              onNavigate={navigate}
              onCreatePlaylistModal={() => setShowCreateModal(true)}
            />
          )}
          {view.name === "playlist" && (
            <PlaylistView playlistId={(view as { id: string }).id} />
          )}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MiniSidebar onNavigate={(n) => navigate(n)} currentView={view.name} />

      {/* Sticky Player Bar */}
      <PlayerBar
        onOpenNowPlaying={() => setNowPlaying(true)}
        onOpenLyrics={() => setNowPlaying(true)}
        onOpenQueue={() => setNowPlaying(true)}
      />

      {/* Expanded Fullscreen Player Modal */}
      {nowPlaying && <NowPlaying onClose={() => setNowPlaying(false)} />}

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md grid place-items-center p-4 animate-fade-in">
          <form
            onSubmit={handleCreatePlaylistSubmit}
            className="w-full max-w-md glass-card p-6 rounded-3xl space-y-4 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-white">Create New Playlist</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-white/70">Playlist Name</label>
              <input
                required
                autoFocus
                value={newPlName}
                onChange={(e) => setNewPlName(e.target.value)}
                placeholder="e.g. Midnight Lo-Fi Vibes"
                className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />

              <label className="block text-xs font-bold text-white/70">Description (Optional)</label>
              <textarea
                rows={2}
                value={newPlDesc}
                onChange={(e) => setNewPlDesc(e.target.value)}
                placeholder="Describe your mix..."
                className="w-full glass-input rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="accent-[#18E29A] h-4 w-4 rounded"
                  />
                  Private Playlist
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCollab}
                    onChange={(e) => setIsCollab(e.target.checked)}
                    className="accent-[#18E29A] h-4 w-4 rounded"
                  />
                  Collaborative
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-2.5 rounded-full btn-glow-secondary text-xs font-bold text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full btn-glow-primary text-xs font-extrabold text-black"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
