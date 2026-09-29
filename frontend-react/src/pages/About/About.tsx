import type { ReactElement, ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import {
  Check,
  Sparkles,
  Users,
  Wallet,
  LineChart,
  Map,
  Wrench,
  Trophy,
  ShieldCheck,
  Smartphone,
  Target,
  Eye,
  HeartHandshake,
  Linkedin,
  Github,
  Twitter,
  ArrowRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface ChecklistItem {
  text: string;
}

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface PurposeItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  tag: string;
  profile: string;
  isFounder?: boolean;
}

const CHECKLIST: ChecklistItem[] = [
  { text: "Built for trainers first — every tool revolves around the people who coach, guide and motivate." },
  { text: "Connect gyms, trainers and fitness enthusiasts through a single connected platform." },
  { text: "One place for memberships, billing, progress, scheduling and nearby gym discovery." },
  { text: "Designed to grow one of the world's largest fitness communities, together." },
];

const FEATURES: FeatureItem[] = [
  {
    icon: <Users size={18} />,
    title: "Community Network",
    description: "Create, follow and grow fitness communities. Track members, followers and your community rank from Bronze to Elite.",
  },
  {
    icon: <Wallet size={18} />,
    title: "Billing & Memberships",
    description: "Handle memberships, plans and payments in one dashboard with clear records and flexible cycles.",
  },
  {
    icon: <LineChart size={18} />,
    title: "Progress Tracking",
    description: "Track student progress with rich charts, milestones and history — so gains are always visible.",
  },
  {
    icon: <Map size={18} />,
    title: "Nearby Gym Discovery",
    description: "Find gyms and trainers near you on an intelligent map and connect with the right community.",
  },
  {
    icon: <Wrench size={18} />,
    title: "Trainer Tools",
    description: "Schedule sessions, manage students and keep every client's journey organised in one workspace.",
  },
  {
    icon: <Trophy size={18} />,
    title: "Ranks & Rewards",
    description: "Climb from Dino Bronze to Dino Elite as your community grows — recognition built into the platform.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Secure by Design",
    description: "Role-based access, privacy controls and account protection keep trainers and members safe.",
  },
  {
    icon: <Smartphone size={18} />,
    title: "Modern & Responsive",
    description: "A polished, fast interface that works across desktop and mobile with the same premium feel.",
  },
];

const PURPOSE: PurposeItem[] = [
  {
    icon: <Target size={18} />,
    title: "Our Mission",
    description:
      "To empower trainers, gym owners and fitness enthusiasts with a single intelligent platform that makes managing memberships, billing, progress and community effortless — so they spend less time on admin and more time transforming lives through fitness. We remove the friction between a trainer's expertise and the people who need it, connecting the whole fitness journey in one place.",
  },
  {
    icon: <Eye size={18} />,
    title: "Our Vision",
    description:
      "To build one of the world's largest fitness communities — a connected ecosystem where every gym, trainer and enthusiast belongs, grows and is recognised. We imagine a future where discovering a gym, finding the right trainer and tracking your progress all happen seamlessly, together, on DinoFitClub.",
  },
  {
    icon: <HeartHandshake size={18} />,
    title: "What Makes Us Different",
    description:
      "We focus on the trainer, not the facility. DinoFitClub is built around the people who coach, guide and motivate — with community ranks from Dino Bronze to Dino Elite, nearby gym discovery built in, and a polished, delightful experience on every device. Real people, real progress, a supportive community — not just numbers.",
  },
];

const TEAM: TeamMember[] = [
  {
    name: "Asfar Muhammed N S",
    role: "Founder & Developer",
    bio: "Leading DinoFitClub from idea to reality, shaping the product vision, building the platform, and bringing the fitness community experience together.", 
    tag: "FOUNDER", profile: "/images/defaults/default_picture.webp", isFounder: true,
  },
  {
    name: "Abiraj P",
    role: "Developer & Content Writer", 
    bio: "Helping build the platform while creating clear, engaging content that makes DinoFitClub easier to understand and connect with.", 
    tag: "DEVELOPER", profile: "/images/defaults/default_picture.webp",
  }, 
  {
    name: "Team Member", 
    role: "Tester & Community Lead", 
    bio: "Testing the platform from a user's perspective and helping shape the community through feedback, ideas, and real-world experiences.", 
    tag: "TESTER", profile: "/images/defaults/default_picture.webp",
  }, 
  { name: "Loveable", 
    role: "Designer", 
    bio: "Turning ideas into simple, friendly, and engaging experiences that make DinoFitClub enjoyable to use across every screen.", 
    tag: "DESIGN", profile: "/images/defaults/default_picture.webp", },];



interface SectionPillProps {
  icon: ReactNode;
  children: ReactNode;
}

function SectionPill({ icon, children }: SectionPillProps): ReactElement {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7be6df40] bg-[#7be6df14]
     px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-(--symbol-color)">
      {icon}
      {children}
    </span>
  );
}


