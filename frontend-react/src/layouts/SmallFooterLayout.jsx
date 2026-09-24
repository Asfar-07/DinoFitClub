import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar.tsx";
import SmallFooter from "@/components/Footer/SmallFooter";

export default function SmallFooterLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <SmallFooter />
    </>
  );
}