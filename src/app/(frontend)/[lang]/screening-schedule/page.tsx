import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import ScreeningBlock from '@/components/screening-schedule/ScreeningBlock'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import { getDictionary, type Locale } from '../dictionaries'
import type { PayloadSponsor, PayloadScreeningIntro, PayloadScreeningBlock } from '@/types/cms'

// screening-blocks stores "date" and "time" as full ISO datetime strings
// (Payload's day-only/time-only pickers only affect admin UI, not storage),
// so they need reformatting into the short display form used on the card.
function formatBlockDate(iso: string): string {
  const date = new Date(iso)
  return `${date.getUTCDate()} ${date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }).toLowerCase()}`
}

function formatBlockTime(iso: string): string {
  const date = new Date(iso)
  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`
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

        <h1 className="font-visf-headline font-medium leading-none text-black text-4xl sm:text-5xl lg:text-[79px] px-4 sm:px-6 lg:px-[87px] pt-6 lg:pt-0">
          {dict.screeningSchedulePage.h1Line1}
          <br />
          <span className="text-visf-accent">{dict.screeningSchedulePage.h1Accent}</span>
        </h1>

        <p className="font-visf-headline font-extralight text-black text-2xl sm:text-3xl lg:text-[48px] leading-tight lg:leading-[49px] px-4 sm:px-6 lg:px-[87px] mt-6 lg:mt-14 max-w-sm lg:max-w-[745px]">
          {introText}
        </p>

        <section className="mt-8 lg:mt-14 pb-8 lg:pb-14 flex flex-col gap-8 lg:gap-10">
          {blocksData.map((block) => (
            <ScreeningBlock
              key={block.id}
              chapterLabel={block.name}
              blockName={block.title}
              date={formatBlockDate(block.date)}
              time={formatBlockTime(block.time)}
              movies={block.movies.map((movie) => movie.title)}
            />
          ))}
        </section>
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}
