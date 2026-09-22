import type { ReactElement, ReactNode } from "react";
import { Switch } from "@/components/ui/switch";

export interface SectionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export function SectionCard({ icon, title, description, children }: SectionCardProps): ReactElement {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#ffffff10] bg-(--secondary-bg-color) shadow p-6 md:flex-row md:gap-8">
      <div className="flex items-start gap-3 md:w-64 md:shrink-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7be6df33] bg-[#7be6df14] text-[#7be6df]">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-(--primary-text-color)">{title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-(--secondary-text-color)">{description}</p>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export interface ToggleRowProps {
  icon: ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ToggleRow({ icon, title, description, checked, onCheckedChange }: ToggleRowProps): ReactElement {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-[#7be6df]">{icon}</div>
        <div>
          <p className="text-sm font-semibold text-(--primary-text-color)">{title}</p>
          <p className="text-xs text-(--secondary-text-color)">{description}</p>
        </div>
      </div>
      <Switch disabled checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export interface SegmentedControlProps<T extends string> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>): ReactElement {
  return (
    <div className="flex overflow-hidden rounded-full border border-[#ffffff14] bg-[#ffffff05]">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 px-6 py-2.5 text-sm font-bold transition ${
              active ? "bg-gradient-to-r from-[#7be6df] to-[#38d9c4] text-[#082a28]" : "text-[#bac7cc] hover:text-[#f0f4f8]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
