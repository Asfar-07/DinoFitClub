import { ShieldMinus, Trash } from "lucide-react";
import { useState, type ReactElement } from "react";
import { CiWarning } from "react-icons/ci";
import { SectionCard, SuggestLogin } from "./SettingsShared";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { CgSleep } from "react-icons/cg";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export default function Account(): ReactElement {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const isAuth = useSelector((state: RootState) => state.userAuth.status);
  const isLogin = isAuth === "authenticated";

  return (
    <div className="flex flex-1 flex-col gap-6">
      <DeleteAccountDialog open={isDelete} onOpenChange={() => setIsDelete(false)}/>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#134e4a] via-[#0f766e] to-[#7be6df] p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">Account Settings</h2>
        <p className="mt-1 text-sm text-white/80">Account & data settings go here.</p>
      </div>

      <SectionCard
        notView={!isLogin}
        icon={<ShieldMinus size={18}/>}
        title="Account Status"
        description="Deactivate Account Take a break from DinoFitClub. Your data will be kept and you can reactivate your account later."
      >
        <div className="flex flex-col md:items-end gap-3">
          <div className="mb-5 flex items-center gap-2 text-green-500">
            <div className="size-2 bg-green-500 rounded-full"></div>
            <span >Active</span>
          </div>
          <div className="flex w-full md:justify-end">
            <button
              className="flex items-center gap-2 rounded-full cursor-pointer bg-[#dc2626] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#dc2626] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#dc2626]/85"
              disabled
              onClick={() => setIsDelete(true)}
            >
              <CgSleep size={16}/>
              Deactivate account
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard
      notView={!isLogin}
        icon={<Trash size={18} className="text-red-600"/>}
        title="Delete Account"
        description="Permanently delete your DinoFitClub account and associated data. This action cannot be undone."
      >
        <div className="flex flex-col gap-3">
           <div className="flex w-full items-start gap-3 rounded-lg border border-red-600/50 bg-red-600/20 px-3 py-2 text-red-400">
            <CiWarning size={20} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed">Permanently remove your account and all associated data</p>
          </div>
          <div className="flex w-full md:justify-end">
            <button
              className="flex w-full items-center cursor-pointer justify-center gap-2 rounded-[10px] bg-red-500 px-12 py-2 text-sm text-red-200 transition 
              hover:scale-[1.03] md:w-auto hover:border-red-300"
              onClick={() => setIsDelete(true)}
            >
              <Trash size={16} />
              Delete account
            </button>
          </div>
        </div>
      </SectionCard>
      <SuggestLogin view={!isLogin}/>
    </div>
  );
}
