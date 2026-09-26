import { Outlet } from "react-router-dom";
import SmallNavbar from "@/components/Navbar/SmallNavbar";

export default function SmallHeaderLayout() {
  return (
    <>
      <SmallNavbar />
      <Outlet />
    </>
  );
}