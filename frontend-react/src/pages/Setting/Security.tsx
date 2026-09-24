import { SuggestLogin } from "./SettingsShared";
import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export default function Security(): ReactElement {
  const isAuth = useSelector((state: RootState) => state.userAuth.status);
  const isLogin = isAuth === "authenticated";

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#134e4a] via-[#0f766e] to-[#7be6df] p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">Security Settings</h2>
        <p className="mt-1 text-sm text-white/80">Login & data settings go here.</p>
      </div>
      <SuggestLogin view={!isLogin} />
    </div>
  );
}
