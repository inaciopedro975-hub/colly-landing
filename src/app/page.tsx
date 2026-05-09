import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Tour360 from "@/components/Tour360";
import Gallery from "@/components/Gallery";
import TheMoment from "@/components/TheMoment";
import Differentials from "@/components/Differentials";
import Founder from "@/components/Founder";
import Testimonials from "@/components/Testimonials";
import ScheduleForm from "@/components/ScheduleForm";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tour360 />
        <Gallery />
        <TheMoment />
        <Differentials />
        <Founder />
        <Testimonials />
        <ScheduleForm />
      </main>
      <Footer />
      <WhatsAppFloat />

      {/* Schema.org JSON-LD para SEO local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventVenue",
            name: "Colly Eventos",
            description:
              "Espaço de eventos clássico em Amparo–SP especializado em casamentos e debutantes.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "R. Odilon Monteiro, Estr. Mun. do Bairro dos Pereiras, s/n",
              addressLocality: "Amparo",
              addressRegion: "SP",
              postalCode: "13904-060",
              addressCountry: "BR",
            },
            telephone: "+55-19-99672-9770",
            url: "https://collyeventos.com.br",
            image: "https://collyeventos.com.br/galeria/foto-01.webp",
            slogan: "Seu sonho, nosso evento.",
          }),
        }}
      />
    </>
  );
}
