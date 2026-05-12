"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { photos } from "@/lib/photos";
import { useIsMobile } from "@/lib/useIsMobile";

const ITEMS = [
  {
    numeral: "I",
    title: "Conexão com a natureza",
    text: "Jardins amplos, árvores centenárias e luz natural que dispensa cenários. Aqui a paisagem é parte do evento.",
    photo: photos[14],
  },
  {
    numeral: "II",
    title: "Arquitetura clássica",
    text: "Salões com pé-direito alto, varandas em curva e detalhes em madeira que carregam a sofisticação de outra época.",
    photo: photos[16],
  },
  {
    numeral: "III",
    title: "Cerimônia ao ar livre",
    text: "Espaço dedicado para celebrações entre o verde, com infraestrutura completa para chuva ou sol pleno.",
    photo: photos[19],
  },
  {
    numeral: "IV",
    title: "Amparo, Circuito das Águas",
    text: "A 130 km de São Paulo. Acesso fácil, clima ameno e o charme de uma cidade histórica para receber seus convidados.",
    photo: photos[26],
  },
  {
    numeral: "V",
    title: "Capacidade até 400 convidados",
    text: "Estrutura modular que abraça desde celebrações intimistas até festas grandiosas, sem perder a atmosfera acolhedora.",
    photo: photos[12],
  },
  {
    numeral: "VI",
    title: "Atendimento dedicado",
    text: "Uma equipe que cuida dos detalhes do primeiro contato à última dança — para você só viver o seu dia.",
    photo: photos[5],
  },
];

export default function Differentials() {
  return (
    <section
      id="diferenciais"
      className="relative py-28 md:py-36 overflow-hidden bg-white"
    >
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Por que Colly"
          title="Os detalhes que tornam tudo único."
          subtitle="Pequenos cuidados que, somados, viram a memória que você vai contar para sempre."
        />
        <div className="mt-24 space-y-24 md:space-y-32">
          {ITEMS.map((item, i) => (
            <EditorialRow key={item.numeral} item={item} index={i} />
          ))}
        </div>
        <div className="mt-24 flex flex-col items-center gap-3">
          <span className="font-serif text-3xl text-primary/60 leading-none select-none" aria-hidden>
            ❦
          </span>
          <p className="text-ink-soft text-sm tracking-[0.4em] uppercase">
            Cada detalhe pensado para você
          </p>
        </div>
      </div>
    </section>
  );
}

function EditorialRow({
  item,
  index,
}: {
  item: (typeof ITEMS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y = isMobile ? undefined : yRaw;
  const reverse = index % 2 === 1;

  const photoBlock = (
    <div className="md:col-span-6 [direction:ltr]">
      <div className="relative aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_80px_-25px_rgba(42,31,18,0.45)]">
        <Image
          src={item.photo.src}
          alt={item.photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover${isMobile ? "" : " transition-transform duration-[1.4s] hover:scale-105"}`}
        />
        <span
          className="absolute -top-4 -left-2 sm:-top-6 sm:-left-4 font-serif italic text-[5rem] sm:text-[7rem] md:text-[9rem] font-light text-primary leading-none drop-shadow-[0_4px_24px_rgba(212,130,38,0.4)] select-none pointer-events-none"
          aria-hidden
        >
          {item.numeral}
        </span>
      </div>
    </div>
  );

  const textBlock = (
    <div className={`md:col-span-6 [direction:ltr] ${reverse ? "md:pr-4 lg:pr-10" : "md:pl-4 lg:pl-10"}`}>
      <div className="flex items-center gap-4">
        <span className="font-serif italic text-2xl text-primary leading-none">{item.numeral}</span>
        <span className="h-px w-16 bg-primary/40" />
        <span className="text-xs tracking-[0.4em] uppercase text-ink-soft font-medium">Diferencial</span>
      </div>
      <h3 className="mt-6 font-serif text-3xl md:text-4xl lg:text-[2.6rem] leading-tight font-light text-ink text-balance">
        {item.title}
      </h3>
      <p className="mt-6 text-ink-soft text-[1.05rem] leading-relaxed max-w-md">{item.text}</p>
      <div className="mt-8 h-px w-24 bg-gradient-to-r from-primary/60 to-transparent" />
    </div>
  );

  if (isMobile) {
    return (
      <div
        ref={ref}
        className={`grid md:grid-cols-12 gap-8 md:gap-14 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
      >
        {photoBlock}
        {textBlock}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-12 gap-8 md:gap-14 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
    >
      <motion.div style={{ y }} className="md:col-span-6 [direction:ltr]">
        <div className="relative aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_80px_-25px_rgba(42,31,18,0.45)]">
          <Image
            src={item.photo.src}
            alt={item.photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.4s] hover:scale-105"
          />
          <span
            className="absolute -top-4 -left-2 sm:-top-6 sm:-left-4 font-serif italic text-[5rem] sm:text-[7rem] md:text-[9rem] font-light text-primary leading-none drop-shadow-[0_4px_24px_rgba(212,130,38,0.4)] select-none pointer-events-none"
            aria-hidden
          >
            {item.numeral}
          </span>
        </div>
      </motion.div>
      {textBlock}
    </motion.div>
  );
}
