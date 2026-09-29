//@ts-nocheck
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PawPrint, Github, Linkedin, Instagram, Facebook, Twitter, Gem } from "lucide-react";
import type { RootState } from "@/app/store";

interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

const linkGroups: FooterLinkGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "/about" },
      { label: "Communities", href: "/" },
      { label: "Nearby Gyms", href: "/nearby-location" },
      { label: "Dashboard", href: "#dashboard" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Mission", href: "/about/mission" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Setting", href: "/settings/general" },
      { label: "FAQ", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/settings/general" },
      { label: "Terms", href: "/settings/general" },
    ],
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const isAuth = useSelector((state: RootState) => state.userAuth.status);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className=" w-full bg-[#0a0f22] text-[#f0f4f8]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d2233] ring-1 ring-[#56b2bb]/30">
                <img src="/android-chrome-192x192.png" alt="logo" />
              </span>
              <span className="text-xl font-bold tracking-tight">
                Dino<span className="text-[#56b2bb]">FitClub</span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm text-[#bac7cc]">
              A fitness community platform built to bring everything together —
               memberships, events, fitness network, progress, events, and nearby fitness communities in one place.
               <br/>
              <div className="font-bold mt-2">Keep moving. Stay healthy. Grow together.</div>

            </p>

            {/* <form
              onSubmit={handleSubscribe}
              className="glass-li flex w-full max-w-sm items-center gap-2 rounded-full border-[#1d2233] text-(--secondary-text-color)
               placeholder:text-(--secondary-text-color) focus-visible:ring-[#56b2bb] focus-visible:ring-offset-0"
            >
              <Input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 focus-visible:ring-offset-0 focus-visible:ring-transparent border-0"
              />
              <Button
                type="submit"
                className="h-11 shrink-0 rounded-full to-primary-glow cursor-pointer px-5 font-medium text-[#0a0f22] hover:bg-[#56b2bb]/90"
              >
                Subscribe
              </Button>
            </form> */}

            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d2233] text-[#bac7cc] transition-colors hover:bg-[#56b2bb]/20 hover:text-[#56b2bb]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {linkGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-[#f0f4f8]">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.label == "Dashboard" ? (isAuth == "authenticated" ? <Link to={link.href} className="text-sm text-[#bac7cc] transition-colors hover:text-[#56b2bb]">{link.label}</Link>
                        : <Link to="/login" className="text-sm text-[#bac7cc] transition-colors hover:text-[#56b2bb]">{link.label}</Link>)
                        : <Link to={link.href} className="text-sm text-[#bac7cc] transition-colors hover:text-[#56b2bb]">{link.label}</Link>
                        }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Link columns */}

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1d2233] text-xs">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6  text-[#bac7cc] sm:flex-row md:px-10">
          <p>© 2026 DinoFitClub. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Developed by <a href="/about/team" className="underline text-(--symbol-color) font-bold">Gen Z</a>
          </p>
        </div>
      </div>
    </footer>
  );
}