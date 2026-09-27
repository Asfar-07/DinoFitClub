import { useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  MapPin,
  Users,
  BarChart3,
  Trophy,
  Calendar,
  Hash,
  Tag,
  Phone,
  Link2,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Info,
  LineChart as LineChartIcon,
} from "lucide-react";
import type { CommunityLevel, MainCommunityResponse } from "../Community.type";


interface TopMember {
  rank: number;
  name: string;
  role: string;
  xp: string;
  avatarEmoji: string;
}

interface MonthlyActivityPoint {
  month: string;
  value: number;
}

interface InfoStripItem {
  icon: ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
}

interface CommunityStat {
  icon: ReactNode;
  value: string;
  label: string;
}


const TOP_MEMBERS: TopMember[] = [
  { rank: 1, name: "RexFit", role: "Trainer", xp: "12.4K XP", avatarEmoji: "🦖" },
  { rank: 2, name: "DinoQueen", role: "Member", xp: "10.8K XP", avatarEmoji: "🦕" },
  { rank: 3, name: "GymBro", role: "Member", xp: "9.6K XP", avatarEmoji: "🏋️" },
  { rank: 4, name: "FitRaptor", role: "Member", xp: "8.2K XP", avatarEmoji: "🦴" },
  { rank: 5, name: "MuscleDino", role: "Member", xp: "7.5K XP", avatarEmoji: "🦕" },
];

const MONTHLY_ACTIVITY: MonthlyActivityPoint[] = [
  { month: "Jan", value: 50 },
  { month: "Feb", value: 95 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 80 },
  { month: "May", value: 145 },
  { month: "Jun", value: 130 },
];

const RANK_BADGE_COLOR: Record<number, string> = {
  1: "bg-[#facc15] text-[#082a28]",
  2: "bg-[#cbd5e1] text-[#082a28]",
  3: "bg-[#c9975766] text-[#f5d9b8]",
};

function RankBadgeIllustration(): ReactElement {
  return (
    <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
      <polygon points="50,4 92,26 92,64 50,96 8,64 8,26" fill="#94a3b8" opacity="0.9" />
      <polygon points="50,14 82,32 82,60 50,86 18,60 18,32" fill="#64748b" />
      <circle cx="50" cy="46" r="18" fill="#334155" />
      <path d="M42 50 C42 42 58 42 58 50 C58 56 50 58 50 63" stroke="#cbd5e1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="46" r="20" fill="none" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ children, className = "" }: CardProps): ReactElement {
  return <div className={`rounded-2xl border border-[#ffffff10] bg-[#101a33] p-6 ${className}`}>{children}</div>;
}

interface CardHeaderProps {
  icon: ReactNode;
  title: string;
  action?: ReactNode;
}

export function DashboardCardHeader({ icon, title, action }: CardHeaderProps): ReactElement {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7be6df1a] text-[#7be6df]">{icon}</span>
        <p className="text-sm font-bold text-[#f0f4f8]">{title}</p>
      </div>
      {action}
    </div>
  );
}

export function AboutCommunityCard({ about } : { about: string | undefined }): ReactElement {
  return (
    <DashboardCard className="flex flex-1 flex-col">
      <DashboardCardHeader icon={<Users size={16} />} title="About Community" />
      <p className="flex-1 text-sm leading-relaxed text-[#bac7cc]">
        {about}
      </p>
      <button className="mt-4 flex w-fit items-center gap-2 rounded-full border border-[#7be6df40] px-4 py-2 text-xs font-bold text-[#7be6df] transition hover:bg-[#7be6df14]">
        View Details
        <ArrowRight size={13} />
      </button>
    </DashboardCard>
  );
}

export function CurrentRankCard({ currentPoint, level } : { currentPoint: number; level: CommunityLevel }): ReactElement {
  const xp = currentPoint;
  const maxXp = 500;
  const pct = Math.round((xp / maxXp) * 100);

  return (
    <DashboardCard className="flex w-full flex-col lg:w-[320px]">
      <DashboardCardHeader icon={<Trophy size={16} />} title="Current Rank" />
      <div className="flex items-center gap-4">
        <RankBadgeIllustration />
        <div>
          <p className="text-lg font-extrabold text-[#f0f4f8]">{level.name}</p>
          <p className="text-xs text-[#6b7684]">Keep going! You're doing great.</p>
        </div>
      </div>
      <div className="mt-5">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#ffffff0d]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#0f766e] to-[#38d9c4]" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1.5 text-right text-xs text-[#6b7684]">
          {xp} / {maxXp} XP
        </p>
      </div>
    </DashboardCard>
  );
}

