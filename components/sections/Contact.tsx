"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Share2, Mail } from "lucide-react";
import { CONTACT } from "@/lib/content";

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "Respondo rápido",
    action: "Chamar agora",
    href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`,
    external: true,
  },
  {
    icon: Share2,
    label: "Instagram",
    sub: CONTACT.instagram,
    action: "Seguir",
    href: CONTACT.instagramUrl,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    sub: CONTACT.email,
    action: "Escrever",
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contato" className="py-16 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="font-heading text-sm tracking-[0.4em] text-[#7c3aed] mb-3">CONTATO</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic text-[#e8e0f0] leading-tight">
            Vamos criar<br />
            <span className="text-[#a855f7]">juntos</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CHANNELS.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group flex flex-col items-center gap-4 p-5 md:p-8 bg-[#111111] border border-[#1e1e1e] rounded-sm hover:border-[#7c3aed]/50 hover:-translate-y-1 transition-all duration-300 purple-glow-sm hover:purple-glow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 group-hover:bg-[#7c3aed]/20 transition-colors duration-300">
                  <Icon size={24} className="text-[#a855f7]" />
                </div>
                <div className="text-center">
                  <p className="font-heading text-lg tracking-wide text-[#e8e0f0] mb-1">
                    {ch.label.toUpperCase()}
                  </p>
                  <p className="font-sans text-sm text-[#6b7280]">{ch.sub}</p>
                </div>
                <span className="font-heading text-xs tracking-[0.3em] px-5 py-2 border border-[#7c3aed]/40 text-[#7c3aed] rounded-full group-hover:bg-[#7c3aed] group-hover:text-white group-hover:border-[#7c3aed] transition-all duration-300">
                  {ch.action.toUpperCase()}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
