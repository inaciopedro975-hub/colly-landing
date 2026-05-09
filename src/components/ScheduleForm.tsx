"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { photos } from "@/lib/photos";
import SectionHeading from "./SectionHeading";

const WA_LINK =
  "https://api.whatsapp.com/send?phone=5519996729770&text=Ol%C3%A1%20Colly,%20quero%20agendar%20uma%20reuni%C3%A3o%20para%20falar%20sobre%20o%20meu%20evento.";

export default function ScheduleForm() {
  return (
    <section
      id="agendar"
      className="relative py-28 md:py-36 bg-white overflow-hidden"
    >
      {/* Imagem decorativa lateral */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
        <Image
          src={photos[8].src}
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-start lg:max-w-2xl">
        <SectionHeading
          eyebrow="Agende sua visita"
          title="Venha conhecer o nosso espaço."
          subtitle="A melhor forma de imaginar o seu evento aqui é caminhar pelo espaço. Entre em contato pelo WhatsApp — respondemos rapidinho."
          align="left"
        />

        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="mt-12 inline-flex items-center gap-4 px-10 py-5 rounded-full bg-[#25D366] text-white font-semibold text-lg tracking-wide shadow-[0_14px_40px_-8px_rgba(37,211,102,0.5)] hover:shadow-[0_20px_50px_-8px_rgba(37,211,102,0.65)] transition-all"
        >
          <FaWhatsapp size={26} />
          Falar pelo WhatsApp
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-5 text-sm text-muted"
        >
          Sem formulários. Resposta em até 24h.
        </motion.p>
      </div>
    </section>
  );
}
