"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TOUR_360_PHOTOS } from "@/lib/photos";
import { FiChevronLeft, FiChevronRight, FiMove } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

export default function Tour360() {
  const [active, setActive] = useState(0);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate suave
  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % TOUR_360_PHOTOS.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  // Tilt 3D no hover
  const rotateY = useTransform(dragX, [-200, 200], [12, -12]);

  return (
    <section
      id="tour"
      className="relative py-28 md:py-36 bg-cream overflow-hidden"
    >
      {/* Ornamento bege */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-beige/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Tour Imersivo"
          title="Caminhe pelo nosso espaço"
          subtitle="Uma experiência 360º para você sentir cada detalhe — antes mesmo da visita presencial."
        />

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 mx-auto max-w-5xl"
          style={{ perspective: 2000 }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.15}
            onDrag={(_, info) => dragX.set(info.offset.x)}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80)
                setActive((v) => (v + 1) % TOUR_360_PHOTOS.length);
              else if (info.offset.x > 80)
                setActive(
                  (v) => (v - 1 + TOUR_360_PHOTOS.length) % TOUR_360_PHOTOS.length
                );
              animate(dragX, 0, { duration: 0.4 });
            }}
            style={{ rotateY }}
            className="relative aspect-[4/5] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_40px_120px_-30px_rgba(42,31,18,0.55)] cursor-grab active:cursor-grabbing bg-ink"
          >
            {TOUR_360_PHOTOS.map((p, i) => (
              <motion.div
                key={p.src}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : 1.08,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover select-none pointer-events-none"
                  draggable={false}
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {/* Overlay borda dourada */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-3xl pointer-events-none" />

            {/* Hint drag */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-ink/60 backdrop-blur-md text-white/90 text-xs tracking-wide"
            >
              <FiMove size={14} />
              Arraste para explorar
            </motion.div>

            {/* Setas */}
            <button
              aria-label="Anterior"
              onClick={() =>
                setActive(
                  (v) => (v - 1 + TOUR_360_PHOTOS.length) % TOUR_360_PHOTOS.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-primary transition flex items-center justify-center"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              aria-label="Próxima"
              onClick={() => setActive((v) => (v + 1) % TOUR_360_PHOTOS.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-primary transition flex items-center justify-center"
            >
              <FiChevronRight size={20} />
            </button>
          </motion.div>

          {/* Indicadores */}
          <div className="mt-8 flex justify-center gap-3">
            {TOUR_360_PHOTOS.map((_, i) => (
              <button
                key={i}
                aria-label={`Cena ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-12 bg-primary" : "w-1.5 bg-beige-deep"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
