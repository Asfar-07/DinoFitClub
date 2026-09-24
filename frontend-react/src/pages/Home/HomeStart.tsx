//@ts-nocheck
import { useSelector } from "react-redux";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { RootState } from "@/app/store";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HomeStart() {
  const isAuth = useSelector((state: RootState) => state.userAuth.status);

  return (
    <section className="relative w-full overflow-hidden bg-(--primary-bg-color) px-6 py-28 text-center text-(--primary-text-color) md:px-10">
      <motion.div
        className="relative mx-auto flex max-w-3xl flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl md:text-6xl"
        >
          Ready To Build Your
          <br />
          <span className="text-[#56b2bb]">Fitness Network?</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-4 max-w-xl text-(--secondary-text-color)"
        >
          Join thousands of trainers running their studios on DinoFitClub.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          {isAuth == "authenticated" ? (
            <Link
              to="/account"
              className="flex items-center gap-1.5 rounded-full px-7 py-4 text-sm font-semibold text-[#0a0f22]
          to-primary-glow shadow-[0_0_40px_-10px_rgba(86,178,187,0.6)] transition-transform hover:scale-[1.03] cursor-pointer"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full px-7 py-4 text-sm font-semibold text-[#0a0f22]
          to-primary-glow shadow-[0_0_40px_-10px_rgba(86,178,187,0.6)] transition-transform hover:scale-[1.03] cursor-pointer"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <Link
            to="/nearby-location"
            className="glass flex items-center gap-1.5 rounded-full border-[#f0f4f8]/15 px-7 py-4 text-sm font-semibold
             text-(--primary-text-color) hover:bg-[#1d2233] cursor-pointer"
          >
            <MapPin className="h-4 w-4 text-[#56b2bb]" />
            Explore Nearby
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}