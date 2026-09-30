import { useState, useRef, useEffect, type ReactElement } from "react";
import { FaRegBell } from "react-icons/fa";

interface Notification {
  id: number;
  text: ReactElement;
  time: string;
}
const betaNotify : ReactElement = <div>
  <p>During this Beta period, your data may be reset or removed after testing is completed. 
    Please avoid using the Beta environment to store important or permanent information. <a href="/news" className="text-cyan-400 underline ml-1">more.</a></p>   
</div>
const messages: Notification[] = [
  { id: 1, 
    text: betaNotify, 
    time: "25d" },
];

export default function NotifyIcon() {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative max-md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Notifications"
        className="relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-full text-(--primary-text-color) transition 
        hover:bg-(--primary-text-color) hover:text-(--primary-bg-color)"
      >
        <FaRegBell size={20}/>
        {messages.length > 0 && (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 max-h-96 w-72 overflow-y-auto rounded-lg 
        border border-gray-200/20 bg-(--secondary-bg-color) shadow-xl sm:w-80">
          <div className="border-b border-gray-200 px-4 py-3 font-semibold text-(--primary-text-color)">
            Notifications
          </div>

          {messages.length === 0 ? (
            <p className="p-4 text-center text-sm text-(--secondary-text-color)">
              No new messages
            </p>
          ) : (
            <ul>
              {messages.map((m) => (
                <li
                  key={m.id}
                  className="cursor-pointer border-b border-gray-200/20 px-4 py-3 last:border-b-0"
                >
                  <p className="text-sm text-(--primary-text-color)">{m.text}</p>
                  <span className="text-xs text-(--secondary-text-color)">{m.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}