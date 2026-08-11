import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import ScreeningBlock from '@/components/screening-schedule/ScreeningBlock'
import TitleImage from '@/components/ui/TitleImage'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import { getDictionary, type Locale } from '../dictionaries'
import type { PayloadSponsor, PayloadScreeningIntro, PayloadScreeningBlock } from '@/types/cms'

// screening-blocks stores "date" as a full ISO datetime string
// (Payload's day-only picker only affects admin UI, not storage),
// so it needs reformatting into the short display form used on the card.
// "time" is stored as free text and is displayed as entered.
function formatBlockDate(iso: string): string {
  const date = new Date(iso)
  return `${date.getUTCDate()} ${date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }).toLowerCase()}`
}

export default async function ScreeningSchedulePage({ params }: PageProps<'/[lang]/screening-schedule'>) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  const payload = await getPayloadClient()

  const [sponsorsResult, introResult, blocksResult] = await Promise.all([
    payload.find({
      collection: 'sponsors',
      depth: 1,
      locale: lang,
    }),
    payload.find({
      collection: 'screening-intro',
      limit: 1,
      depth: 0,
      locale: lang,
    }),
    payload.find({
      collection: 'screening-blocks',
      sort: 'date',
      depth: 0,
      limit: 0,
      locale: lang,
    }),
  ])

  const sponsorsData: SponsorProp[] = (sponsorsResult.docs as PayloadSponsor[]).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl: typeof doc.logo === 'object' && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }))

  const introDoc = (introResult.docs as PayloadScreeningIntro[])[0]
  const introText = introDoc?.text ?? ''

  const blocksData = blocksResult.docs as PayloadScreeningBlock[]

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Header lang={lang} dict={dict} />

        <h1 className="font-visf-headline font-medium leading-none px-4 sm:px-6 md:px-12 lg:px-[87px] pt-8 sm:pt-10 lg:pt-6">
          <div className="h-[72px] sm:h-[96px] lg:h-[150px] overflow-hidden">
            <TitleImage
              src={dict.screeningSchedulePage.h1Image}
              alt={dict.screeningSchedulePage.h1ImageAlt}
              width={12500}
              height={8334}
              className="h-[163px] sm:h-[217px] lg:h-[339px] w-auto block -mt-[56px] sm:-mt-[75px] lg:-mt-[117px]"
              loading="eager"
            />
          </div>
        </h1>

        <p className="font-visf-headline font-extralight text-black text-2xl sm:text-3xl lg:text-[48px] leading-tight lg:leading-[49px] px-4 sm:px-6 md:px-12 lg:px-[87px] mt-0 lg:mt-0 max-w-sm lg:max-w-[745px]">
          {introText}
        </p>

        <section className="mt-8 lg:mt-14 pb-8 lg:pb-14 flex flex-col gap-8 lg:gap-10">
          {blocksData.map((block) => (
            <ScreeningBlock
              key={block.id}
              chapterLabel={block.name}
              blockName={block.title}
              date={formatBlockDate(block.date)}
              time={block.time}
              movies={block.movies.map((movie) => movie.title)}
            />
          ))}
        </section>
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}
