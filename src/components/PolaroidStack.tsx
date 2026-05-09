"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Photo = { src: string; alt: string };

type Props = {
  photos: Photo[]; // 2 a 4 fotos
  caption?: string; // legenda manuscrita opcional
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SIZES = {
  sm: "w-44 sm:w-52",
  md: "w-56 sm:w-64",
  lg: "w-64 sm:w-72 md:w-80",
};

// Rotação preset por posição na pilha
const ROTATIONS = [-7, 5, -3, 8];
const OFFSETS = [
  { x: 0, y: 0 },
  { x: 28, y: 18 },
  { x: -22, y: 30 },
  { x: 36, y: -10 },
];

export default function PolaroidStack({
  photos,
  caption,
  className = "",
  size = "md",
}: Props) {
  const visible = photos.slice(0, 4);

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
    >
      {visible.map((p, i) => {
        const isTop = i === visible.length - 1;
        return (
          <motion.div
            key={p.src + i}
            initial={{
              opacity: 0,
              y: 40,
              rotate: ROTATIONS[i] * 2,
              scale: 0.85,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: ROTATIONS[i],
              scale: 1,
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.9,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              isTop
                ? {
                    rotate: ROTATIONS[i] * 0.3,
                    scale: 1.04,
                    y: -8,
                    transition: { duration: 0.4 },
                  }
                : undefined
            }
            style={{
              left: OFFSETS[i].x,
              top: OFFSETS[i].y,
              zIndex: i,
            }}
            className={`absolute ${SIZES[size]} bg-white rounded-sm p-3 pb-12 shadow-[0_18px_45px_-15px_rgba(42,31,18,0.55),0_8px_18px_-8px_rgba(42,31,18,0.35)] origin-center`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            {isTop && caption && (
              <p className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-ink-soft leading-none">
                {caption}
              </p>
            )}
            {/* Pequeno fita decorativa no topo da foto principal */}
            {isTop && (
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-primary/70 rounded-sm shadow-md"
                style={{ transform: "translateX(-50%) rotate(-2deg)" }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
