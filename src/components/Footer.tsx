"use client";

import Image from "next/image";
import { FiInstagram, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white/80 pt-20 pb-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Image
            src="/colly-logo.png"
            alt="Colly Eventos"
            width={160}
            height={48}
            className="h-11 w-auto brightness-0 invert opacity-95"
          />
          <p className="mt-6 max-w-sm text-white/65 leading-relaxed">
            Espaço de eventos clássico em Amparo–SP, criado para transformar
            sonhos em memórias inesquecíveis.
          </p>
          <p className="mt-8 font-script text-primary-light text-3xl leading-none">
            Seu sonho, nosso evento.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-semibold tracking-[0.2em] uppercase text-xs">
            Navegação
          </h4>
          <ul className="mt-5 space-y-3 text-white/70">
            <li>
              <a href="#tour" className="hover:text-primary-light transition">
                Tour 360º
              </a>
            </li>
            <li>
              <a
                href="#galeria"
                className="hover:text-primary-light transition"
              >
                Galeria
              </a>
            </li>
            <li>
              <a
                href="#diferenciais"
                className="hover:text-primary-light transition"
              >
                Diferenciais
              </a>
            </li>
            <li>
              <a
                href="#fundadora"
                className="hover:text-primary-light transition"
              >
                Idealizadora
              </a>
            </li>
            <li>
              <a
                href="#depoimentos"
                className="hover:text-primary-light transition"
              >
                Depoimentos
              </a>
            </li>
            <li>
              <a
                href="#agendar"
                className="hover:text-primary-light transition"
              >
                Agendar Visita
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-white font-semibold tracking-[0.2em] uppercase text-xs">
            Contato
          </h4>
          <ul className="mt-5 space-y-4 text-white/70">
            <li className="flex items-start gap-3">
              <FiMapPin className="text-primary-light mt-1" size={16} />
              <span>R. Odilon Monteiro, Estr. Mun. do Bairro dos Pereiras, s/n — Bairro das Pereiras, Amparo–SP, 13904-060</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="text-primary-light" size={16} />
              <a
                href="https://api.whatsapp.com/send?phone=5519996729770&text=Ol%C3%A1%20Colly,%20quero%20agendar%20uma%20reuni%C3%A3o%20para%20falar%20sobre%20o%20meu%20evento."
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary-light"
              >
                (19) 99672-9770
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="text-primary-light" size={16} />
              <a
                href="mailto:lucineia996729770@gmail.com"
                className="hover:text-primary-light"
              >
                lucineia996729770@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiInstagram className="text-primary-light" size={16} />
              <a
                href="https://instagram.com/collyeventos"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary-light"
              >
                @collyeventos
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-3 justify-between text-xs text-white/45">
        <p>© {new Date().getFullYear()} Colly Eventos. Todos os direitos reservados.</p>
        <p>Amparo–SP · CNPJ 26.209.953/0001-58</p>
      </div>
    </footer>
  );
}
