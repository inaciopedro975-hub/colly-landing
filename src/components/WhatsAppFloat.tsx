"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://api.whatsapp.com/send?phone=5519996729770&text=Ol%C3%A1%20Colly,%20quero%20agendar%20uma%20reuni%C3%A3o%20para%20falar%20sobre%20o%20meu%20evento."
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_14px_40px_-8px_rgba(37,211,102,0.6)]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <FaWhatsapp size={28} className="relative" />
    </motion.a>
  );
}
