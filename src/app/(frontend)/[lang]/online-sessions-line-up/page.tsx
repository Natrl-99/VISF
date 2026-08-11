import Header from "@/components/layout/Header";
import Footer, {
  type Sponsor as SponsorProp,
} from "@/components/layout/Footer";
import SectionIntroTextWide from "@/components/ui/SectionIntroTextWide";
import TitleImage from "@/components/ui/TitleImage";
import ProgramsSection, {
  type Program,
} from "@/components/short-films/ProgramsSection";
import { getPayloadClient } from "@/lib/fetchFromCMS";
import { formatEditionDateRange } from "@/lib/formatEditionDateRange";
import { getDictionary, type Locale } from "../dictionaries";
import type {
  PayloadSponsor,
  PayloadOnlineSessionsIntro,
  PayloadNextEdition,
  PayloadOnlineSessionsBlocks,
} from "@/types/cms";

export default async function OnlineSessionsLineUpPage({
  params,
}: PageProps<'/[lang]/online-sessions-line-up'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const payload = await getPayloadClient();

  const [sponsorsResult, nextEditionResult, introResult, blocksResult] = await Promise.all([
    payload.find({
      collection: "sponsors",
      depth: 1,
      locale: lang,
    }),
    payload.find({
      collection: "online-sessions-next-edition",
      limit: 1,
      depth: 0,
      locale: lang,
    }),
    payload.find({
      collection: "online-sessions-intro",
      limit: 1,
      depth: 0,
      locale: lang,
    }),
    payload.find({
      collection: "online-sessions-blocks",
      depth: 0,
      limit: 0,
      sort: "createdAt",
      locale: lang,
    }),
  ]);

  const sponsorsData: SponsorProp[] = (
    sponsorsResult.docs as PayloadSponsor[]
  ).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl:
      typeof doc.logo === "object" && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }));

  const nextEditionDoc = (nextEditionResult.docs as PayloadNextEdition[])[0];
  const nextEditionLabel = nextEditionDoc
    ? formatEditionDateRange(nextEditionDoc.initialDate, nextEditionDoc.endDate)
    : "";

  const introDoc = (introResult.docs as PayloadOnlineSessionsIntro[])[0];
  const introText = introDoc?.text ?? "";

  const programsData: Program[] = (
    blocksResult.docs as PayloadOnlineSessionsBlocks[]
  ).map((block) => ({
    id: String(block.id),
    label: block.name,
    intro: block.intro ?? "",
    films: block.movies.map((movie) => ({
      id: String(movie.id),
      title: movie.title ?? "",
      director: movie.director ?? "",
      country: movie.country ?? "",
      duration: movie.duration,
      description: movie.description ?? "",
    })),
  }));

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Header lang={lang} dict={dict} />

        <h1 className="font-visf-headline font-medium leading-none px-4 sm:px-6 md:px-12 lg:px-[87px] pt-8 sm:pt-10 lg:pt-6">
          <div className="h-[108px] sm:h-[144px] lg:h-[225px] overflow-hidden">
            <TitleImage
              src={dict.onlineSessionsLineUpPage.h1Image}
              alt={dict.onlineSessionsLineUpPage.h1ImageAlt}
              width={12500}
              height={8334}
              className="h-[193px] sm:h-[257px] lg:h-[402px] w-auto block -mt-[49px] sm:-mt-[66px] lg:-mt-[103px]"
              loading="eager"
            />
          </div>
        </h1>

        <p className="font-visf-headline font-extralight text-black text-2xl sm:text-3xl lg:text-[48px] leading-tight lg:leading-[49px] px-4 sm:px-6 md:px-12 lg:px-[87px] mt-6 lg:mt-14 max-w-sm lg:max-w-[745px]">
          {dict.common.nextEdition}
          <br />
          {nextEditionLabel}
        </p>

        <p className="font-visf-headline font-medium text-sm leading-snug sm:text-base sm:leading-normal lg:text-[25px] lg:leading-[29px] whitespace-nowrap px-4 sm:px-6 md:px-12 lg:px-[87px] mt-6 lg:mt-14">
          {dict.common.intro}
        </p>

        <SectionIntroTextWide
          text={introText}
          className="px-4 sm:px-6 md:px-12 lg:px-[87px] mt-4 lg:mt-6 w-full lg:w-[1200px] lg:h-[188px] text-sm sm:text-base lg:text-[25px]"
        />

        <ProgramsSection programs={programsData} showPoster={false} />
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  );
}
