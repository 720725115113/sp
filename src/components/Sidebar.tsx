import { usePlayer } from "../context/PlayerContext";

interface Props {
  onNavigate: (view: string, id?: string) => void;
  currentView: string;
  playlistIds: { id: string; name: string }[];
}

export default function Sidebar({ onNavigate, currentView, playlistIds }: Props) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-black/60 backdrop-blur-xl border-r border-white/5 p-4 gap-6">
      <button
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 px-2"
      >
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 grid place-items-center shadow-lg shadow-fuchsia-500/30">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.5 14.42a.62.62 0 0 1-.86.21c-2.36-1.44-5.33-1.77-8.83-.97a.63.63 0 1 1-.28-1.22c3.83-.87 7.11-.5 9.76 1.12a.62.62 0 0 1 .21.86Zm1.2-2.67a.78.78 0 0 1-1.07.25c-2.7-1.66-6.81-2.14-10-1.17a.78.78 0 1 1-.46-1.49c3.66-1.11 8.2-.57 11.3 1.33a.78.78 0 0 1 .23 1.08Zm.1-2.78C14.55 9 9.37 8.82 6.3 9.75a.93.93 0 1 1-.54-1.78c3.53-1.07 9.25-.86 13.13 1.45a.93.93 0 0 1-1.09 1.55Z" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">Wavelength</span>
      </button>

      <nav className="flex flex-col gap-1">
        <SideLink
          active={currentView === "home"}
          onClick={() => onNavigate("home")}
          icon={
            <path d="M12 3 2 12h3v8h5v-6h4v6h5v-8h3Z" />
          }
          label="Home"
        />
        <SideLink
          active={currentView === "search"}
          onClick={() => onNavigate("search")}
          icon={
            <>
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </>
          }
          label="Search"
        />
        <SideLink
          active={currentView === "library"}
          onClick={() => onNavigate("library")}
          icon={<path d="M4 4h4v16H4Zm6 0h4v16h-4Zm6 0 4 1-3 15-4-1Z" />}
          label="Your Library"
        />
      </nav>

      <div className="flex flex-col gap-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs uppercase tracking-wider text-white/50">
          Playlists
        </div>
        {playlistIds.map((p) => (
          <button
            key={p.id}
            onClick={() => onNavigate("playlist", p.id)}
            className={`text-left text-sm px-3 py-2 rounded-md truncate transition-colors ${
              currentView === `playlist:${p.id}`
                ? "bg-white/10 text-white"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-auto text-[11px] text-white/40 px-3 pb-2 leading-relaxed">
        Free streaming · no login required.
      </div>
    </aside>
  );
}

function SideLink({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-white/10 text-white"
          : "text-white/70 hover:text-white hover:bg-white/5"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        {icon}
      </svg>
      {label}
    </button>
  );
}

export function MiniSidebar({
  onNavigate,
  currentView,
}: {
  onNavigate: (v: string) => void;
  currentView: string;
}) {
  const items = [
    { k: "home", l: "Home" },
    { k: "search", l: "Search" },
    { k: "library", l: "Library" },
  ];
  return (
    <nav className="flex items-center justify-around bg-black/80 backdrop-blur-xl border-t border-white/10 px-2 py-2 md:px-4 md:justify-center md:gap-2 shrink-0">
      {items.map((it) => (
        <button
          key={it.k}
          onClick={() => onNavigate(it.k)}
          className={`flex-1 md:flex-none md:px-6 text-xs py-2 rounded-md font-medium transition-colors ${
            currentView === it.k
              ? "text-white bg-white/10"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          {it.l}
        </button>
      ))}
    </nav>
  );
}

// Hook-free helper used by other components to know if a given song is currently playing
export function useIsSongPlaying(songId: string) {
  const { currentSong, isPlaying } = usePlayer();
  return currentSong?.id === songId && isPlaying;
}
