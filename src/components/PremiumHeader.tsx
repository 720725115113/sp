import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function PremiumHeader({
  onSearchClick,
  onNavigate,
  searchQuery,
  onSearchChange,
}: {
  onSearchClick: () => void;
  onNavigate: (view: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}) {
  const { addToast } = usePlayer();
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      addToast("Voice Search is not supported by your browser.", "warning");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      setIsListening(true);
      addToast("Listening... Speak now", "info");

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && onSearchChange) {
          onSearchChange(transcript);
          onSearchClick();
          addToast(`Searching for: "${transcript}"`, "success");
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        addToast("Voice recognition error. Try again.", "error");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      addToast("Could not start microphone.", "error");
    }
  };

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Navigation history controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => history.back()}
          className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 grid place-items-center text-white/70 hover:text-white transition-all"
          aria-label="Go back"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => history.forward()}
          className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 grid place-items-center text-white/70 hover:text-white transition-all"
          aria-label="Go forward"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-xl mx-2">
        <div className="glass-input rounded-full px-4 py-2 flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            data-global-search
            value={searchQuery ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onFocus={onSearchClick}
            placeholder="Search songs, artists, albums, playlists... (Ctrl+K)"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
          {/* Voice Search Button */}
          <button
            onClick={startVoiceSearch}
            className={`h-7 w-7 rounded-full grid place-items-center transition-all ${
              isListening
                ? "bg-rose-500 text-white animate-pulse"
                : "text-white/60 hover:text-[#18E29A] hover:bg-white/10"
            }`}
            aria-label="Voice Search"
            title="Voice Search"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right User Badge */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#18E29A]/15 to-[#6D5EF8]/15 border border-[#18E29A]/30">
          <span className="w-2 h-2 rounded-full bg-[#18E29A] animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wide">Premium HD</span>
        </div>

        <div className="h-9 w-9 rounded-full btn-glow-primary grid place-items-center text-black font-extrabold text-xs shadow-md">
          WV
        </div>
      </div>
    </header>
  );
}
