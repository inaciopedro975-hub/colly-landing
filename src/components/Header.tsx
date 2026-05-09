"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const NAV = [
  { href: "#tour", label: "Tour 360º" },
  { href: "#galeria", label: "Galeria" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#fundadora", label: "Idealizadora" },
  { href: "#depoimentos", label: "Depoimentos" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_2px_24px_rgba(212,130,38,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <Image
            src="/colly-logo.png"
            alt="Colly Eventos"
            width={180}
            height={56}
            priority
            className={`h-14 w-auto transition-all duration-500 ${
              scrolled ? "opacity-100" : "brightness-0 invert opacity-95"
            }`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide font-medium transition-colors hover:text-primary ${
                scrolled ? "text-ink-soft" : "text-white/95"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#agendar"
            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold tracking-wide hover:bg-primary-dark transition-all hover:shadow-[0_8px_28px_rgba(212,130,38,0.45)] hover:-translate-y-0.5"
          >
            Agendar Visita
          </a>
        </nav>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 rounded-full transition-colors ${
            scrolled ? "text-ink hover:bg-cream" : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-line overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-ink-soft text-base font-medium hover:text-primary transition"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#agendar"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-3 rounded-full bg-primary text-white text-center text-sm font-semibold"
              >
                Agendar Visita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
