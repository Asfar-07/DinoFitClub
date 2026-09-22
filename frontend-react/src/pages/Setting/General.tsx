import { useState, useEffect, type ReactElement, type ReactNode } from "react";
import { Bell, ChevronDown, Palette, Sun, Moon, Monitor, Globe, Mail, Dumbbell, Clock, Ruler } from "lucide-react";
// import { Switch } from "@/components/ui/switch";
import { SectionCard, ToggleRow, SegmentedControl } from "./SettingsShared";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@/features/theme/themeSlice";

import type { RootState } from "@/app/store";

type ThemeKey = "light" | "dark" | "system";
type WeightUnit = "kg" | "lb";
type DistanceUnit = "km" | "miles";
// type TextSize = 0 | 1 | 2 | 3;

interface NotificationState {
  general: boolean;
  email: boolean;
  workoutReminders: boolean;
}

export default function General(): ReactElement {
  const [themeMode, setThemeMode] = useState<ThemeKey>("dark");
  const [notifications, setNotifications] = useState<NotificationState>({
    general: true,
    email: false,
    workoutReminders: true,
  });
  const [reminderTime, setReminderTime] = useState<string>("07:00 AM");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  // const [textSize, setTextSize] = useState<TextSize>(1);
  // const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  const storedTheme = useSelector((state: RootState) => state.theme.mode) as ThemeKey;
  const dispatch = useDispatch();

  useEffect(() => {
    setThemeMode(storedTheme);
  }, [storedTheme]);

  const themeOptions: { key: ThemeKey; label: string; icon: ReactNode }[] = [
    { key: "light", label: "Light", icon: <Sun size={18} /> },
    { key: "dark", label: "Dark", icon: <Moon size={18} /> },
    { key: "system", label: "System", icon: <Monitor size={18} /> },
  ];

  // const textSizeLabels: { size: TextSize; fontClass: string }[] = [
  //   { size: 0, fontClass: "text-xs" },
  //   { size: 1, fontClass: "text-sm" },
  //   { size: 2, fontClass: "text-base" },
  //   { size: 3, fontClass: "text-lg" },
  // ];

  function ChangeThemeMode(optionKey: ThemeKey) {
    setTheme(optionKey);
    dispatch(setTheme(optionKey));
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#134e4a] via-[#0f766e] to-[#7be6df] p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">General Settings</h2>
        <p className="mt-1 text-sm text-white/80">Customize your DinoRyx experience</p>
      </div>

      {/* Appearance */}
      <SectionCard icon={<Palette size={18} />} title="Appearance" description="Choose how the app looks and feels">
        <p className="mb-3 text-sm font-semibold text-[#f0f4f8]">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((opt) => {
            const active = opt.key === themeMode;
            return (
              <button
                key={opt.key}
                onClick={() => { ChangeThemeMode(opt.key) }}
                className={`flex flex-col items-center gap-2 cursor-pointer rounded-2xl border py-4 transition sm:py-6 ${active
                    ? "border-[#7be6df] bg-[#7be6df14] text-[#7be6df] shadow-[0_0_0_3px_#7be6df26]"
                    : "border-[#ffffff14] text-(--secondary-text-color) hover:border-[#7be6df40]"
                  }`}
              >
                {opt.icon}
                <span className="text-sm font-bold">{opt.label}</span>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#7be6df]" />}
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* Language */}
      <SectionCard icon={<Globe size={18} />} title="Language" description="Select your preferred language">
        <button className="flex w-full items-center gap-3 rounded-xl border border-[#ffffff14] bg-[#ffffff05] px-4 py-3 text-left text-sm font-semibold text-(--primary-text-color) hover:border-[#7be6df40]">
          <span className="text-xs font-bold text-(--secondary-text-color)">GB</span>
          English
        </button>
      </SectionCard>

      {/* Notifications */}
      <SectionCard icon={<Bell size={18} />} title="Notifications" description="Manage your notification preferences">
        <div className="divide-y divide-[#ffffff0d]">
          <ToggleRow
            icon={<Bell size={15} />}
            title="General Notifications"
            description="App updates, messages and announcements"
            checked={notifications.general}
            onCheckedChange={(v) => setNotifications((p) => ({ ...p, general: v }))}
          />
          <ToggleRow
            icon={<Mail size={15} />}
            title="Email Notifications"
            description="Non-essential emails and promotions"
            checked={notifications.email}
            onCheckedChange={(v) => setNotifications((p) => ({ ...p, email: v }))}
          />
          <ToggleRow
            icon={<Dumbbell size={15} />}
            title="Workout Reminders"
            description="Get reminded about your workout schedule"
            checked={notifications.workoutReminders}
            onCheckedChange={(v) => setNotifications((p) => ({ ...p, workoutReminders: v }))}
          />
        </div>
      </SectionCard>

      {/* Reminder time */}
      <SectionCard icon={<Clock size={18} />} title="Reminder Time" description="Choose when you want to receive reminders">
        <label className="flex w-full items-center gap-3 rounded-xl border border-[#ffffff14] bg-[#ffffff05] px-4 py-3 text-sm font-semibold text-[#f0f4f8]">
          <Clock size={15} className="text-[#7be6df]" />
          <input
            type="text"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="flex-1 bg-transparent outline-none text-(--secondary-text-color)"
          />
          <ChevronDown size={15} className="text-(--secondary-text-color)" />
        </label>
      </SectionCard>

      {/* Units */}
      <SectionCard icon={<Ruler size={18} />} title="Units" description="Set your preferred measurement units">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="w-20 text-sm font-semibold text-[#f0f4f8]">Weight</span>
            <div className="flex-1">
              <SegmentedControl<WeightUnit> options={["kg", "lb"]} value={weightUnit} onChange={setWeightUnit} />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="w-20 text-sm font-semibold text-[#f0f4f8]">Distance</span>
            <div className="flex-1">
              <SegmentedControl<DistanceUnit> options={["km", "miles"]} value={distanceUnit} onChange={setDistanceUnit} />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Accessibility */}
      {/*  <SectionCard icon={<AccessibilityIcon size={18} />} title="Accessibility" description="Make the app more comfortable for you">
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#f0f4f8]">Text Size</p>
            <div className="flex flex-wrap gap-2">
              {textSizeLabels.map((t) => {
                const active = t.size === textSize;
                return (
                  <button
                    key={t.size}
                    onClick={() => setTextSize(t.size)}
                    className={`flex h-11 w-14 items-center justify-center rounded-full border font-bold transition ${t.fontClass} ${
                      active
                        ? "border-[#7be6df] text-[#7be6df] shadow-[0_0_0_3px_#7be6df26]"
                        : "border-[#ffffff14] text-[#bac7cc] hover:border-[#7be6df40]"
                    }`}
                  >
                    A
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#f0f4f8]">Reduce Motion</p>
              <p className="text-xs text-[#bac7cc]">Minimize animations and motion effects</p>
            </div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>
      </SectionCard> */}
    </div>
  );
}
