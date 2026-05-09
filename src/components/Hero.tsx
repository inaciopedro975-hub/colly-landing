"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { HERO_PHOTOS, photos } from "@/lib/photos";

// Cada card tem posição (x,y), profundidade z, rotação e tamanho próprios.
// Quanto mais negativo o z, mais ao "fundo" — menos reage ao mouse.
// Tamanhos diferentes para mobile/desktop (clamp).
const CARDS = [
  {
    photo: HERO_PHOTOS[0], // piscina noite
    x: "-22%",
    y: "-18%",
    z: -180,
    rot: -8,
    w: "clamp(140px, 26vw, 380px)",
    h: "clamp(190px, 32vw, 480px)",
    parallax: 0.25,
    mobileHide: false,
  },
  {
    photo: HERO_PHOTOS[1], // arco floral
    x: "26%",
    y: "-22%",
    z: -60,
    rot: 6,
    w: "clamp(120px, 22vw, 320px)",
    h: "clamp(170px, 30vw, 440px)",
    parallax: 0.55,
    mobileHide: true, // esconde no mobile p/ não poluir
  },
  {
    photo: HERO_PHOTOS[2], // mesa terraço
    x: "-28%",
    y: "20%",
    z: -100,
    rot: 5,
    w: "clamp(130px, 24vw, 340px)",
    h: "clamp(180px, 30vw, 440px)",
    parallax: 0.4,
    mobileHide: true,
  },
  {
    photo: HERO_PHOTOS[3], // vaso flores
    x: "28%",
    y: "22%",
    z: -40,
    rot: -7,
    w: "clamp(120px, 20vw, 300px)",
    h: "clamp(160px, 26vw, 400px)",
    parallax: 0.7,
    mobileHide: false,
  },
  {
    photo: photos[16], // mesa redonda terraço (extra do fundo)
    x: "0%",
    y: "0%",
    z: -300,
    rot: 0,
    w: "clamp(280px, 44vw, 640px)",
    h: "clamp(280px, 44vw, 640px)",
    parallax: 0.1,
    mobileHide: false,
  },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Suaviza com spring
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  // Tilt geral do palco (rotação leve baseada no mouse)
  const stageRotY = useTransform(sx, [-1, 1], [10, -10]);
  const stageRotX = useTransform(sy, [-1, 1], [-7, 7]);

  // Scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const stageZ = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Normaliza -1..1
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((t.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((t.clientY - rect.top) / rect.height - 0.5) * 2;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden bg-ink isolate"
      style={{ perspective: 1400 }}
    >
      {/* Background gradiente quente */}
      <div className="absolute inset-0 bg-gradient-radial from-[#3a2a17] via-ink to-[#1a120a]" />

      {/* Halos pulsantes */}
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/30 blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-dark/40 blur-[100px] pointer-events-none"
      />

      {/* Palco 3D — perspectiva e rotação geral */}
      <motion.div
        ref={stageRef}
        style={{
          rotateY: stageRotY,
          rotateX: stageRotX,
          scale: stageScale,
          z: stageZ,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        {CARDS.map((card, i) => (
          <Card3D key={i} card={card} mx={sx} my={sy} index={i} />
        ))}
      </motion.div>

      {/* Vinheta */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/85 pointer-events-none" />

      {/* Conteúdo central — flutua acima das cards */}
      <motion.div
        style={{ opacity, y: yContent }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-primary-light tracking-[0.5em] text-xs sm:text-sm uppercase mb-6 font-light drop-shadow-lg"
        >
          Espaço de Eventos · Amparo–SP
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-white text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] font-light text-balance max-w-5xl"
          style={{
            textShadow:
              "0 6px 40px rgba(0,0,0,0.6), 0 2px 12px rgba(212,130,38,0.3)",
          }}
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
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 max-w-xl text-white/90 text-base sm:text-lg leading-relaxed text-pretty font-light drop-shadow-md"
        >
          Um espaço clássico, acolhedor e em profunda harmonia com a natureza —
          onde casamentos e debutantes ganham a moldura perfeita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-10 text-white/50 text-xs tracking-[0.4em] uppercase hidden md:block"
        >
          Mova o cursor para explorar →
        </motion.p>
      </motion.div>

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
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// Card 3D individual com profundidade própria
function Card3D({
  card,
  mx,
  my,
  index,
}: {
  card: (typeof CARDS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
  index: number;
}) {
  // Quanto mais à frente (z mais alto), mais reage ao mouse
  const factor = card.parallax * 60;
  const offsetX = useTransform(mx, [-1, 1], [-factor, factor]);
  const offsetY = useTransform(my, [-1, 1], [-factor * 0.6, factor * 0.6]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotateY: card.rot * 3 }}
      animate={{ opacity: 1, scale: 1, rotateY: card.rot }}
      transition={{
        duration: 1.4,
        delay: 0.2 + index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.06,
        z: card.z + 80,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
      style={{
        position: "absolute",
        left: `calc(50% + ${card.x})`,
        top: `calc(50% + ${card.y})`,
        translateX: "-50%",
        translateY: "-50%",
        z: card.z,
        rotate: `${card.rot}deg`,
        x: offsetX,
        y: offsetY,
        width: card.w,
        height: card.h,
        transformStyle: "preserve-3d",
      }}
      className={`rounded-2xl overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] cursor-pointer pointer-events-auto group ${
        card.mobileHide ? "hidden sm:block" : ""
      }`}
    >
      {/* Ken-burns */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <Image
          src={card.photo.src}
          alt={card.photo.alt}
          fill
          priority={index === 0 || index === 4}
          sizes="(max-width: 768px) 50vw, 30vw"
          className="object-cover"
        />
      </motion.div>
      {/* Brilho na borda */}
      <div className="absolute inset-0 ring-1 ring-white/15 rounded-2xl pointer-events-none" />
      {/* Reflexo dourado no hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary-light/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}