export default function About(): ReactElement {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { section } = useParams();

  useEffect(() => {
    if (!section) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(section);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [section]);
  
  return (
    <div className="min-h-screen relative overflow-hidden w-full bg-(--primary-bg-color) pt-16 text-(--primary-text-color)">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(123,230,223,0.1) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className=" fixed inset-0">
        <div
          ref={containerRef}
          className="absolute h-[800px] w-[800px] rounded-full bg-[#5dbcc1]/30 blur-[160px] pointer-events-none"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)", // centers the div on the cursor
          }}
        />
      </div>
      {/* <div className="absolute top-1/2 -right-40 h-[520px] w-[520px] rounded-full bg-[#5dbcc1]/30 blur-[160px]"></div>
      <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#5dbcc1]/30 blur-[160px]"></div> */}

      <div className="relative mx-auto flex max-w-6xl flex-col gap-24 px-4 py-10 sm:px-6 md:px-6 md:py-14">

        {/* What is DinoFitClub*/}
        <section className="rounded-3xl glass-strong-nav shadow-xl p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            What is <span className="text-(--symbol-color)">DinoFitClub?</span>
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-(--secondary-text-color) sm:text-base">

            DinofitClub started with a simple idea, fitness is better when we do it together.
            We’re building a place where people can work toward their fitness goals, find the right community, 
            meet new people, and stay motivated along the way.
             Whether you run a gym, teach yoga, lead a fitness group, or simply want to become more active, 
             DinofitClub gives you a place to be part of something bigger.
            You can manage memberships and billing, track progress, join challenges and events, earn coins, 
            take part in giveaways, connect with other members, find workout partners, and discover fitness communities nearby.

            <br />
            <br />
            <span className="font-bold">
              DinofitClub is more than a fitness platform,
              it’s a virtual fitness world where communities connect, achievements are shared, and everyone has a reason to keep moving..
            </span>
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {CHECKLIST.map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 rounded-2xl glass-strong-nav p-5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7be6df1f] text-(--symbol-color)">
                  <Check size={12} strokeWidth={3} />
                </span>
                <p className="text-sm leading-relaxed text-(--primary-text-color)">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="flex flex-col items-center text-center">
          <SectionPill icon={<Sparkles size={12} />}>Features</SectionPill>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Everything a trainer needs, <span className="text-(--symbol-color)">in one place</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-(--secondary-text-color) sm:text-base">
            Powerful modules designed around the way trainers actually work — simple to use, delightful to own.
          </p>

          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-2xl glass-strong-nav shadow-2xl p-6 text-left"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7be6df33] bg-[#7be6df14] text-(--symbol-color)">
                  {f.icon}
                </span>
                <p className="text-sm font-bold text-(--primary-text-color)">{f.title}</p>
                <p className="text-xs leading-relaxed text-(--secondary-text-color)">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="flex flex-col items-center text-center">
          <SectionPill icon={<Users size={12} />}>The Team</SectionPill>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            The people behind <span className="text-(--symbol-color)">DinoFitClub</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-(--secondary-text-color) sm:text-base">
            A small, passionate team building a connected fitness community — led by our founder and developer.
          </p>

          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div
                key={m.name + m.role}
                className="relative flex flex-col gap-4 rounded-2xl glass-strong-nav shadow-2xl p-5 text-left"
              >
                {m.isFounder && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full border border-[#7be6df40] bg-[#0a0f22] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-(--symbol-color)">
                    <Sparkles size={10} />
                    Founder
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <img src={m.profile} alt="Team Profile" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#7be6df40] " />
                  <div>
                    <p className="text-sm font-bold text-(--primary-text-color)">{m.name}</p>
                    <p className="text-xs text-(--secondary-text-color)">{m.role}</p>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-(--secondary-text-color)">{m.bio}</p>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="rounded-full border border-[#ffffff1a] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-(--symbol-color)">
                    {m.tag}
                  </span>
                  {m.isFounder && (
                    <div className="flex items-center gap-2 text-(--symbol-color)">
                      <Linkedin size={14} className="transition hover:text-(--symbol-color)" />
                      <Github size={14} className="transition hover:text-(--symbol-color)" />
                      <Twitter size={14} className="transition hover:text-(--symbol-color)" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Mission / Vision / Difference */}
        <section id="mission" className="flex flex-col items-center text-center">
          <SectionPill icon={<Sparkles size={12} />}>Our Purpose</SectionPill>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            Mission · Vision · <span className="text-(--symbol-color)">Difference</span>
          </h2>

          <div className="mt-12 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
            {PURPOSE.map((p, i) => (
              <div
                key={p.title}
                className={`flex flex-col gap-3 text-left ${i > 0 ? "md:border-l md:border-[#ffffff14] md:pl-10" : ""}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7be6df33] bg-[#7be6df14] text-(--symbol-color)">
                  {p.icon}
                </span>
                <p className="text-lg font-extrabold text-(--primary-text-color)">{p.title}</p>
                <p className="text-sm leading-relaxed text-(--secondary-text-color)">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Start Join */}
        <section className="rounded-3xl border glass-strong-nav shadow-2xl px-6 py-10 text-center sm:px-10">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-(--primary-text-color) sm:text-base">
            As an early tester, your feedback shapes DinoFitClub. Have a great feature idea? If your suggestion
            becomes part of the platform, we'll proudly recognise your contribution by name after our official
            launch.
          </p>
          <Link to="/login" 
           className="mx-auto mt-6 cursor-pointer flex items-center justify-center gap-2 rounded-full
           bg-gradient-to-r from-(--symbol-color) to-[#38d9c4] px-7 py-3 text-sm font-bold text-[#082a28]
            transition hover:brightness-105">
            Join the journey
            <ArrowRight size={15} />
          </Link>
        </section>

      </div>
    </div>
  );
}