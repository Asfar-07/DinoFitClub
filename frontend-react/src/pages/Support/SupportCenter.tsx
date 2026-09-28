import { useState, type ReactElement, type ReactNode } from "react";
import {
  ChevronRight,
  Headphones,
  HelpCircle,
  MessageCircle,
  AlertTriangle,
  ClipboardList
} from "lucide-react";
import FaqTab from "./FaqTab";
import ReportProblemTab from "./ReportProblemTab";
import ContactSupportTab from "./ContactSupportTab";
import MyRequestsTab from "./MyRequestsTab";
import { Card } from "@/components/ui/card";


/* Shared types  */

type TabKey = "faq" | "contact" | "report" | "requests";

interface TabItem {
  key: TabKey;
  label: string;
  icon: ReactNode;
}

const TABS: TabItem[] = [
  { key: "faq", label: "FAQ", icon: <HelpCircle size={16} /> },
  { key: "contact", label: "Contact Support", icon: <MessageCircle size={16} /> },
  { key: "report", label: "Report a Problem", icon: <AlertTriangle size={16} /> },
  { key: "requests", label: "My Requests", icon: <ClipboardList size={16} /> },
];

export const supportLightInputClass =
  "w-full rounded-xl border border-(--secondary-text-color)/20 bg-white/10 px-4 py-3.5 text-sm text-(--primary-text-color) outline-none " +
  "placeholder:text-[#94a3b8] transition focus:border-[#0d9488] focus:shadow-[0_0_0_3px_#0d948826]";

function Hero(): ReactElement {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0f22] via-[#0d1730] to-[#0a0f22] px-4 py-10 sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="flex items-center gap-2 text-sm font-bold text-[#7be6df]">
            <Headphones size={16} />
            Support Center
          </span>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#f0f4f8] sm:text-4xl">
            How can we help you today?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#bac7cc] sm:text-base">
            Find answers, get support, or report an issue. We're here to help you have the best experience on
            DinoClub.
          </p>
        </div>
      </div>
    </div>
  );
}


/* Tabs */

interface TabsBarProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
}

function TabsBar({ active, onChange }: TabsBarProps): ReactElement {
  return (
    <div className="border-b border-[#e2e8f0] bg-(--primary-bg-color)">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 sm:px-6 md:px-10">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 text-sm font-semibold transition ${
                isActive ? "border-[#0d9488] text-[#0d9488]" : "border-transparent text-(--secondary-text-color) hover:text-(--primary-text-color)"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}


/* Shared "Quick Links" sidebar card  */

interface QuickLink {
  key: TabKey;
  icon: ReactNode;
  title: string;
  description: string;
}

const QUICK_LINKS: QuickLink[] = [
  { key: "faq", icon: <HelpCircle size={15} />, title: "View FAQ", description: "Find answers to common questions" },
  { key: "contact", icon: <MessageCircle size={15} />, title: "Contact Support", description: "Get help from our support team" },
  { key: "requests", icon: <ClipboardList size={15} />, title: "My Requests", description: "Check the status of your reports and requests" },
];

export function QuickLinksSidebar({ onGoToTab }: { onGoToTab: (key: TabKey) => void }): ReactElement {
  return (
    <Card className="bg-(--secondary-bg-color) p-5 border-0 ">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--primary-text-color) text-[#0d9488]">
          <Headphones size={16} />
        </span>
        <p className="text-sm font-bold text-(--primary-text-color)">Quick Links</p>
      </div>
      <div className="mt-4 flex flex-col divide-y divide-[#e2e8f0]">
        {QUICK_LINKS.map((link) => (
          <button
            key={link.key}
            onClick={() => onGoToTab(link.key)}
            className="flex items-center justify-between gap-3 py-3 text-left transition hover:opacity-80"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--primary-text-color) text-[#0d9488]">
                {link.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-(--primary-text-color)">{link.title}</p>
                <p className="text-xs text-(--secondary-text-color)">{link.description}</p>
              </div>
            </div>
            <ChevronRight size={15} className="shrink-0 text-(--secondary-text-color)" />
          </button>
        ))}
      </div>
    </Card>
  );
}


export default function SupportCenter(): ReactElement {
  const [activeTab, setActiveTab] = useState<TabKey>("report");

  return (
    <div className="min-h-screen w-full bg-(--primary-bg-color)">
      <Hero />
      <TabsBar active={activeTab} onChange={setActiveTab} />

      {activeTab === "faq" && <FaqTab onGoToTab={setActiveTab} />}
      {activeTab === "contact" && <ContactSupportTab />}
      {activeTab === "report" && <ReportProblemTab onGoToTab={setActiveTab} />}
      {activeTab === "requests" && <MyRequestsTab />}
    </div>
  );
}