import { useRef, useState, type ChangeEvent, type FormEvent, type ReactElement, type ReactNode } from "react";
import {
  Search,
  ChevronDown,
  ArrowLeft,
  Users,
  Sparkles,
  ImagePlus,
  Building2,
  AlignLeft,
  Calendar,
  Phone,
  Globe,
  MapPin,
  Lock,
  Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NavProfile from "@/components/Navbar/NavProfile";
import NotifyIcon from "@/components/SmallUI/NotifyIcon";
import { handleDashboard } from "@/features/dashboard/dashboardService";
import { toast } from "react-toastify";
import GeneralLoader from "@/components/Loader/GeneralLoader";
import type { CommunityCategory, CommunityPrivacy, CommunityFormData } from "./Community.type";
import { validateFile } from "@/utils/avatarFileHandle";


export interface CreateCommunityPageProps {
  onBack?: () => void;
}

const CATEGORY_OPTIONS: CommunityCategory[] = ["FITNESS", "Yoga", "CROSSFIT", "SPORTS", "SWIMMING",
  "WELLNESS", "BOXING"];

const emptyForm: CommunityFormData = {
  name: "",
  category: CATEGORY_OPTIONS[0],
  description: "",
  whenStarted: "",
  phoneNumber: "",
  website: "",
  address: "",
  privacy: "PUBLIC",
};


interface FieldLabelProps {
  icon: ReactNode;
  children: ReactNode;
  optional?: boolean;
}

function FieldLabel({ icon, children, optional = false }: FieldLabelProps): ReactElement {
  return (
    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#f0f4f8]">
      <span className="text-[#7be6df]">{icon}</span>
      {children}
      {optional && <span className="font-normal text-[#bac7cc]">(optional)</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#ffffff14] bg-[#ffffff05] px-4 py-3 text-sm text-[#f0f4f8] outline-none " +
  "placeholder:text-[#6b7684] transition focus:border-[#7be6df] focus:shadow-[0_0_0_3px_#7be6df26]";



export default function CreateCommunity({
  onBack = () => { window.history.back() },
}: CreateCommunityPageProps): ReactElement {
  const [form, setForm] = useState<CommunityFormData>(emptyForm);
  const [logo, setLogo] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigation = useNavigate();

  const update = <K extends keyof CommunityFormData>(key: K, value: CommunityFormData[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoClick = (): void => fileInputRef.current?.click();

  const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const validationError = await validateFile(file);
    if (validationError) {
      toast.error(validationError, { position: "top-right", autoClose: 5000 });
      e.target.value = "";
      return;
    }
    setLogo(file)
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData();
    if (logo) {
      formData.append("logoFile", logo);
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(form)], {
        type: "application/json",
      })
    );
    setLoading(true);

    handleDashboard.createDashboard(formData).then(() => {
      navigation("/account");
    }).catch((e) => {
      console.log(e);
      if(e.response.status == 403){
        toast.error("Limited");
      } else {
        toast.error("Something wrong");
      }
    }).finally(() => {
      setLoading(false);
    })

  };

  const checklist: string[] = ["Custom logo, name & category", "Public, private or secret access", "Schedule, contact & location details"];

  return (
    <div className="min-h-screen w-full bg-[#0a0f22] text-[#f0f4f8]">
      {loading && <GeneralLoader />} 
      {/*  Top navbar */}
      <header className="flex items-center gap-3 border-b border-[#ffffff0d] px-4 py-4 sm:gap-4 sm:px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d2233] ring-1 ring-[#56b2bb]/30">
            <img src="/android-chrome-192x192.png" alt="logo" />
          </span>
          <span className="text-lg font-bold tracking-tight text-(--primary-text-color)">
            Dino<span className="text-[#56b2bb]">FitClub</span>
          </span>
        </Link>

        <div className="mx-auto hidden max-w-md flex-1 items-center gap-2 rounded-full border border-[#ffffff14] bg-[#ffffff05] px-4 py-2.5 md:flex">
          <Search size={16} className="text-[#bac7cc]" />
          <input
            placeholder="Search anything..."
            className="w-full bg-transparent text-sm text-[#f0f4f8] outline-none placeholder:text-[#bac7cc]"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <button
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ffffff14] text-[#bac7cc] hover:text-[#f0f4f8] md:hidden"
          >
            <Search size={16} />
          </button>
          <NotifyIcon />
          <NavProfile />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-10">
        <button
          onClick={onBack}
          className="mb-6 cursor-pointer flex items-center gap-2 text-sm font-medium text-[#bac7cc] transition hover:text-[#f0f4f8]"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
          {/* left intro panel */}
          <div className="relative overflow-hidden rounded-3xl border border-[#7be6df33] bg-gradient-to-b from-[#0f766e33] via-[#0a0f22] to-[#0a0f22] p-8 lg:sticky lg:top-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#7be6df40] bg-[#7be6df14] text-[#7be6df]">
                <Users size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold leading-tight text-[#f0f4f8]">Create a Community</h1>
                <p className="mt-1 text-sm text-[#bac7cc]">Bring trainers & members together</p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#bac7cc]">
              Build a space where your trainers, students and gym owners connect, share progress and grow together.
            </p>

            <div className="mt-8 flex justify-center">
            </div>

            <ul className="mt-8 flex flex-col gap-4">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7be6df1f] text-[#7be6df]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-[#f0f4f8]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* right form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#ffffff10] bg-[#ffffff05] p-6 sm:p-8 md:p-10"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 text-[#7be6df]">
                <Sparkles size={20} />
              </span>
              <div>
                <h2 className="text-xl font-extrabold sm:text-2xl">Community details</h2>
                <p className="mt-1 text-sm text-[#bac7cc]">Fill in the essentials, your community will be live instantly.</p>
              </div>
            </div>

            <div className="my-6 border-t border-[#ffffff0d]" />

            <div className="flex flex-col gap-6">
              {/* Logo */}
              <div>
                <FieldLabel icon={<ImagePlus size={15} />}>Logo</FieldLabel>
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  {preview ?
                    <div className="flex cursor-pointer h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl
                   border-1 border-[#7be6df] overflow-hidden">
                      <img src={preview} alt="preview" className="size-full object-cover self-center" />
                    </div>
                    :
                    <button
                      type="button"
                      onClick={handleLogoClick}
                      className="flex cursor-pointer h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#7be6df40] text-[#7be6df] transition hover:border-[#7be6df]"
                    >
                      <ImagePlus size={20} />
                      <span className="text-xs font-semibold">Upload</span>
                    </button>
                  }
                 
                  <div>
                    <p className="text-sm font-bold text-[#f0f4f8]">Upload Logo</p>
                    <p className="text-xs text-[#bac7cc]">PNG, JPG or SVG. Square works best.</p>
                    <button
                      type="button"
                      onClick={handleLogoClick}
                      className="mt-2 cursor-pointer flex items-center gap-2 rounded-full border border-[#ffffff1f] px-4 py-1.5 text-xs font-bold text-[#f0f4f8] hover:border-[#7be6df66]"
                    >
                      <ImagePlus size={13} />
                      Choose file
                    </button>
                    {logo && <p className="mt-2 text-xs text-[#7be6df]">{logo.name}</p>}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <FieldLabel icon={<Users size={15} />}>Name</FieldLabel>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Iron Forge Fitness"
                  required
                  className={inputClass}
                />
              </div>

              {/* Category */}
              <div>
                <FieldLabel icon={<Building2 size={15} />}>Category</FieldLabel>
                <div className="relative">
                  <Building2 size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7be6df]" />
                  <select
                    value={form.category}
                    onChange={(e) => update("category", String(e.target.value))}
                    className={`${inputClass} appearance-none pl-11 pr-10`}
                  >
                    {CATEGORY_OPTIONS.map((c, index) => (
                      <option key={index} value={c} className="bg-[#0a0f22]">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#bac7cc]" />
                </div>
              </div>

              {/* Description */}
              <div>
                <FieldLabel icon={<AlignLeft size={15} />}>Description</FieldLabel>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Tell people what your community is about..."
                  rows={4}
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              {/* When started */}
              <div>
                <FieldLabel icon={<Calendar size={15} />}>When Started</FieldLabel>
                <input
                  type="date"
                  value={form.whenStarted}
                  onChange={(e) => update("whenStarted", e.target.value)}
                  className={`${inputClass} [color-scheme:dark] cursor-pointer`}
                  required
                />
              </div>

              {/* Phone / Website */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <FieldLabel icon={<Phone size={15} />}>Phone Number</FieldLabel>
                  <input
                    value={form.phoneNumber}
                    onChange={(e) => update("phoneNumber", e.target.value)}
                    placeholder="+1 555 000 1234"
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel icon={<Globe size={15} />} optional>
                    Website
                  </FieldLabel>
                  <input
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    placeholder="https://yourcommunity.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <FieldLabel icon={<MapPin size={15} />} optional>
                  Address
                </FieldLabel>
                <input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Street, city, country"
                  className={inputClass}
                />
              </div>

              {/* Privacy */}
              <div>
                <FieldLabel icon={<Lock size={15} />}>Privacy</FieldLabel>
                <div className="relative">
                  <Lock size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7be6df]" />
                  <select
                    value={form.privacy}
                    onChange={(e) => update("privacy", e.target.value as CommunityPrivacy)}
                    className={`${inputClass} appearance-none pl-11 pr-10`}
                  >
                    <option value="PUBLIC" className="bg-[#0a0f22]">Public</option>
                    <option value="PRIVATE" className="bg-[#0a0f22]">Private</option>
                  </select>
                  <ChevronDown size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#bac7cc]" />
                </div>
              </div>
            </div>

            <div className="my-8 border-t border-[#ffffff0d]" />

            {/* footer actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-full cursor-pointer border border-[#ffffff1f] px-6 py-3 text-sm font-bold text-[#f0f4f8] transition hover:border-[#ffffff40]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7be6df] to-[#38d9c4] px-7 py-3 text-sm font-bold text-[#082a28] transition hover:brightness-105"
              >
                <Sparkles size={15} />
                Create Community
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
