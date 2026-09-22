import './notifyicon.css'
import { FaRegBell} from "react-icons/fa";

export default function NotifyIcon() {
  return (
    <div className="header-notify-bell max-md:hidden">
      <button>
        <FaRegBell />
        <samp></samp>
      </button>
    </div>
  );
}
