import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  PartyPopper,
  Search,
  Bug,
  Lightbulb,
  Star,
  Gift,
  ArrowRight,
  X,
} from "lucide-react";

interface InviteItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const inviteItems: InviteItem[] = [
  {
    icon: Search,
    title: "Explore",
    description: "Every section of the application.",
  },
  {
    icon: Bug,
    title: "Report",
    description: "Any bugs or issues you discover.",
  },
  {
    icon: Lightbulb,
    title: "Suggest",
    description: "Ideas to improve the platform.",
  },
  {
    icon: Star,
    title: "Share",
    description: "What you love & what could be better.",
  },
];

interface DinoRyxTrialNoticeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartExploring?: () => void;
}

export default function TrialNotice({
  open,
  onOpenChange,
  onStartExploring,
}: DinoRyxTrialNoticeProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="min-w-[80%] max-w-[1024px] h-[90vh] max-h-[750px] overflow-hidden border-0 bg-(--primary-bg-color) p-0 text-(--primary-text-color) ring-1 ring-white/10 sm:rounded-3xl flex flex-col
        max-sm:w-90"
      >
        <DialogClose className=" cursor-pointer absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-(--primary-bg-color) text-[#bac7cc] ring-1 ring-white/10 transition-colors hover:bg-[#1d2233]/70 hover:text-[#f0f4f8]">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <ScrollArea className="trial-notice-scroll relative min-h-0 flex-1">
          <div className="p-4 sm:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 pr-12">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1d2233] ring-1 ring-[#56b2bb]/20">
              <PartyPopper className="h-6 w-6 text-[#56b2bb]" />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                Welcome to the DinoFitClub{" "}
                <span className="text-[#56b2bb]">1-Month Trial!</span>
              </h2>
              <p className="mt-1.5 text-xs text-(--secondary-text-color) sm:text-sm">
                Thank you for being one of our very first testers.
              </p>
            </div>
          </div>

          {/* Vision box */}
          <div className="mt-7 rounded-2xl glass-strong-nav p-5 ring-1 ring-white/5">
            <p className="text-xs leading-relaxed text-(--secondary-text-color) sm:text-sm">
              Our vision is to build one of the world&apos;s largest fitness
              communities, connecting gyms, trainers, and fitness
              enthusiasts through a single intelligent platform.
            </p>
          </div>

          {/* Invite grid */}
          <p className="mt-8 text-xs font-semibold tracking-wider text-(--secondary-text-color)">
            WE INVITE YOU TO
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inviteItems.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-3.5 rounded-2xl glass-strong-nav p-5 ring-1 ring-white/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#56b2bb]/15 text-[#56b2bb]">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-bold text-(--primary-text-color)">{title}</p>
                  <p className="mt-0.5 text-sm text-(--secondary-text-color">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature idea box */}
          <div className="relative mt-6 overflow-hidden rounded-2xl glass-strong-nav p-5 ring-1 ring-white/5">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#56b2bb]/15 text-[#56b2bb]">
                <Gift className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="font-bold text-(--primary-text-color)">
                  Have a great feature idea?
                </p>
                <p className="mt-0.5 max-w-lg text-sm leading-relaxed text-(--secondary-text-color">
                  If your suggestion becomes part of DinoFitClub, we&apos;ll
                  happily recognize your contribution by mentioning your
                  name in the app after our official launch.
                </p>
              </div>
            </div>

            {/* decorative folded-corner accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-3xl bg-[#56b2bb]/10 [clip-path:polygon(30%_0,100%_0,100%_70%)]"
            />
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col items-start gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-(--secondary-text-color">
              Thank you for being part of the DinoFitClub journey. Together,
              let&apos;s build a stronger, healthier, and more connected
              fitness community!
            </p>

            <Button
              onClick={onStartExploring}
              className="cursor-pointer h-11 shrink-0 gap-1.5 rounded-full bg-[#56b2bb] px-6 font-semibold text-[#0a0f22] hover:bg-[#56b2bb]/90"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          </div>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DialogContent>

      <style>{`
        .trial-notice-scroll [data-radix-scroll-area-viewport] {
          scroll-behavior: smooth;
        }

        /* track */
        .trial-notice-scroll [data-radix-scroll-area-scrollbar] {
          background-color: rgba(255, 255, 255, 0.03);
          border-radius: 9999px;
          transition: background-color 0.2s ease;
        }
        .trial-notice-scroll [data-radix-scroll-area-scrollbar]:hover {
          background-color: rgba(255, 255, 255, 0.06);
        }

        /* vertical track sizing */
        .trial-notice-scroll [data-radix-scroll-area-scrollbar][data-orientation="vertical"] {
          width: 10px;
          padding: 3px 2px;
        }

        /* horizontal track sizing */
        .trial-notice-scroll [data-radix-scroll-area-scrollbar][data-orientation="horizontal"] {
          height: 10px;
          padding: 2px 3px;
        }

        /* thumb */
        .trial-notice-scroll [data-radix-scroll-area-thumb] {
          background: linear-gradient(180deg, #56b2bb 0%, #3d8a92 100%);
          border-radius: 9999px;
          position: relative;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .trial-notice-scroll [data-radix-scroll-area-scrollbar][data-orientation="horizontal"] [data-radix-scroll-area-thumb] {
          background: linear-gradient(90deg, #56b2bb 0%, #3d8a92 100%);
        }
        .trial-notice-scroll [data-radix-scroll-area-thumb]:hover {
          background: linear-gradient(180deg, #7fd7e0 0%, #56b2bb 100%);
        }
        .trial-notice-scroll [data-radix-scroll-area-scrollbar][data-orientation="horizontal"] [data-radix-scroll-area-thumb]:hover {
          background: linear-gradient(90deg, #7fd7e0 0%, #56b2bb 100%);
        }
        .trial-notice-scroll [data-radix-scroll-area-thumb]:active {
          transform: scale(1.05);
        }
      `}</style>
    </Dialog>
  );
}