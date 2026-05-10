"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ARTIST, CONTACT } from "@/lib/content";

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Estilos", href: "#estilos" },
  { label: "Processo", href: "#processo" },
  // { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1e1e1e]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick("#hero"); }}
            className="font-display text-xl font-black italic text-[#e8e0f0] tracking-tight"
          >
            {ARTIST.name}<span className="text-[#a855f7]">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className="font-heading text-sm text-[#6b7280] hover:text-[#e8e0f0] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block font-heading text-sm px-5 py-2 bg-[#7c3aed] text-white rounded-full hover:bg-[#a855f7] transition-colors duration-200"
          >
            Agendar
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden text-[#e8e0f0] p-1 cursor-pointer"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer — custom, sem Sheet */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[210] w-72 bg-[#111111] border-l border-[#1e1e1e] flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header do painel */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e]">
          <span className="font-display text-xl font-black italic text-[#e8e0f0]">
            {ARTIST.name}<span className="text-[#a855f7]">.</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-[#6b7280] hover:text-[#e8e0f0] transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col px-6 py-8 gap-1 flex-1">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleLinkClick(link.href)}
                className="w-full text-left font-heading text-xl tracking-wide text-[#6b7280] hover:text-[#e8e0f0] py-3 border-b border-[#1e1e1e]/60 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="px-6 py-6 border-t border-[#1e1e1e]">
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block w-full text-center font-heading text-base tracking-[0.15em] py-3 bg-[#7c3aed] text-white rounded-full hover:bg-[#a855f7] transition-colors"
          >
            AGENDAR AGORA
          </a>
        </div>
      </div>
    </>
  );
}
