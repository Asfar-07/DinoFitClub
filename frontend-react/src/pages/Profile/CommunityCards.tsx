import type { ReactElement } from "react";
import { Users, LogIn, Globe, Lock, Trophy } from "lucide-react";
import type { CommunitySummary } from "./Profile.type";

export type CommunityLevel = "Dino Bronze" | "Dino Silver" | "Dino Gold" | "Dino Elite";
export type CommunityPrivacy = "public" | "private";

export interface CommunityCardProps {
  data: CommunitySummary;
  onEnter?: (id: string) => void;
}

const LEVEL_STYLES: Record<CommunityLevel, string> = {
  "Dino Bronze": "border-[#c9975766] bg-[#c9975714] text-[#e0b27a]",
  "Dino Silver": "border-[#9fb0bd66] bg-[#9fb0bd14] text-[#c7d3da]",
  "Dino Gold": "border-[#facc1566] bg-[#facc1514] text-[#f5d76e]",
  "Dino Elite": "border-[#a78bfa66] bg-[#a78bfa14] text-[#c4b5fd]",
};

export default function CommunityCard({ data, onEnter = () => {} }: CommunityCardProps): ReactElement {
  const accent = "#7be6df";

  return (
    <div className="group glass-strong-nav relative flex flex-col gap-4 overflow-hidden rounded-2xl  p-5 transition
     hover:border-[#7be6df] hover:scale-[1.01] hover:-translate-y-2">
      {/* top accent line */}
      <div className="absolute left-0 right-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 bg-cyan-800 items-center justify-center overflow-hidden rounded-full border text-xl"
            style={{ borderColor: `${accent}66` }}
          >
            {data.logoUrl ? (
              <img src={data.logoUrl} alt={data.name} className="h-full w-full flex justify-center items-center object-cover" />
            ) : (
              <img src="/images/rank/dino_bronze.webp" alt={data.name} className="size-[80%] object-cover" />
            )}
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-(--secondary-text-color)">{data.publicId}</p>
            <p className="text-[18px] font-extrabold text-(--primary-text-color)">{data.name}</p>
          </div>
        </div>

        <span
          className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${LEVEL_STYLES["Dino Bronze"]}`}
        >
          <div className="size-4">
            <img src="/images/rank/dino_bronze.webp" alt="community rank" className=" object-cover"/>
          </div>
          {data.level.name}
        </span>
      </div>

      {/* stats */}
      <div className="flex items-center gap-4 text-xs text-[#bac7cc]">
        <span className="flex items-center gap-1.5">
          <Users size={13} className="text-(--symbol-color)"/>
          0 followers
        </span>
        <span className="flex items-center gap-1.5">
          <Users size={13} className="text-(--symbol-color)"/>
          0 members
        </span>
      </div>

      {/* description */}
      <p className="text-sm leading-relaxed font-medium text-(--secondary-text-color)">{data.description}</p>
      <span className="w-full h-[0.5px] bg-white/20"></span>

      {/* footer */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#ffffff1a] px-3 py-1 bg-[#7be6df]/20 text-[10px] font-bold uppercase tracking-wide text-[#7be6df]">
            {data.category}
          </span>
          {data.privacy && (
            <span className="flex items-center gap-1 rounded-full border border-[#ffffff1a] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#bac7cc]">
              {data.privacy === "PUBLIC" ? <Globe size={11} /> : <Lock size={11} />}
              {data.privacy}
            </span>
          )}
        </div>

        <button
          onClick={() => onEnter(data.publicId)}
          className="flex cursor-pointer shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7be6df] to-[#38d9c4] px-4 py-2 text-xs font-bold text-[#082a28] transition hover:brightness-105"
        >
          <LogIn size={13} />
          Enter
        </button>
      </div>
    </div>
  );
}