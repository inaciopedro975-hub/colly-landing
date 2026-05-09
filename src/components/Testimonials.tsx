"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { photos } from "@/lib/photos";
import SectionHeading from "./SectionHeading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TESTIMONIALS = [
  {
    name: "Beatriz & Rafael",
    role: "Casamento · Mar/2025",
    quote:
      "Foi exatamente como sonhamos — o pôr do sol entre as árvores, o salão impecável, a equipe atenta a cada detalhe. Nossos convidados ainda comentam.",
  },
  {
    name: "Família Mendes",
    role: "Debutante · Nov/2024",
    quote:
      "A Colly entregou a noite dos sonhos da nossa filha. Ambiente clássico, estrutura perfeita e um carinho com a família que faz toda a diferença.",
  },
  {
    name: "Camila & Henrique",
    role: "Casamento · Set/2024",
    quote:
      "Visitamos vários espaços. No instante em que pisamos na Colly, soubemos. A natureza, a luz, o silêncio acolhedor — não tem como descrever.",
  },
  {
    name: "Família Almeida",
    role: "Debutante · Jul/2025",
    quote:
      "Profissionais que tratam o seu evento como se fosse o deles. Resultado impecável, cada minuto valeu a pena.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((v) => (v + 1) % TESTIMONIALS.length),
      8000
    );
    return () => clearInterval(id);
  }, []);

  const next = () => setActive((v) => (v + 1) % TESTIMONIALS.length);
  const prev = () =>
    setActive((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const t = TESTIMONIALS[active];

  return (
    <section
      id="depoimentos"
      className="relative py-28 md:py-36 bg-ink overflow-hidden"
    >
      {/* Background fotográfico esmaecido */}
      <div className="absolute inset-0 opacity-15 sm:opacity-25">
        <Image
          src={photos[19].src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/70 to-ink/95" />
      </div>
      <div className="absolute top-0 left-0 w-[480px] h-[480px] rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <SectionHeading
          eyebrow="Quem viveu, conta"
          title="Histórias que nos emocionam."
          light
        />

        <div className="mt-16 relative min-h-[360px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-script text-primary-light text-7xl leading-none mb-6 select-none">
                &ldquo;
              </span>
              <p className="font-serif text-xl sm:text-3xl md:text-[2.2rem] text-white leading-relaxed font-light text-balance max-w-3xl px-2">
                {t.quote}
              </p>
              <div className="mt-10 flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 text-primary-light/70">
                  <span className="h-px w-10 bg-primary-light/40" />
                  <span className="text-xs tracking-[0.4em] uppercase">
                    Quem viveu
                  </span>
                  <span className="h-px w-10 bg-primary-light/40" />
                </div>
                <p className="text-white font-medium tracking-wide text-lg">
                  {t.name}
                </p>
                <p className="text-primary-light/80 text-xs tracking-[0.3em] uppercase">
                  {t.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            aria-label="Anterior"
            onClick={prev}
            className="w-11 h-11 rounded-full border border-white/25 text-white/80 hover:bg-primary hover:border-primary hover:text-white transition flex items-center justify-center"
          >
            <FiChevronLeft size={20} />
          </button>
          <div className="flex gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Depoimento ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-primary" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Próxima"
            onClick={next}
            className="w-11 h-11 rounded-full border border-white/25 text-white/80 hover:bg-primary hover:border-primary hover:text-white transition flex items-center justify-center"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
