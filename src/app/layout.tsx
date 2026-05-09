import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#d48226",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://collyeventos.com.br"),
  title: {
    default: "Colly Eventos — Espaço de Eventos Clássico em Amparo-SP",
    template: "%s | Colly Eventos",
  },
  description:
    "Casamentos e debutantes em meio à natureza. Espaço sofisticado em Amparo-SP. Seu sonho, nosso evento. Agende uma visita.",
  keywords: [
    "espaço de eventos Amparo",
    "casamento Amparo SP",
    "festa de 15 anos Amparo",
    "buffet em Amparo",
    "casa de eventos com natureza",
    "Colly Eventos",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://collyeventos.com.br",
    title: "Colly Eventos — Seu sonho, nosso evento",
    description:
      "Espaço clássico em Amparo-SP rodeado pela natureza. Casamentos, debutantes e eventos sofisticados.",
    siteName: "Colly Eventos",
    images: [
      { url: "/galeria/foto-01.webp", width: 1200, height: 630, alt: "Colly Eventos" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colly Eventos — Seu sonho, nosso evento",
    description: "Casamentos e debutantes em Amparo-SP, em meio à natureza.",
    images: ["/galeria/foto-01.webp"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable} ${pinyon.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
