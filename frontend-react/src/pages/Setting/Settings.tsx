import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import { Settings as SettingsIcon, Database, ShieldCheck, Lock } from "lucide-react";
import General from "./General";
import Account from "./Account";
import Security from "./Security";
import Privacy from "./Privacy";
import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store.ts";
import { Link } from "react-router-dom";
import { authHandle } from "../../features/auth/authService.js";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeAuth } from "../../features/auth/authSlice.ts";
import { removeUser } from "../../features/user/userSlice.js";

type NavKey = "general" | "account" | "security" | "privacy";

interface NavItem {
  key: NavKey;
  label: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: "general", label: "General", icon: <SettingsIcon size={16} /> },
  { key: "account", label: "Account & Data", icon: <Database size={16} /> },
  { key: "security", label: "Login & Security", icon: <ShieldCheck size={16} /> },
  { key: "privacy", label: "Privacy", icon: <Lock size={16} /> },
];

const PANELS: Record<NavKey, ReactNode> = {
  general: <General />,
  account: <Account />,
  security: <Security />,
  privacy: <Privacy />,
};

export default function Settings(): ReactElement {
  const [activeNav, setActiveNav] = useState<NavKey>("general");
  const isAuth = useSelector((state: RootState) => state.userAuth.status);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    authHandle
      .logoutService()
      .then(() => {
        dispatch(removeAuth());
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen w-full bg-(--primary-bg-color) text-(--primary-text-color) pt-16
    ">
      
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-10">
        {/* page title */}
        <div className="mb-6 flex items-center gap-3">
          <SettingsIcon size={22} className="shrink-0 text-[#7be6df]" />
          <div>
            <h1 className="text-xl font-extrabold sm:text-2xl">Settings</h1>
            <p className="text-sm text-(--secondary-text-color)">Manage your app preferences and account settings</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
          {/* sidebar */}
          <nav className="flex flex-col gap-4 md:w-64 md:shrink-0 md:justify-between">
            <div className="flex flex-row gap-2 overflow-x-auto pb-1 md:w-full md:flex-col md:overflow-visible md:pb-0">
              {NAV_ITEMS.map((item) => {
                const active = item.key === activeNav;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition md:rounded-xl ${
                      active
                        ? "bg-gradient-to-r from-[#7be6df] to-[#38d9c4] text-[#082a28]"
                        : "text-(--secondary-text-color) hover:bg-[#ffffff08] hover:text-(--primary-text-color)"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </div>
            {isAuth === "authenticated" ? 
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer justify-center gap-2.5 whitespace-nowrap rounded-full from-[#ff0a0f] to-[#ee0000] px-4 py-2.5 text-sm font-semibold text-(--secondary-text-color) transition hover:bg-gradient-to-r hover:text-(--primary-text-color) md:justify-start md:rounded-xl"
            >
              <LogOut size={16} /> Log out
            </button>
            :
            <Link
              to="/login"
              className="flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full from-[#00b5a5] to-[#00cab9]
               px-4 py-2.5 text-sm font-semibold text-(--secondary-text-color) transition 
               hover:bg-gradient-to-r hover:text-(--primary-text-color) md:justify-start md:rounded-xl"
            >
              <LogOut size={16} /> Log in
            </Link>
            }
          </nav>

          {/* content */}
          <main className="flex flex-1 flex-col gap-6">{PANELS[activeNav]}</main>
        </div>
      </div>
    </div>
  );
}
