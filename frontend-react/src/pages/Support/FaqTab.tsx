import { Card } from "@/components/ui/card";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { useState, type ReactElement } from "react";
import { QuickLinksSidebar } from "./SupportCenter";
import { supportLightInputClass as lightInputClass} from "./SupportCenter";

type TabKey = "faq" | "contact" | "report" | "requests";
/* FAQ tab */

interface FaqEntry {
  question: string;
  answer: string;
}

const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "How do I create a community?",
    answer:
      "Go to Communities → Create Community, fill in the name, category and description, and choose a privacy level. Your community goes live instantly.",
  },
  {
    question: "How do community ranks work?",
    answer:
      "Communities climb from Dino Bronze up to Dino Elite as their followers, members and activity grow. Ranks are recalculated automatically.",
  },
  {
    question: "Can I change my email or password?",
    answer: "Yes — head to Settings → Login & Security to update your email, password, or two-factor authentication.",
  },
  {
    question: "How do refunds work for memberships?",
    answer:
      "Refund eligibility depends on the plan and how much of the billing period has passed. Contact Support with your order details and we'll take a look.",
  },
  {
    question: "Is my data private?",
    answer:
      "Only what you choose to share publicly on your profile or communities is visible to others. You control visibility in Settings → Privacy.",
  },
];


export default function FaqTab({ onGoToTab }: { onGoToTab: (key: TabKey) => void }): ReactElement {
  const [query, setQuery] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = FAQ_ENTRIES.filter(
    (f) => f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:px-10 lg:grid-cols-[1fr_320px]">
      <Card className="bg-(--primary-bg-color) border-0">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary-text-color) text-[#0d9488]">
            <HelpCircle size={20} />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-(--primary-text-color)">Frequently Asked Questions</h2>
            <p className="mt-1 text-sm text-(--secondary-text-color)">Find quick answers to the most common questions.</p>
          </div>
        </div>

        <div className="relative mt-6">
          <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the FAQ..."
            className={`${lightInputClass} pl-11`}
          />
        </div>

        <div className="mt-6 flex flex-col divide-y divide-[#e2e8f0]">
          {filtered.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.question} className="py-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-bold text-(--primary-text-color)">{f.question}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-(--secondary-text-color) transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <p className="mt-2 text-sm leading-relaxed text-(--secondary-text-color)">{f.answer}</p>}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="py-6 text-sm text-(--secondary-text-color)">No results for "{query}".</p>}
        </div>
      </Card>

      <QuickLinksSidebar onGoToTab={onGoToTab} />
    </div>
  );
}