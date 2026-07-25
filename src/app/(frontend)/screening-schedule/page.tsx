import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import ScreeningBlock from '@/components/screening-schedule/ScreeningBlock'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import type { PayloadSponsor } from '@/types/cms'

export default async function ScreeningSchedulePage() {
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
          SCREENING
          <br />
          <span className="text-visf-accent">SCHEDULE</span>
        </h1>

        <p className="font-visf-headline font-extralight text-black text-2xl sm:text-3xl lg:text-[48px] leading-tight lg:leading-[49px] px-4 sm:px-6 lg:px-[87px] mt-6 lg:mt-14 max-w-sm lg:max-w-[745px]">
          Our upcoming LIVE EVENT will take place in November 2026, at the Cinema in Verona
        </p>

        <section className="mt-8 lg:mt-14 pb-8 lg:pb-14 flex flex-col gap-8 lg:gap-10">
          <ScreeningBlock
            chapterLabel="Chapter 1"
            blockName="Innocence"
            date="12 july"
            time="11:30"
            movies={[
              'The Spectacle',
              'Attock',
              'Baby Boy',
              'Shutterspeed',
              'Bird Boy',
              'Hometime',
              'Mania',
              'Polliwog',
              'Bench',
              'Waiting To Be Picked Up',
            ]}
          />

          <ScreeningBlock
            chapterLabel="Chapter 2"
            blockName="Bravery"
            date="28 july"
            time="14:45"
            movies={[
              'J.J',
              'Marta',
              'Rester',
              'I Felt I Had To Be Here',
              'Horizon',
              'Those Who Move',
              'In The Box',
              'Monsieur Figaro',
            ]}
          />
        </section>
      </div>

      <Footer sponsors={sponsorsData} />
    </main>
  )
}
