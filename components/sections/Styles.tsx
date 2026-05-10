"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STYLES } from "@/lib/content";

export default function StylesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="estilos" className="py-16 md:py-32 bg-[#111111]">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-heading text-sm tracking-[0.4em] text-[#7c3aed] mb-3">ESPECIALIDADES</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic text-[#e8e0f0] leading-tight">
            Os estilos que<br />
            <span className="text-[#a855f7]">domino</span>
          </h2>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 md:overflow-x-visible md:px-0 md:mx-0">
          <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-5 w-max md:w-auto">
            {STYLES.map((style, i) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group relative flex-shrink-0 w-64 md:w-auto p-6 bg-[#0a0a0a] border border-[#1e1e1e] rounded-sm hover:border-[#7c3aed]/50 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <span className="block font-display font-black italic text-4xl text-[#7c3aed]/40 group-hover:text-[#a855f7]/60 transition-colors duration-300 mb-4 select-none">
                    {style.icon}
                  </span>
                  <h3 className="font-heading text-xl tracking-wide text-[#e8e0f0] mb-2">
                    {style.name.toUpperCase()}
                  </h3>
                  <p className="font-sans text-sm text-[#6b7280] leading-relaxed">
                    {style.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
