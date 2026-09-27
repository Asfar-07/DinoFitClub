import type { ReactElement } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import { useNavigate } from "react-router-dom";

interface CloudProps {
  className: string;
}

function Cloud({ className }: CloudProps): ReactElement {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
      <ellipse cx="55" cy="60" rx="45" ry="32" fill="#1d2233" />
      <ellipse cx="100" cy="45" rx="55" ry="38" fill="#1d2233" />
      <ellipse cx="150" cy="62" rx="40" ry="28" fill="#1d2233" />
    </svg>
  );
}

export interface NotFoundPageProps {
  brand?: string;
}

export default function NotFound(): ReactElement {
    
  const navigate = useNavigate();
  const onGoHome = () => navigate("/");
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-(--primary-bg-color)">
      {/* dotted grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(123,230,223,0.07) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <HexagonBackground hexagonSize={100} className="absolute z-10 inset-0 flex items-center justify-center rounded-xl "/>

      {/* header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d2233] ring-1 ring-[#56b2bb]/30">
            <img src="/android-chrome-192x192.png" alt="logo" />
          </span>
          <span className="text-lg font-bold tracking-tight text-(--primary-text-color)">
            Dino<span className="text-[#56b2bb]">FitClub</span>
          </span>
        </Link>
        <Link to="/support" className="rounded-full border border-[#7be6df] bg-[#7be6df0d] px-6 py-3 text-[12.5px] font-bold uppercase tracking-wide text-[#7be6df]">
          Help 
        </Link>
      </header>

      {/* content */}
      <main className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pb-10 pt-4 text-center md:pt-8">
        <p className="text-sm font-bold text-(--primary-text-color)">Oops!</p>

        {/* 404 with clouds behind */}
        <div className="relative mt-2 flex h-40 w-full items-center justify-center md:h-48">
          <Cloud className="absolute left-0 top-4 h-20 w-40 opacity-90 md:h-24 md:w-48" />
          <Cloud className="absolute right-0 top-10 h-16 w-36 opacity-80 md:h-20 md:w-44" />
          <Cloud className="absolute left-6 bottom-0 h-14 w-28 opacity-70" />
          <Cloud className="absolute right-4 bottom-2 h-14 w-28 opacity-70" />

          <h1
            className="relative select-none text-[96px] font-black leading-none text-transparent md:text-[160px]"
            style={{ WebkitTextStroke: "3px #7be6df" }}
          >
            404
          </h1>
        </div>

        <h2 className="mt-2 text-2xl font-extrabold tracking-wide text-(--primary-text-color) md:text-3xl">
          PAGE NOT <span className="text-[#7be6df]">FOUND</span>
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-(--secondary-text-color)">
          We're sorry, the page you're looking for doesn't exist. It may have moved or finished its last set.
        </p>

        <button
          onClick={onGoHome}
          className="mt-8 cursor-pointer flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7be6df] to-[#38d9c4] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#082a28] transition hover:brightness-105"
        >
          Go To Home
          <ArrowRight size={16} />
        </button>

        {/* <div className="mt-8">
        </div> */}
      </main>
    </div>
  );
}