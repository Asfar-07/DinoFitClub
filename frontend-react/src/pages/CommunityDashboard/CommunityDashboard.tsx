import { useState, type ReactElement, type ReactNode } from "react";
import {
  MapPin,
  Home,
  Users,
  BarChart3,
  Trophy,
  Calendar,
  Building2,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  Dumbbell,
  Globe,
  Hash,
  Tag,
  Phone,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { AboutCommunityCard, CommunityStatsCard, CurrentRankCard, MonthlyActivityCard, QuickInfoCard, TopMembersCard } from "./MainDashboard/SubDashboardElement";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type NavKey = "dashboard" | "members" | "analysis" | "rank" | "event" | "branch";

interface NavItem {
  key: NavKey;
  label: string;
  icon: ReactNode;
}

interface InfoStripItem {
  icon: ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <Home size={17} /> },
  { key: "members", label: "Membership", icon: <Users size={17} /> },
  { key: "analysis", label: "Analysis", icon: <BarChart3 size={17} /> },
  { key: "rank", label: "Rank", icon: <Trophy size={17} /> },
  { key: "event", label: "Event", icon: <Calendar size={17} /> },
  { key: "branch", label: "Branch", icon: <Building2 size={17} /> },
];

const INFO_STRIP: InfoStripItem[] = [
  { icon: <Hash size={14} />, label: "Public ID", value: "DFC-7842" },
  { icon: <Tag size={14} />, label: "Category", value: "Fitness" },
  { icon: <Calendar size={14} />, label: "Started", value: "12 Mar 2025" },
  { icon: <Phone size={14} />, label: "Phone", value: "+91 98765 43210" },
  { icon: <Link2 size={14} />, label: "Website", value: "www.dinofitclub.com", isLink: true },
  { icon: <MapPin size={14} />, label: "Address", value: "Trivandrum, Kerala" },
  { icon: <ShieldCheck size={14} />, label: "Privacy", value: "Public" },
];

/* Sidebar */

interface SidebarProps {
  active: NavKey;
  onChange: (key: NavKey) => void;
  open: boolean;
  onClose: () => void;
}

function SidebarContent({ active, onChange }: { active: NavKey; onChange: (key: NavKey) => void }): ReactElement {
  return (
    // MENU SIDEBAR
    <div className="flex h-full flex-col gap-8 px-4 py-6">
      <div className="flex flex-col gap-1">
        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b7684]">Menu</p>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-gradient-to-r from-[#0f766e] to-[#0d9488] text-white"
                  : "text-[#bac7cc] hover:bg-[#ffffff08] hover:text-[#f0f4f8]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
      {/* GENERAL SIDEBAR */}
      <div className="flex flex-col gap-1 border-t border-[#ffffff0d] pt-6">
        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b7684]">General</p>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#bac7cc] transition hover:bg-[#ffffff08] hover:text-[#f0f4f8]">
          <SettingsIcon size={17} />
          Settings
        </button>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#bac7cc] transition hover:bg-[#ffffff08] hover:text-[#f0f4f8]">
          <HelpCircle size={17} />
          Help
        </button>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#f87171] transition hover:bg-[#f8717114]">
          <LogOut size={17} />
          Logout
        </button>
      </div>

      <div className="mt-auto flex flex-col items-center gap-3 rounded-2xl bg-[#0a0f22] p-5 text-center">
        <p className="text-sm font-bold text-[#7be6df]">Stronger Together</p>
        <p className="text-xs leading-relaxed text-[#6b7684]">Build your fitness community with DinoFitClub</p>
      </div>
    </div>
  );
}

function Sidebar({ active, onChange, open, onClose }: SidebarProps): ReactElement {
  return (
    <>
      {/* desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-[#ffffff0d] bg-[#0d1730] lg:block">
        <SidebarContent active={active} onChange={onChange} />
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-[#0d1730]">
            <SidebarContent
              active={active}
              onChange={(key) => {
                onChange(key);
                onClose();
              }}
            />
          </aside>
        </div>
      )}
    </>
  );
}

/* Hero */

function Hero(): ReactElement {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#7be6df26]">
      <div className="relative bg-gradient-to-br from-[#0d2a2e] via-[#0a1f2b] to-[#0a0f22] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#7be6df] bg-[#0a0f22] text-3xl">
              <Dumbbell className="text-[#7be6df]" size={30} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#f0f4f8] sm:text-3xl">DinoFit Community</h1>
                <span className="flex items-center gap-1 rounded-full border border-[#7be6df40] bg-[#7be6df14] px-2.5 py-0.5 text-[11px] font-bold text-[#7be6df]">
                  <Globe size={11} />
                  Public
                </span>
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#bac7cc]">
                A growing fitness community for all fitness lovers. Train together, grow together!
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#7be6df]" />
                  <div>
                    <p className="text-sm font-bold text-[#f0f4f8]">1.2K</p>
                    <p className="text-[11px] text-[#6b7684]">Followers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#7be6df]" />
                  <div>
                    <p className="text-sm font-bold text-[#f0f4f8]">248</p>
                    <p className="text-[11px] text-[#6b7684]">Memberships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <p className="max-w-[9rem] font-serif text-xl italic leading-tight text-[#7be6df]">
              Stronger
              <br />
              Healthier
              <br />
              <span className="text-[#f0f4f8]">Together</span>
            </p>
          </div>
        </div>

        {/* info strip */}
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#ffffff0d] pt-5">
          {INFO_STRIP.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="text-[#7be6df]">{item.icon}</span>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#6b7684]">{item.label}</p>
                <p className={`text-sm font-semibold ${item.isLink ? "text-[#7be6df]" : "text-[#f0f4f8]"}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Main Page */
export default function CommunityDashboard(): ReactElement {
  const [activeNav, setActiveNav] = useState<NavKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen w-full bg-[#0a0f22] text-[#f0f4f8]">
      <Sidebar active={activeNav} onChange={setActiveNav} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* <Header userName={userName} userRole={userRole} onMenuClick={() => setSidebarOpen(true)} /> */}

        <main className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
          <Hero />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
            {/* main column */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 lg:flex-row">
                <AboutCommunityCard />
                <CurrentRankCard />
              </div>
              <CommunityStatsCard />
              <MonthlyActivityCard />
            </div>

            {/* sidebar column */}
            <div className="flex flex-col gap-6">
              <TopMembersCard />
              <QuickInfoCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}