export function CommunityStatsCard(): ReactElement {
  const COMMUNITY_STATS: CommunityStat[] = [
  { icon: <Users size={16} />, value: "0", label: "Followers" },
  { icon: <Users size={16} />, value: "0", label: "Memberships" },
  { icon: <Calendar size={16} />, value: "Empty", label: "Events" },
  { icon: <MapPin size={16} />, value: "None", label: "Branches" },
];
  return (
    <DashboardCard>
      <DashboardCardHeader icon={<BarChart3 size={16} />} title="Community Stats" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COMMUNITY_STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-2 rounded-xl border border-[#ffffff0d] bg-[#0a0f22] p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7be6df1a] text-[#7be6df]">{s.icon}</span>
            <p className="text-lg font-extrabold text-[#f0f4f8]">{s.value}</p>
            <p className="text-xs text-[#6b7684]">{s.label}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

export function MonthlyActivityCard(): ReactElement {
  const [filter, setFilter] = useState<"Members" | "Events" | "Revenue">("Members");

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<LineChartIcon size={16} />}
        title="Monthly Activity"
        action={
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="appearance-none rounded-lg border border-[#ffffff14] bg-[#0a0f22] py-1.5 pl-3 pr-8 text-xs font-semibold text-[#f0f4f8] outline-none"
            >
              <option value="Members">Members</option>
              <option value="Events">Events</option>
              <option value="Revenue">Revenue</option>
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7684]" />
          </div>
        }
      />
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_ACTIVITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7be6df" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#7be6df" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ffffff0d" vertical={false} />
            <XAxis dataKey="month" stroke="#6b7684" tick={{ fontSize: 12, fill: "#6b7684" }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b7684" tick={{ fontSize: 12, fill: "#6b7684" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#0d1730", border: "1px solid #ffffff1a", borderRadius: 10, fontSize: 12 }}
              labelStyle={{ color: "#f0f4f8" }}
            />
            <Area type="monotone" dataKey="value" stroke="#38d9c4" strokeWidth={2.5} fill="url(#activityFill)" dot={{ r: 3, fill: "#38d9c4" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}

export function TopMembersCard(): ReactElement {
  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<Trophy size={16} />}
        title="Top Members"
        action={<button className="text-xs font-bold text-[#7be6df] hover:underline">View All</button>}
      />
      <div className="flex flex-col divide-y divide-[#ffffff0d]">
        {TOP_MEMBERS.map((m) => (
          <div key={m.rank} className="flex items-center gap-3 py-3">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                RANK_BADGE_COLOR[m.rank] ?? "bg-[#ffffff0d] text-[#bac7cc]"
              }`}
            >
              {m.rank}
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#7be6df40] bg-[#7be6df14] text-base">
              {m.avatarEmoji}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#f0f4f8]">{m.name}</p>
              <p className="text-xs text-[#6b7684]">{m.role}</p>
            </div>
            <p className="text-xs font-bold text-[#7be6df]">{m.xp}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

export function QuickInfoCard({ dashboardData }:  { dashboardData: MainCommunityResponse | undefined }): ReactElement {

  let INFO_STRIP: InfoStripItem[] = [];
  
      const displayValue = (value: string | null | undefined) =>
          value?.trim() || "NONE";
  
      if (dashboardData?.access === "OWNER") {
          INFO_STRIP = [
              {
                  icon: <Hash size={14} />,
                  label: "Public ID",
                  value: displayValue(dashboardData.community.publicId),
              },
              {
                  icon: <Tag size={14} />,
                  label: "Category",
                  value: displayValue(dashboardData.community.category),
              },
              {
                  icon: <Calendar size={14} />,
                  label: "Started",
                  value: displayValue(dashboardData.community.whenStarted),
              },
              {
                  icon: <Phone size={14} />,
                  label: "Phone",
                  value: displayValue(dashboardData.community.phoneNumber),
              },
              {
                  icon: <Link2 size={14} />,
                  label: "Website",
                  value: displayValue(dashboardData.community.website),
                  isLink: true,
              },
              {
                  icon: <MapPin size={14} />,
                  label: "Address",
                  value: displayValue(dashboardData.community.address),
              },
              {
                  icon: <ShieldCheck size={14} />,
                  label: "Privacy",
                  value: displayValue(dashboardData.community.privacy),
              },
          ];
      }
  
      if (dashboardData?.access === "PUBLIC") {
          INFO_STRIP = [
              {
                  icon: <Hash size={14} />,
                  label: "Public ID",
                  value: displayValue(dashboardData.community.publicId),
              },
              {
                  icon: <Tag size={14} />,
                  label: "Category",
                  value: displayValue(dashboardData.community.category),
              },
          ];
      }
  
  return (
    <DashboardCard>
      <DashboardCardHeader icon={<Info size={16} />} title="Quick Info" />
      <div className="flex flex-col divide-y divide-[#ffffff0d]">
        {INFO_STRIP.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 py-2.5">
            <span className="flex items-center gap-2 text-xs text-[#6b7684]">
              {item.icon}
              {item.label}
            </span>
            <span className={`text-xs font-semibold ${item.isLink ? "text-[#7be6df]" : "text-[#f0f4f8]"}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}