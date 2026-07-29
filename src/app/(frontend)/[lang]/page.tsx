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
import CompetitionsSection, {
  type Competition as CompetitionProp,
  type Category as CategoryProp,
} from "@/components/homepage/CompetitionsSection";
import { getPayloadClient } from "@/lib/fetchFromCMS";
import { formatDateEventRange } from "@/lib/formatDateEventRange";
import { getDictionary, type Locale } from "./dictionaries";
// Tipos escritos a mano — alternativa temporal mientras se resuelve el
// bug de `payload generate:types` en Windows (ver types/cms.ts para más
// contexto). Cuando el archivo autogenerado esté disponible, se reemplaza
// este import por el de "@/payload-types".
import type {
  PayloadJuryMember,
  PayloadSponsor,
  PayloadDateEvent,
  PayloadIntroduction,
  PayloadCompetition,
  PayloadCategory,
  PayloadVideo,
} from "@/types/cms";

const heroData = {
  imageUrl: "/banner.png",
};

const introSectionData = {
  imageUrl: "/banner.png",
};

const FALLBACK_VIDEO_BANNER_POSTER_URL = "https://picsum.photos/seed/visf-video/1600/700?grayscale";

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const payload = await getPayloadClient();

  type DateEventProp = {
    id: string;
    initialDate: string;
    endDate: string;
    city: string;
    country: string;
  };

  type IntroProp = {
    id: string;
    text: string;
  };

  // Independent queries — run in parallel instead of paying for 6 sequential
  // round trips to the DB on every request.
  const [juryResult, sponsorsResult, dateEventsResult, introResult, competitionsResult, categoriesResult, videoResult] =
    await Promise.all([
      payload.find({
        collection: "jury-members",
        depth: 1, // para que "photo" venga con la URL ya resuelta, no solo el ID
        sort: "createdAt",
        locale: lang,
      }),
      payload.find({
        collection: "sponsors",
        depth: 1,
        locale: lang,
      }),
      payload.find({
        collection: "date-event",
        sort: "initialDate",
        depth: 0,
        locale: lang,
      }),
      payload.find({
        collection: "introduction",
        limit: 1,
        depth: 0,
        locale: lang,
      }),
      payload.find({
        collection: "competition",
        depth: 0,
        limit: 0,
        locale: lang,
      }),
      payload.find({
        collection: "categories",
        depth: 0,
        limit: 0,
        locale: lang,
      }),
      payload.find({
        collection: "video",
        limit: 1,
        depth: 1, // resolves "thumbnail" to its media URL instead of just an ID
      }),
    ]);

  const juryData: JuryMemberProp[] = (
    juryResult.docs as PayloadJuryMember[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name ?? "",
    bio: doc.bio ?? "",
    photoUrl:
      typeof doc.photo === "object" && doc.photo?.url ? doc.photo.url : "",
  }));

  const sponsorsData: SponsorProp[] = (
    sponsorsResult.docs as PayloadSponsor[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl:
      typeof doc.logo === "object" && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }));

  const dateEventsData: DateEventProp[] = (
    dateEventsResult.docs as PayloadDateEvent[]
  ).map((doc) => ({
    id: String(doc.id),
    initialDate: doc.initialDate,
    endDate: doc.endDate,
    city: doc.city ?? "",
    country: doc.country,
  }));

  const dateEventDoc = dateEventsData[0];

  const introDoc = (introResult.docs as PayloadIntroduction[])[0];

  const introData: IntroProp = introDoc
    ? { id: String(introDoc.id), text: introDoc.text ?? "" }
    : { id: "", text: "" };

  const competitionsData: CompetitionProp[] = (
    competitionsResult.docs as PayloadCompetition[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name ?? "",
  }));

  const categoriesData: CategoryProp[] = (
    categoriesResult.docs as PayloadCategory[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name ?? "",
  }));

  const videoDoc = (videoResult.docs as PayloadVideo[])[0];
  const videoBannerUrl = videoDoc?.url ?? null;
  const videoBannerPosterUrl =
    typeof videoDoc?.thumbnail === "object" && videoDoc.thumbnail?.url
      ? videoDoc.thumbnail.url
      : FALLBACK_VIDEO_BANNER_POSTER_URL;

  return (
    <main className="bg-white">
      <section className="relative bg-neutral-950 text-white">
        {/*Navbar*/}
        <Header lang={lang} dict={dict} />
        {/*Hero Banner*/}
        <Hero imageUrl={heroData.imageUrl} dict={dict} />
      </section>

      <IntroSection
        lang={lang}
        dict={dict}
        imageUrl={introSectionData.imageUrl}
        dateLabel={
          dateEventDoc
            ? formatDateEventRange(dateEventDoc.initialDate, dateEventDoc.endDate)
            : ""
        }
        locationLabel={
          dateEventDoc ? dateEventDoc.city + ", " + dateEventDoc.country : ""
        }
        introText={introData.text}
      />

      <OfficialSelectionOnlineSessions
        lang={lang}
        dict={dict}
        officialSelectionImageUrl="/banner.png"
        onlineSessionsImageUrl="/banner.png"
      />

      <VideoBanner
        posterUrl={videoBannerPosterUrl}
        videoUrl={videoBannerUrl}
      />

      <JurySection members={juryData} dict={dict} />

      <CompetitionsSection
        competitions={competitionsData}
        categories={categoriesData}
        dict={dict}
      />

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  );
}
