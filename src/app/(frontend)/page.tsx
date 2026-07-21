import Header from "@/components/layout/Header";
import Footer, {
  type Sponsor as SponsorProp,
} from "@/components/layout/Footer";
import Hero from "@/components/homepage/Hero";
import IntroSection from "@/components/homepage/IntroSection";
import OfficialSelectionOnlineSessions from "@/components/homepage/OfficialSelectionOnlineSessions";
import VideoBanner from "@/components/homepage/VideoBanner";
import JurySection, {
  type JuryMember as JuryMemberProp,
} from "@/components/homepage/JurySection";
import CompetitionsSection from "@/components/homepage/CompetitionsSection";
import { getPayloadClient } from "@/lib/fetchFromCMS";
// Tipos escritos a mano — alternativa temporal mientras se resuelve el
// bug de `payload generate:types` en Windows (ver types/cms.ts para más
// contexto). Cuando el archivo autogenerado esté disponible, se reemplaza
// este import por el de "@/payload-types".
import type {
  PayloadJuryMember,
  PayloadSponsor,
  PayloadDateEvent,
  PayloadIntroduction,
} from "@/types/cms";

const heroData = {
  imageUrl: "/banner.png",
};

const introSectionData = {
  imageUrl: "/banner.png",
};

const videoBannerData = {
  headline: "SUBMIT YOUR FILM NOW",
  posterUrl: "https://picsum.photos/seed/visf-video/1600/700?grayscale",
  videoUrl: null as string | null,
};

export default async function HomePage() {
  const payload = await getPayloadClient();

  // --- Jurado real ---
  const juryResult = await payload.find({
    collection: "jury-members",
    depth: 1, // para que "photo" venga con la URL ya resuelta, no solo el ID
  });

  const juryData: JuryMemberProp[] = (
    juryResult.docs as PayloadJuryMember[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    bio: doc.bio,
    photoUrl:
      typeof doc.photo === "object" && doc.photo?.url ? doc.photo.url : "",
  }));

  // --- Patrocinadores reales, solo los activos, ordenados ---
  const sponsorsResult = await payload.find({
    collection: "sponsors",
    where: { isActive: { equals: true } },
    sort: "order",
    depth: 1,
  });

  const sponsorsData: SponsorProp[] = (
    sponsorsResult.docs as PayloadSponsor[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl:
      typeof doc.logo === "object" && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }));

  // --- Próximas fechas de evento, ordenadas por fecha inicial ---
  type DateEventProp = {
    id: string;
    name: string;
    initialDate: Date;
    endDate: Date;
    city: string;
    country: string;
  };

  const dateEventsResult = await payload.find({
    collection: "date-event",
    sort: "initialDate",
    depth: 0,
  });

  const dateEventsData: DateEventProp[] = (
    dateEventsResult.docs as PayloadDateEvent[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    initialDate: new Date(doc.initialDate),
    endDate: new Date(doc.endDate),
    city: doc.city,
    country: doc.country,
  }));

  // ---- Introducción del festival (texto) ----
  type IntroProp = {
    id: string;
    text: string;
  };

  const introResult = await payload.find({
    collection: "introduction",
    limit: 1,
    depth: 0,
  });

  const introDoc = (introResult.docs as PayloadIntroduction[])[0];

  const introData: IntroProp = introDoc
    ? { id: String(introDoc.id), text: introDoc.text }
    : { id: "", text: "" };

  return (
    <main className="bg-white">
      <section className="relative bg-neutral-950 text-white">
        {/*Navbar*/}
        <Header />
        {/*Hero Banner*/}
        <Hero imageUrl={heroData.imageUrl} sponsors={sponsorsData} />
      </section>

      <IntroSection
        imageUrl={introSectionData.imageUrl}
        dateLabel={
          dateEventsData[0].initialDate.getDate() +
          "-" +
          dateEventsData[0].endDate.getDate() +
          " " +
          dateEventsData[0].endDate.toLocaleString("default", {
            month: "short",
          }) +
          ", " +
          dateEventsData[0].endDate.getFullYear()
        }
        locationLabel={
          dateEventsData[0].city + ", " + dateEventsData[0].country
        }
        introText={introData.text}
      />

      <OfficialSelectionOnlineSessions
        officialSelectionImageUrl="/banner.png"
        onlineSessionsImageUrl="/banner.png"
      />

      <VideoBanner
        headline={videoBannerData.headline}
        posterUrl={videoBannerData.posterUrl}
        videoUrl={videoBannerData.videoUrl}
      />

      <JurySection members={juryData} />

      <CompetitionsSection />

      <Footer sponsors={sponsorsData} />
    </main>
  );
}
