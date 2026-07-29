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
  const { toasts, removeToast, createPlaylist, currentSong } = usePlayer();
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

  const activeColor = currentSong?.color ?? "#6D5EF8";

  return (
    <div className="h-full flex flex-col bg-[#09090B] text-white relative">
      {/* Ambient Pulsing Background Glow Orbs */}
      <div className="ambient-bg">
        <div
          className="ambient-orb-1 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle, ${activeColor}33 0%, rgba(24, 226, 154, 0.08) 50%, transparent 70%)`,
          }}
        />
        <div className="ambient-orb-2" />
      </div>

      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => removeToast(t.id)}
            className="pointer-events-auto glass-card-premium px-4 py-3 rounded-2xl shadow-2xl border border-[#18E29A]/40 text-xs font-bold text-white flex items-center gap-2.5 animate-fade-in backdrop-blur-2xl"
          >
            <span className="text-base">{t.type === "success" ? "✨" : t.type === "error" ? "⚠️" : "🎵"}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Main Body Grid */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative z-10">
        <Sidebar
          onNavigate={navigate}
          currentView={currentView}
          playlistIds={catalog.playlists.map((p) => ({ id: p.id, name: p.name }))}
          onCreatePlaylistModal={() => setShowCreateModal(true)}
        />

        <main className="flex-1 overflow-y-auto pb-36 lg:pb-32 bg-transparent">
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

      {/* Sticky Mobile Player Bar (Positioned directly above bottom nav) */}
      <PlayerBar
        onOpenNowPlaying={() => setNowPlaying(true)}
        onOpenLyrics={() => setNowPlaying(true)}
        onOpenQueue={() => setNowPlaying(true)}
      />

      {/* Mobile Bottom Navigation (Positioned fixed at very bottom) */}
      <MiniSidebar onNavigate={(n) => navigate(n)} currentView={view.name} />

      {/* Expanded Fullscreen Player Modal */}
      {nowPlaying && <NowPlaying onClose={() => setNowPlaying(false)} />}

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl grid place-items-center p-4 animate-fade-in">
          <form
            onSubmit={handleCreatePlaylistSubmit}
            className="w-full max-w-md glass-card-premium p-7 rounded-3xl space-y-5 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold font-heading text-white">Create New Playlist</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/15 grid place-items-center text-white/60 hover:text-white transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              <label className="block text-xs font-bold text-white/70">Playlist Name</label>
              <input
                required
                autoFocus
                value={newPlName}
                onChange={(e) => setNewPlName(e.target.value)}
                placeholder="e.g. Midnight Chill Beats"
                className="w-full glass-input-premium rounded-2xl px-4 py-3 text-sm text-white outline-none font-medium"
              />

              <label className="block text-xs font-bold text-white/70">Description (Optional)</label>
              <textarea
                rows={2}
                value={newPlDesc}
                onChange={(e) => setNewPlDesc(e.target.value)}
                placeholder="Describe your mix..."
                className="w-full glass-input-premium rounded-2xl px-4 py-3 text-sm text-white outline-none font-medium"
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
                Create Playlist
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
