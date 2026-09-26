import { Outlet } from "react-router-dom";
import SmallNavbar from "@/components/Navbar/SmallNavbar";
import SmallFooter from "@/components/Footer/SmallFooter";

export default function SmallHeaderAndFooterLayout() {
  return (
    <>
      <SmallNavbar />
      <Outlet />
      <SmallFooter />
    </>
  );
}