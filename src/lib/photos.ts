// 27 fotos otimizadas em /public/galeria/foto-01.webp..foto-27.webp
import { blurData } from "./blurData";

export const TOTAL_PHOTOS = 27;

export const photos = Array.from({ length: TOTAL_PHOTOS }, (_, i) => {
  const slug = `foto-${String(i + 1).padStart(2, "0")}`;
  const key = `foto_${String(i + 1).padStart(2, "0")}`;
  return {
    src: `/galeria/${slug}.webp`,
    blurDataURL: blurData[key] ?? "",
    alt: `Colly Eventos - ambiente ${i + 1}`,
  };
});

// Hero: 4 fotos enviadas pela cliente — piscina noite, mesa rústica c/ arco,
// mesa redonda terraço e vaso de flores em close.
export const HERO_PHOTOS = [
  { ...photos[0], alt: "Piscina e salão da Colly Eventos à noite" },
  { ...photos[6], alt: "Mesa rústica com arco floral em tons quentes" },
  { ...photos[23], alt: "Mesa redonda no terraço com vista para a mata" },
  { ...photos[25], alt: "Detalhe floral em mesa decorada" },
];

// Foto da fundadora
export const FOUNDER_PHOTO = {
  ...photos[1],
  alt: "Idealizadora do Colly Eventos",
};

// Tour 360 — 5 fotos selecionadas pela cliente para o tour imersivo
export const TOUR_360_PHOTOS = [
  photos[26], // foto-27 — cerimônia ao ar livre com guirlanda verde
  photos[23], // foto-24 — mesa redonda terraço (vista mata)
  photos[5],  // foto-06 — decoração teto verde + flores laranja
  photos[11], // foto-12 — mesa de bolo à noite (parede verde)
  photos[16], // foto-17 — mesas redondas terraço (entre flores)
];

// Galeria unificada — todas as fotos exceto a fundadora
export const GALLERY_PHOTOS = photos.filter((_, i) => i !== 1);

// Galeria mobile — 18 fotos: mantém todas usadas em outras seções
// (Hero, Tour360, Diferenciais, TheMoment) + 5 fotos exclusivas da galeria
// Remove somente fotos exclusivas de galeria: índices 10,13,15,17,18,20,22,24
export const GALLERY_PHOTOS_MOBILE = photos.filter(
  (_, i) => ![1, 10, 13, 15, 17, 18, 20, 22, 24].includes(i)
);
