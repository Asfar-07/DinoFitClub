import * as React from "react";
import { Star } from "lucide-react";
import { motion, type Variants } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "AR",
    name: "Aisha Rahman",
    role: "Head Coach · Iron Republic",
    rating: 5,
    quote:
      "DinoFitClub replaced three tools. Billing, attendance and progress live in one place — my students actually see their wins now.",
  },
  {
    initials: "MV",
    name: "Marco Vitale",
    role: "Personal Trainer · Milan",
    rating: 5,
    quote:
      "The nearby map alone brought me 27 new clients this quarter. The dashboard just… gets what trainers need.",
  },
  {
    initials: "PN",
    name: "Priya Nair",
    role: "Studio Owner · Bengaluru",
    rating: 5,
    quote:
      "Cash flow finally makes sense. Pending fees are auto-tracked and monthly reports save me a full weekend.",
  },
  {
    initials: "LC",
    name: "Liam Carter",
    role: "Gym Manager · Austin",
    rating: 4,
    quote:
      "Bespoke branding and a productive team — running our gym has never felt this organized.",
  },
  {
    initials: "SK",
    name: "Sofia Kowalski",
    role: "Yoga Instructor · Warsaw",
    rating: 5,
    quote:
      "Client check-ins used to eat my mornings. Now it's automatic, and I actually get to teach.",
  },
];

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const carouselContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HomeReview(): React.JSX.Element {
  return (
    <section
      id="review"
      className="w-full bg-(--primary-bg-color) px-6 py-24 text-center text-(--primary-text-color) md:px-10"
    >
      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.span
          variants={headerItemVariants}
          className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-(--symbol-color)"
        >
          Loved by trainers
        </motion.span>

        <motion.h2
          variants={headerItemVariants}
          className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          What <span className="text-[#56b2bb]">Trainers Say</span>
        </motion.h2>
      </motion.div>

      <div className="relative mx-auto mt-14 max-w-7xl">
        {/* left fade shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0f22] to-transparent sm:w-28"
        />
        {/* right fade shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0f22] to-transparent sm:w-28"
        />

        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <motion.div
            variants={carouselContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <CarouselContent className="-ml-6 px-1">
              {testimonials.map((t: Testimonial) => (
                <CarouselItem
                  key={t.name}
                  className="basis-[320px] pl-6 sm:basis-[360px]"
                >
                  <motion.article
                    variants={cardVariants}
                    className="flex h-full flex-col gap-4 rounded-2xl bg-[#1d2233]/60 p-6 text-left ring-1 ring-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#56b2bb]/20 text-sm font-semibold text-[#56b2bb] ring-1 ring-(#7be6df)">
                        {t.initials}
                      </span>
                      <div>
                        <p className="font-semibold text-[#f0f4f8]">
                          {t.name}
                        </p>
                        <p className="text-sm text-[#bac7cc]">{t.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i: number) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < t.rating ? "#7be6df" : "transparent"}
                          stroke={i < t.rating ? "#7be6df" : "#3a4257"}
                        />
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed text-[#bac7cc]">
                      &quot;{t.quote}&quot;
                    </p>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <CarouselPrevious className="static h-10 w-10 translate-x-0 translate-y-0 border-[#f0f4f8]/15 bg-[#1d2233] text-[#f0f4f8] hover:bg-[#56b2bb]/20 hover:text-[#56b2bb]" />
            <CarouselNext className="static h-10 w-10 translate-x-0 translate-y-0 border-[#f0f4f8]/15 bg-[#1d2233] text-[#f0f4f8] hover:bg-[#56b2bb]/20 hover:text-[#56b2bb]" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}