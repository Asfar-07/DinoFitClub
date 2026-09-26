import { Card } from "@/components/ui/card";
import { AlertTriangle, Bug, Check, CreditCard, Flag, ImagePlus, Lightbulb, MoreHorizontal, Send, Shield, ShieldCheck, User, Users } from "lucide-react";
import { useRef, useState, type ChangeEvent, type ReactElement, type ReactNode } from "react";
import { QuickLinksSidebar } from "./SupportCenter";
import { supportLightInputClass as lightInputClass} from "./SupportCenter";

type TabKey = "faq" | "contact" | "report" | "requests";

type ReportType = "bug" | "user" | "community" | "content" | "payment" | "security" | "other";

interface ReportFormData {
  type: ReportType;
  title: string;
  description: string;
  attachment: File | null;
}

interface StepNumberProps {
  n: number;
}

interface ReportTypeOption {
  key: ReportType;
  label: string;
  icon: ReactNode;
}

const emptyReportForm: ReportFormData = {
  type: "bug",
  title: "",
  description: "",
  attachment: null,
};

const REPORT_TYPES: ReportTypeOption[] = [
  { key: "bug", label: "Bug / Technical Problem", icon: <Bug size={16} /> },
  { key: "user", label: "User", icon: <User size={16} /> },
  { key: "community", label: "Community", icon: <Users size={16} /> },
  { key: "content", label: "Inappropriate Content", icon: <Flag size={16} /> },
  { key: "payment", label: "Payment Problem", icon: <CreditCard size={16} /> },
  { key: "security", label: "Security Problem", icon: <Shield size={16} /> },
  { key: "other", label: "Other", icon: <MoreHorizontal size={16} /> },
];

const DESCRIPTION_MAX = 1000;

function StepNumber({ n }: StepNumberProps): ReactElement {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0d9488] text-xs font-bold text-white">
      {n}
    </span>
  );
}  

export default function ReportProblemTab({ onGoToTab }: { onGoToTab: (key: TabKey) => void }): ReactElement {
  const [form, setForm] = useState<ReportFormData>(emptyReportForm);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const update = <K extends keyof ReportFormData>(key: K, value: ReportFormData[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    update("attachment", e.target.files?.[0] ?? null);
  };

  const handleSubmit = (): void => {
    console.log("Report a problem form:", form);
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:px-10 lg:grid-cols-[1fr_320px]">
      <Card className="bg-(--primary-bg-color) border-0">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary-text-color) text-[#0d9488]">
            <AlertTriangle size={20} />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-(--primary-text-color)">Report a Problem</h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Help us make DinoClub better. Report bugs, inappropriate content, users, communities, payment issues
              and more.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8">
          {/* Step 1 */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <StepNumber n={1} />
              <p className="text-sm font-bold text-(--primary-text-color)">What do you want to report?</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {REPORT_TYPES.map((opt) => {
                const active = form.type === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => update("type", opt.key)}
                    className={`flex items-center gap-2.5 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "border-[#0d9488] bg-(--primary-text-color) text-(--primary-bg-color)"
                        : "border-[#e2e8f0] text-(--primary-text-color) hover:border-[#0d948866]"
                    }`}
                  >
                    <span className={active ? "text-[#0d9488]" : "text-[#64748b]"}>{opt.icon}</span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <StepNumber n={2} />
              <p className="text-sm font-bold text-(--primary-text-color)">Title</p>
            </div>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Briefly describe the issue..."
              className={lightInputClass}
            />
          </div>

          {/* Step 3 */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <StepNumber n={3} />
              <p className="text-sm font-bold text-(--primary-text-color)">Description</p>
            </div>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value.slice(0, DESCRIPTION_MAX))}
              placeholder="Please provide as much detail as possible. Include what happened, when it happened and any relevant information."
              rows={4}
              className={`${lightInputClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-[#94a3b8]">
              {form.description.length}/{DESCRIPTION_MAX}
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <StepNumber n={4} />
              <p className="text-sm font-bold text-(--primary-text-color)">
                Attachment <span className="font-normal text-[#94a3b8]">(Optional)</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-(--secondary-text-color)/20 bg-white/10 py-8 text-sm text-(--secondary-text-color) transition hover:border-[#0d9488]"
            >
              <ImagePlus size={20} className="text-[#0d9488]" />
              <span className="font-semibold text-[#0d9488]">Click to upload or drag and drop</span>
              <span className="text-xs text-[#94a3b8]">PNG, JPG, WEBP (Max 5MB)</span>
              {form.attachment && <span className="mt-1 text-xs font-semibold text-[#0d9488]">{form.attachment.name}</span>}
            </button>
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Step 5 */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <StepNumber n={5} />
            </div>
            <button
              onClick={handleSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#14b8a6] to-[#0d9488] py-3.5 text-sm font-bold text-white transition hover:brightness-105"
            >
              <Send size={15} />
              Submit Report
            </button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-(--secondary-bg-color) p-5 border-0">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--primary-text-color) text-[#0d9488]">
              <ShieldCheck size={16} />
            </span>
            <p className="text-sm font-bold text-(--primary-text-color)">Why report?</p>
          </div>
          <ul className="mt-4 flex flex-col gap-2.5">
            {["Helps us fix problems faster", "Keeps the community safe and positive", "Improves the overall experience for everyone"].map(
              (item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-(--primary-text-color)">
                  <Check size={14} className="mt-0.5 shrink-0 text-[#0d9488]" />
                  {item}
                </li>
              )
            )}
          </ul>
          <div className="my-4 border-t border-[#0d948833]" />
          <div className="flex items-start gap-2.5">
            <Lightbulb size={15} className="mt-0.5 shrink-0 text-[#0d9488]" />
            <div>
              <p className="text-xs font-bold text-(--primary-text-color)">Note</p>
              <p className="mt-1 text-xs leading-relaxed text-(--secondary-text-color)">
                This is not a direct contact form. Your report will be reviewed by our team and you'll see the status
                in your My Reports section.
              </p>
            </div>
          </div>
        </Card>

        <QuickLinksSidebar onGoToTab={onGoToTab} />
      </div>
    </div>
  );
}