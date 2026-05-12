"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { photos } from "@/lib/photos";
import { useIsMobile } from "@/lib/useIsMobile";

const MAIN_PHOTO = photos[9];
const SECONDARY_PHOTO = photos[21];

export default function TheMoment() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yMainRaw = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const ySecondaryRaw = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const yTextRaw = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scaleMainRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const yMain = isMobile ? undefined : yMainRaw;
  const ySecondary = isMobile ? undefined : ySecondaryRaw;
  const yText = isMobile ? undefined : yTextRaw;
  const scaleMain = isMobile ? undefined : scaleMainRaw;

  const mainPhoto = (
    <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-sm overflow-hidden shadow-[0_50px_140px_-30px_rgba(42,31,18,0.55)]">
      <Image
        src={MAIN_PHOTO.src}
        alt="Saída dos noivos sob chuva de pétalas — Colly Eventos"
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-t from-ink/80 to-transparent">
        <div className="flex items-center gap-4 text-white/95">
          <span className="h-px w-10 bg-primary-light" />
          <span className="font-script text-2xl sm:text-3xl text-primary-light leading-none">o grande dia</span>
        </div>
      </div>
    </div>
  );

  const textContent = (
    <>
      <span className="block tracking-[0.5em] uppercase text-xs text-primary font-medium mb-8">⸺ O Momento ⸺</span>
      <h2 className="font-serif text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.05] font-light text-ink text-balance">
        Existe um instante
        <br />
        <span className="font-script text-primary text-5xl sm:text-6xl md:text-7xl leading-none">que muda tudo.</span>
      </h2>
      <div className="mt-10 space-y-5 text-ink-soft text-lg leading-relaxed text-pretty max-w-md">
        <p>É a sua mão na dele. As pétalas no ar. O sorriso de quem amou vocês a vida inteira.</p>
        <p className="italic text-ink-soft/80">
          É o momento em que tudo o que vocês imaginaram acontece de verdade. E nós cuidamos para que ele seja exatamente como deve ser — seu, inteiro, eterno.
        </p>
      </div>
      <div className="mt-12 flex items-center gap-5">
        <div className="h-px w-20 bg-primary" />
        <span className="font-script text-3xl text-primary leading-none">eternize aqui</span>
      </div>
      <a href="#agendar" className="mt-10 inline-flex items-center gap-3 text-ink hover:text-primary transition group">
        <span className="text-sm tracking-[0.3em] uppercase font-semibold">Reservar uma data</span>
        <span className="w-10 h-10 rounded-full border border-ink/20 group-hover:border-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">→</span>
      </a>
    </>
  );

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-44 bg-gradient-to-b from-white via-cream to-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

        {isMobile ? (
          <>
            {/* Mobile: divs simples, sem animações JS */}
            <div className="lg:col-span-7 relative">
              <span className="absolute -top-12 -left-2 font-serif text-[6rem] sm:text-[9rem] font-light text-primary/15 leading-none select-none" aria-hidden>01</span>
              {mainPhoto}
            </div>
            <div className="lg:col-span-5 relative">{textContent}</div>
          </>
        ) : (
          <>
            {/* Desktop: motion.div com parallax e whileInView */}
            <motion.div
              style={{ y: yMain, scale: scaleMain }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 relative"
            >
              <span className="absolute -top-12 -left-2 lg:-left-8 font-serif text-[6rem] sm:text-[9rem] lg:text-[11rem] font-light text-primary/15 leading-none select-none" aria-hidden>01</span>
              {mainPhoto}
              <motion.div
                style={{ y: ySecondary }}
                initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotate: -2, scale: 1.04, transition: { duration: 0.4 } }}
                className="hidden md:block absolute -bottom-12 -right-8 lg:-right-16 w-56 lg:w-72 bg-white p-3 pb-12 shadow-[0_30px_80px_-15px_rgba(42,31,18,0.55)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <Image src={SECONDARY_PHOTO.src} alt="Beijo sob arco floral à noite" fill sizes="288px" className="object-cover" />
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-ink-soft leading-none">para sempre</p>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-primary/70 rounded-sm shadow-md" />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: yText }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              {textContent}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
