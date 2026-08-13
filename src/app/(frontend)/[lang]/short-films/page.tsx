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
  PayloadShortFilmsIntro,
  PayloadShortFilmsNextEdition,
  PayloadShortFilmsBlocks,
} from "@/types/cms";

export default async function ShortFilmsPage({ params }: PageProps<'/[lang]/short-films'>) {
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
      collection: "short-films-next-edition",
      limit: 1,
      depth: 0,
      locale: lang,
    }),
    payload.find({
      collection: "short-films-intro",
      limit: 1,
      depth: 0,
      locale: lang,
    }),
    payload.find({
      collection: "short-films-blocks",
      depth: 1,
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

  const nextEditionDoc = (
    nextEditionResult.docs as PayloadShortFilmsNextEdition[]
  )[0];
  const nextEditionLabel = nextEditionDoc
    ? formatEditionDateRange(nextEditionDoc.initialDate, nextEditionDoc.endDate)
    : "";

  const introDoc = (introResult.docs as PayloadShortFilmsIntro[])[0];
  const introText = introDoc?.text ?? "";

  const programsData: Program[] = (
    blocksResult.docs as PayloadShortFilmsBlocks[]
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
      posterUrl:
        typeof movie.poster === "object" && movie.poster?.url
          ? movie.poster.url
          : null,
    })),
  }));

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Header lang={lang} dict={dict} />

        <h1 className="font-visf-headline font-medium leading-none px-4 sm:px-6 md:px-12 lg:px-[87px] pt-8 sm:pt-10 lg:pt-6">
          <div className="h-[72px] sm:h-[96px] lg:h-[150px] overflow-hidden">
            <TitleImage
              src={dict.shortFilmsPage.h1Image}
              alt={dict.shortFilmsPage.h1ImageAlt}
              width={3000}
              height={2000}
              className="h-[180px] sm:h-[241px] lg:h-[378px] w-auto block -mt-[62px] sm:-mt-[83px] lg:-mt-[131px] -ml-[44px] sm:-ml-[58px] lg:-ml-[92px]"
              loading="eager"
            />
          </div>
        </h1>

        <p className="font-visf-headline font-extralight text-black text-2xl sm:text-3xl lg:text-[48px] leading-tight lg:leading-[49px] px-4 sm:px-6 md:px-12 lg:px-[87px] mt-4 lg:mt-8 max-w-sm lg:max-w-[745px]">
          {dict.common.nextEdition}
          <br />
          {nextEditionLabel}
        </p>

        <p className="font-visf-headline font-medium text-sm leading-snug sm:text-base sm:leading-normal lg:text-[25px] lg:leading-[29px] whitespace-nowrap px-4 sm:px-6 md:px-12 lg:px-[87px] mt-6 lg:mt-14">
          {dict.common.intro}
        </p>

        <SectionIntroTextWide
          text={introText}
          className="px-4 sm:px-6 md:px-12 lg:px-[87px] mt-4 lg:mt-6 w-full lg:w-[1200px] text-sm sm:text-base lg:text-[25px]"
        />

        <ProgramsSection programs={programsData} />
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  );
}
