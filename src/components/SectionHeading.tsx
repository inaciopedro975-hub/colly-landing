"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } gap-4 max-w-2xl ${isCenter ? "mx-auto" : ""}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`tracking-[0.4em] uppercase text-xs font-medium ${
            light ? "text-primary-light" : "text-primary"
          }`}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-light text-balance ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`text-base md:text-lg text-pretty leading-relaxed ${
            light ? "text-white/80" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`origin-left h-px w-24 mt-2 ${
          isCenter ? "mx-auto origin-center" : ""
        } bg-gradient-to-r from-primary via-primary/50 to-transparent`}
      />
    </div>
  );
}
