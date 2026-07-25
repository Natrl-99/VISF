import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import SectionIntroTextWide from '@/components/ui/SectionIntroTextWide'
import ProgramsSection from '@/components/short-films/ProgramsSection'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import type { PayloadSponsor } from '@/types/cms'

const INTRO_TEXT = `We are proud to present the official lineup for this year's edition.

Featuring internationally acclaimed designers, creative directors, innovators, and industry leaders, the program brings together some of the most influential voices shaping the future of creativity. Across a series of keynote talks, live conversations, and exclusive sessions, each speaker will share their vision, process, and experience—offering fresh perspectives, meaningful dialogue, and inspiration for the global creative community.`

export default async function ShortFilmsPage() {
  const payload = await getPayloadClient()

  const sponsorsResult = await payload.find({
    collection: 'sponsors',
    depth: 1,
  })

  const sponsorsData: SponsorProp[] = (sponsorsResult.docs as PayloadSponsor[]).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl: typeof doc.logo === 'object' && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }))

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
          MAY 12-17 2027
        </p>

        <p className="font-visf-headline font-medium text-sm leading-snug sm:text-base sm:leading-normal lg:text-[25px] lg:leading-[29px] whitespace-nowrap px-4 sm:px-6 lg:px-[87px] mt-6 lg:mt-14">
          INTRO
        </p>

        <SectionIntroTextWide
          text={INTRO_TEXT}
          className="px-4 sm:px-6 lg:px-[87px] mt-4 lg:mt-6 w-full lg:w-[1200px] lg:h-[188px] text-sm sm:text-base lg:text-[25px]"
        />

        <ProgramsSection showPoster={false} />
      </div>

      <Footer sponsors={sponsorsData} />
    </main>
  )
}
