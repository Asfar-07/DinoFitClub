import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "dinofitclub:beta-notice-seen";

export default function BetaNotice() {
  const [visible, setVisible] = useState<boolean>(false);
  const [entered, setEntered] = useState<boolean>(false);

  // Decide on mount whether to show (avoids SSR/hydration mismatch)
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // storage blocked: fall back to showing it
    }
    if (!seen) {
      setVisible(true);
      // next frame -> trigger the slide-in transition
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage errors
    }
    setEntered(false);
    // wait for the exit transition before unmounting
    window.setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="DinoFitClub Beta notice"
      className={[
        "fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-xl sm:bottom-6 sm:right-6",
        "rounded-2xl border border-white/25 bg-(--primary-bg-color)/85 p-5 text-(--primary-text-color)",
        "shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150",
        "transition-all duration-300 ease-out",
        entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      ].join(" ")}
    >
      {/* soft glass highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent"
      />

      <button
        type="button"
        onClick={dismiss}
        aria-label="Close beta notice"
        className="absolute right-3 top-3 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-(--secondary-text-color) transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X />
      </button>

      <div className="relative pr-6">
        <h3 className="text-base font-semibold leading-snug">
          Important: DinoFitClub is currently in Beta 🚧
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-(--secondary-text-color)">
          Welcome to the DinoFitClub Beta! From September 1, 2026 to October
          10, 2026, we’re testing and improving the platform with the help of
          our early users.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-(--secondary-text-color)">
          During this Beta period, your data may be reset or removed after
          testing is completed. Please avoid using the Beta environment to
          store important or permanent information.
        </p>

        <button
          type="button"
          onClick={dismiss}
          className="mt-4 w-full cursor-pointer rounded-xl border border-white/30 bg-(--secondary-bg-color) px-4 py-2 text-sm font-medium transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Got it
        </button>
      </div>
    </div>
  );
}