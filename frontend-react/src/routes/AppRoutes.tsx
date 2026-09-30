import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { setAuth, setAuthStatus, removeAuth, setLoading } from "@/features/auth/authSlice.ts";
import { handleUser } from "@/features/user/userService.js"; 

import type { RootState } from "@/app/store.ts"; 

import Home from "../pages/Home/Home.jsx";
import Login from "@/pages/Login/Login.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.tsx";
import ResetPassword from "../pages/ForgotPassword/ResetPassword.jsx";
import CreateCommunity from "@/pages/CreateCommunity/CreateCommunity.tsx";
import MainLocation from "@/components/MapUI/MainLocation";
import MainLayout from "@/layouts/MainLayout.jsx";
import HeaderLayout from "@/layouts/HeaderLayout.jsx";
import NoLayout from "@/layouts/NoLayout.jsx";
import OnboardingPage from "@/pages/Welcome/Onboarding.tsx";
import NotFound from "@/pages/NotFound/NotFound.tsx";
import Settings from "@/pages/Setting/Settings.tsx";
import About from "@/pages/About/About.tsx";
import SmallFooterLayout from "@/layouts/SmallFooterLayout.jsx";
import SupportCenter from "@/pages/Support/SupportCenter.tsx";
import SmallHeaderLayout from "@/layouts/SmallHeaderLayout.jsx";
import SmallHeaderAndFooterLayout from "@/layouts/SmallHeaderAndFooterLayout.jsx";
import CommunityDashboard from "@/pages/CommunityDashboard/CommunityDashboard.tsx";
import News from "@/pages/News/news.tsx";

export default function AppRoutes() {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hasFetched = useRef(false);
    const isAuth = useSelector((state: RootState) => state.userAuth.status);

      useEffect(()=>{
        if(hasFetched.current) return;
        hasFetched.current = true;
          if (isAuth !== "authenticated") {
            dispatch(setLoading(true));
    
            handleUser.isUser().then((response: any) => {
    
              dispatch(setAuth(response));
              dispatch(setAuthStatus("authenticated"));
              location.pathname === "/" && navigate("/account")
              
            }).catch(() => {
    
              dispatch(removeAuth());
            }).finally(() => {
    
              dispatch(setLoading(false));
            })
          }
      }, [dispatch])
    
  return (
    <div>
        <Routes>
          {/* Header + Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" Component={Home} />
          </Route>
          {/* Header + Small Footer */}
          <Route element={<SmallFooterLayout />}>
            <Route path="/settings/general" Component={Settings} />
            <Route path="/about" Component={About} />
            <Route path="/news" Component={News} />
            <Route path="/about/:section" Component={About} />
          </Route>

          {/* Header Only */}
          <Route element={<HeaderLayout />}>
            <Route path="/account" Component={Profile} />
            <Route path="/nearby-location" Component={MainLocation} />
          </Route>

          {/* Small Header Only */}
          <Route element={<SmallHeaderLayout />}>
          <Route path="/community/dashboard/:communityCode" Component={CommunityDashboard} />
            <Route path="/create/community" Component={CreateCommunity} />
          </Route>

          {/* Small Header and Footer */}
          <Route element={<SmallHeaderAndFooterLayout />}>
            <Route path="/support" Component={SupportCenter} />
          </Route>

          {/* No Header/Footer */}
          <Route element={<NoLayout />}>
            <Route path="/login" Component={Login} />
            <Route path="/login/forgot" Component={ForgotPassword} />
            <Route path="/reset-password" Component={ResetPassword} />
            <Route path="/welcome/home" Component={OnboardingPage} />
            
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}
