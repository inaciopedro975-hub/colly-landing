"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { FOUNDER_PHOTO, photos } from "@/lib/photos";
import SectionHeading from "./SectionHeading";
import PolaroidStack from "./PolaroidStack";

export default function Founder() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yPhoto = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yQuote = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      id="fundadora"
      className="relative py-28 md:py-36 bg-cream overflow-hidden"
    >
      {/* Ornamentos */}
      <div className="absolute top-1/4 -left-24 w-[380px] h-[380px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-beige/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Retrato com moldura clássica */}
        <motion.div
          style={{ y: yPhoto }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Moldura dourada decorativa */}
          <div className="relative mx-auto max-w-md aspect-[4/5]">
            <div className="absolute -inset-4 sm:-inset-6 border border-primary/30 rounded-[2rem] -rotate-2" />
            <div className="absolute -inset-2 sm:-inset-3 border border-primary/60 rounded-[1.6rem] rotate-1" />
            <div className="relative w-full h-full overflow-hidden rounded-[1.4rem] shadow-[0_30px_80px_-20px_rgba(42,31,18,0.4)]">
              <Image
                src={FOUNDER_PHOTO.src}
                alt={FOUNDER_PHOTO.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent" />
            </div>
            {/* Selo dourado sobreposto */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl z-10"
            >
              <div className="text-center">
                <p className="font-script text-3xl sm:text-4xl leading-none">
                  Colly
                </p>
                <p className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.3em] uppercase mt-1 opacity-90">
                  desde 2018
                </p>
              </div>
            </motion.div>
          </div>

          {/* Polaroids ao lado do retrato (somente desktop) */}
          <div className="hidden lg:block absolute -left-12 bottom-0 pointer-events-none">
            <PolaroidStack
              size="sm"
              photos={[photos[5], photos[12]]}
            />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          style={{ y: yQuote }}
          className="lg:col-span-7"
        >
          <SectionHeading
            eyebrow="A idealizadora"
            title="Quem sonhou esse espaço."
            align="left"
          />

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 relative"
          >
            <span
              className="absolute -top-6 -left-2 font-script text-7xl text-primary/30 select-none leading-none"
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="font-serif text-2xl md:text-[1.7rem] leading-snug text-ink-soft italic font-light text-pretty pl-6">
              Eu queria um lugar onde a natureza não fosse cenário —
              fosse <span className="text-primary not-italic">parte</span> do
              evento. Onde cada noiva, cada debutante, sentisse que o tempo
              parou só para ela.
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 max-w-xl"
          >
            <p className="text-ink-soft text-[1.05rem] leading-relaxed">
              Um espaço onde a natureza abraça cada celebração — e cada família
              é recebida com o cuidado de quem{" "}
              <span className="text-ink font-semibold">faz do sonho alheio o seu próprio evento</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center gap-5"
          >
            <div className="h-px w-16 bg-primary" />
            <p className="font-script text-3xl text-primary leading-none">
              Fundadora &amp; Idealizadora
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
