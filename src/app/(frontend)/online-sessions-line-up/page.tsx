import Header from "@/components/layout/Header";
import Footer, {
  type Sponsor as SponsorProp,
} from "@/components/layout/Footer";
import SectionIntroTextWide from "@/components/ui/SectionIntroTextWide";
import ProgramsSection, {
  type Program,
} from "@/components/short-films/ProgramsSection";
import { getPayloadClient } from "@/lib/fetchFromCMS";
import { formatEditionDateRange } from "@/lib/formatEditionDateRange";
import type {
  PayloadSponsor,
  PayloadOnlineSessionsIntro,
  PayloadNextEdition,
  PayloadOnlineSessionsBlocks,
} from "@/types/cms";

export default async function OnlineSessionsLineUpPage() {
  const payload = await getPayloadClient();

  const sponsorsResult = await payload.find({
    collection: "sponsors",
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

  const nextEditionResult = await payload.find({
    collection: "online-sessions-next-edition",
    limit: 1,
    depth: 0,
  });

  const nextEditionDoc = (nextEditionResult.docs as PayloadNextEdition[])[0];
  const nextEditionLabel = nextEditionDoc
    ? formatEditionDateRange(nextEditionDoc.initialDate, nextEditionDoc.endDate)
    : "";

  const introResult = await payload.find({
    collection: "online-sessions-intro",
    limit: 1,
    depth: 0,
  });

  const introDoc = (introResult.docs as PayloadOnlineSessionsIntro[])[0];
  const introText = introDoc?.text ?? "";

  const blocksResult = await payload.find({
    collection: "online-sessions-blocks",
    depth: 0,
    limit: 0,
  });

  const programsData: Program[] = (
    blocksResult.docs as PayloadOnlineSessionsBlocks[]
  ).map((block) => ({
    id: String(block.id),
    label: block.name,
    intro: block.intro,
    films: block.movies.map((movie) => ({
      id: String(movie.id),
      title: movie.title,
      director: movie.director,
      country: movie.country,
      duration: movie.duration,
      description: movie.description,
    })),
  }));

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Header />

        <h1 className="font-visf-headline font-medium leading-none text-black text-4xl sm:text-5xl lg:text-[79px] px-4 sm:px-6 lg:px-[87px] pt-6 lg:pt-0">
          ONLINE
          <br />
          SESSIONS
          <br />
          <span className="text-visf-accent">LINE UP</span>
        </h1>

        <p className="font-visf-headline font-extralight text-black text-2xl sm:text-3xl lg:text-[48px] leading-tight lg:leading-[49px] px-4 sm:px-6 lg:px-[87px] mt-6 lg:mt-14 max-w-sm lg:max-w-[745px]">
          NEXT EDITION
          <br />
          {nextEditionLabel}
        </p>

        <p className="font-visf-headline font-medium text-sm leading-snug sm:text-base sm:leading-normal lg:text-[25px] lg:leading-[29px] whitespace-nowrap px-4 sm:px-6 lg:px-[87px] mt-6 lg:mt-14">
          INTRO
        </p>

        <SectionIntroTextWide
          text={introText}
          className="px-4 sm:px-6 lg:px-[87px] mt-4 lg:mt-6 w-full lg:w-[1200px] lg:h-[188px] text-sm sm:text-base lg:text-[25px]"
        />

        <ProgramsSection programs={programsData} showPoster={false} />
      </div>

      <Footer sponsors={sponsorsData} />
    </main>
  );
}
