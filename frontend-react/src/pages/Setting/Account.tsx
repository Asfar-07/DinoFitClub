import { Trash } from "lucide-react";
import type { ReactElement } from "react";
import { CiWarning } from "react-icons/ci";
import { SectionCard } from "./SettingsShared";

export default function Account(): ReactElement {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#134e4a] via-[#0f766e] to-[#7be6df] p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">Account Settings</h2>
        <p className="mt-1 text-sm text-white/80">Account & data settings go here.</p>
      </div>

      <SectionCard
        icon={<Trash size={18} />}
        title="Account & Data"
        description="Permanently remove your account and all associated data"
      >
        <div className="flex flex-col gap-3">
          <div className="flex w-full md:justify-end">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-600 bg-red-600/20 px-7 py-2 text-sm text-red-400 transition hover:scale-[1.03] md:w-auto"
            >
              <Trash size={16} />
              Delete
            </button>
          </div>

          <div className="flex w-full items-start gap-3 rounded-lg border border-red-600/50 bg-red-600/20 px-3 py-2 text-red-400">
            <CiWarning size={20} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed">Permanently remove your account and all associated data</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
