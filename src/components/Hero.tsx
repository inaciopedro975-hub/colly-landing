"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { photos } from "@/lib/photos";

// Fotos do slideshow — as mais impactantes do espaço
const SLIDES = [
  { ...photos[0],  alt: "Piscina e salão da Colly Eventos à noite" },
  { ...photos[16], alt: "Mesas redondas no terraço entre flores" },
  { ...photos[26], alt: "Cerimônia ao ar livre com guirlanda verde" },
  { ...photos[6],  alt: "Mesa rústica com arco floral em tons quentes" },
  { ...photos[23], alt: "Mesa redonda no terraço com vista para a mata" },
];

const INTERVAL = 5500;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.5]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden bg-ink"
    >
      {/* Slideshow de fotos */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, scale: d > 0 ? 1.04 : 1.04, x: 0 }),
            center: { opacity: 1, scale: 1.08, x: 0 },
            exit: (d: number) => ({ opacity: 0, scale: d > 0 ? 1.12 : 1.0, x: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            scale: { duration: 8, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            placeholder="blur"
            blurDataURL={SLIDES[current].blurDataURL}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradientes fixos sobre as fotos */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent pointer-events-none" />

      {/* Scroll darkening */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-ink pointer-events-none"
      />

      {/* Conteúdo principal */}
      <motion.div
        style={{ y: yContent, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-primary-light tracking-[0.5em] text-xs sm:text-sm uppercase mb-6 font-light drop-shadow-lg ornament-line"
        >
          Espaço de Eventos · Amparo–SP
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-white text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] font-light text-balance max-w-4xl"
          style={{ textShadow: "0 8px 48px rgba(0,0,0,0.55), 0 2px 12px rgba(212,130,38,0.25)" }}
        >
          Seu sonho,
          <br />
          <span className="font-script text-primary-light text-6xl sm:text-8xl md:text-[7rem] lg:text-[8rem] tracking-wide">
            nosso evento.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 max-w-xl text-white/85 text-base sm:text-lg leading-relaxed text-pretty font-light drop-shadow-md"
        >
          Um espaço clássico, acolhedor e em profunda harmonia com a natureza —
          onde casamentos e debutantes ganham a moldura perfeita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center pointer-events-auto"
        >
          <a
            href="https://api.whatsapp.com/send?phone=5519996729770&text=Ol%C3%A1%20Colly,%20quero%20agendar%20uma%20reuni%C3%A3o%20para%20falar%20sobre%20o%20meu%20evento."
            target="_blank"
            rel="noreferrer"
            className="group relative px-8 py-4 bg-primary rounded-full text-white font-semibold tracking-wide overflow-hidden hover:shadow-[0_18px_50px_rgba(212,130,38,0.55)] transition-all hover:-translate-y-0.5"
          >
            <span className="relative z-10">Agendar Uma Visita</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="#tour"
            className="px-8 py-4 border border-white/40 rounded-full text-white font-medium tracking-wide hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            Fazer Tour 360º
          </a>
        </motion.div>
      </motion.div>

      {/* Indicadores de slide */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Foto ${i + 1}`}
            className="group relative h-[3px] rounded-full overflow-hidden transition-all duration-500 focus:outline-none"
            style={{ width: i === current ? 32 : 16 }}
          >
            <span className="absolute inset-0 bg-white/30 rounded-full" />
            {i === current && (
              <motion.span
                key={current}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                style={{ transformOrigin: "left" }}
                className="absolute inset-0 bg-white rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-14 bg-gradient-to-b from-transparent via-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
