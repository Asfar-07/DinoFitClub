import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import NotifyIcon from '../SmallUI/NotifyIcon.tsx'
import NavProfile from './NavProfile'

export default function SmallNavbar() {
    return (
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
    )
}
