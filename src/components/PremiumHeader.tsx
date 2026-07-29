export default function PremiumHeader({
  onNavigate,
}: {
  onSearchClick?: () => void;
  onNavigate: (view: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}) {
  return (
    <header className="sticky top-0 z-30 px-4 md:px-8 py-3.5 flex items-center justify-between pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => history.back()}
          className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 grid place-items-center text-white/80 hover:text-white hover:bg-black/80 icon-btn-smooth shadow-lg"
          aria-label="Go back"
          title="Go back"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => history.forward()}
          className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 grid place-items-center text-white/80 hover:text-white hover:bg-black/80 icon-btn-smooth shadow-lg"
          aria-label="Go forward"
          title="Go forward"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <button
          onClick={() => onNavigate("home")}
          className="lg:hidden flex items-center gap-2 ml-2 pointer-events-auto"
        >
          <img
            src="/app_icon.png"
            alt="Wavelength"
            className="h-8 w-8 rounded-xl object-cover border border-white/20 shadow-md"
          />
        </button>
      </div>
    </header>
  );
}
