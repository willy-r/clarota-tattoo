"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ARTIST } from "@/lib/content";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
} as const;

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-16 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — photo placeholder */}
          <motion.div
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm bg-[#111111] border border-[#1e1e1e]">
              {/* Placeholder — replace with real photo */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #111111 0%, #1e1e1e 50%, #111111 100%)",
                }}
              >
                <span className="font-display text-9xl font-black italic text-[#1e1e1e] select-none">
                  {ARTIST.name[0]}
                </span>
              </div>
              {/* Purple duotone overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4c1d95]/40 via-transparent to-transparent" />
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 hidden lg:block w-32 h-32 border border-[#7c3aed]/30 rounded-sm" />
            <div className="absolute -top-4 -left-4 hidden lg:block w-20 h-20 border border-[#a855f7]/20 rounded-sm" />
          </motion.div>

          {/* Right — text */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="font-heading text-sm tracking-[0.4em] text-[#7c3aed] mb-4">
                SOBRE A ARTISTA
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic text-[#e8e0f0] leading-tight mb-6">
                Humano por trás<br />
                <span className="text-[#a855f7]">da agulha</span>
              </h2>
              <p className="font-sans text-[#6b7280] text-lg leading-relaxed max-w-lg">
                {ARTIST.bio}
              </p>
            </div>

            <p className="font-editorial text-xl italic text-[#e8e0f0]/60 border-l-2 border-[#7c3aed] pl-5">
              Especialidades: {ARTIST.specialties.join(", ")}.
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
