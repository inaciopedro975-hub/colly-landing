"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS, GALLERY_PHOTOS_MOBILE } from "@/lib/photos";
import SectionHeading from "./SectionHeading";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // Hooks sempre chamados (regra dos hooks)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yC = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const photoList = isMobile ? GALLERY_PHOTOS_MOBILE : GALLERY_PHOTOS;

  return (
    <section
      ref={ref}
      id="galeria"
      className="relative py-28 md:py-36 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Momentos eternos"
          title="Galeria de eventos"
          subtitle="Um passeio pelos eventos que aconteceram em nosso espaço — cada um único, cada um inesquecível."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {photoList.map((p, i) => {
            const tall = i % 5 === 0 || i % 5 === 3;

            if (isMobile) {
              return (
                <button
                  key={p.src}
                  onClick={() => setLightbox(i)}
                  className={`relative overflow-hidden rounded-2xl bg-cream shadow-sm ${
                    tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </button>
              );
            }

            const y = i % 3 === 0 ? yA : i % 3 === 1 ? yB : yC;
            return (
              <motion.button
                key={p.src}
                onClick={() => setLightbox(i)}
                style={{ y }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: (i % 6) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.025 }}
                className={`relative group overflow-hidden rounded-2xl bg-cream shadow-sm hover:shadow-xl transition-shadow ${
                  tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-white text-xs tracking-[0.3em] uppercase">
                    Ver detalhes
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          photos={photoList}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNav={(dir) =>
            setLightbox((curr) => {
              if (curr === null) return curr;
              return (curr + dir + photoList.length) % photoList.length;
            })
          }
        />
      )}
    </section>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: {
  photos: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        aria-label="Fechar"
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
        onClick={onClose}
      >
        <FiX size={22} />
      </button>
      <button
        aria-label="Anterior"
        className="absolute left-4 md:left-10 w-12 h-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        aria-label="Próxima"
        className="absolute right-4 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
      >
        <FiChevronRight size={22} />
      </button>
      <motion.div
        key={photos[index].src}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl aspect-[3/2]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index].src}
          alt={photos[index].alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
