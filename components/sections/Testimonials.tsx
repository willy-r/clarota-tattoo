"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(id);
  }, [paused]);

  const t = TESTIMONIALS[current];

  return (
    <section id="depoimentos" className="py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-4xl px-6 text-center">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-heading text-sm tracking-[0.4em] text-[#7c3aed] mb-3">DEPOIMENTOS</p>
          <h2 className="font-display text-5xl md:text-6xl font-black italic text-[#e8e0f0] leading-tight">
            O que dizem<br />
            <span className="text-[#a855f7]">os clientes</span>
          </h2>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative min-h-[240px] flex flex-col items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[#a855f7] text-lg">★</span>
                ))}
              </div>

              <blockquote className="font-editorial text-2xl md:text-3xl italic text-[#e8e0f0] leading-relaxed max-w-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-1">
                <span className="font-heading text-sm tracking-[0.2em] text-[#e8e0f0]">
                  {t.author}
                </span>
                <span className="font-sans text-xs text-[#6b7280]">{t.detail}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#7c3aed]" : "w-1.5 bg-[#1e1e1e] hover:bg-[#7c3aed]/40"
              }`}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
