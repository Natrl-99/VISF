import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import WinnersSection, { type WinnersYear } from '@/components/winners/WinnersSection'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import { getDictionary, type Locale } from '../dictionaries'
import type { PayloadSponsor, PayloadWinnersYear } from '@/types/cms'

export default async function WinnersPage({ params }: PageProps<'/[lang]/winners'>) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  const payload = await getPayloadClient()

  const [sponsorsResult, winnersResult] = await Promise.all([
    payload.find({
      collection: 'sponsors',
      depth: 1,
      locale: lang,
    }),
    payload.find({
      collection: 'winners',
      depth: 1,
      sort: '-year',
      limit: 4,
      locale: lang,
    }),
  ])

  const sponsorsData: SponsorProp[] = (sponsorsResult.docs as PayloadSponsor[]).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl: typeof doc.logo === 'object' && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }))

  const winnersData: WinnersYear[] = (winnersResult.docs as PayloadWinnersYear[]).map((doc) => ({
    id: String(doc.id),
    year: doc.year,
    awards: doc.awards.map((award) => ({
      id: String(award.id),
      category: typeof award.category === 'object' ? award.category.name : award.category,
      movieTitle: award.movieTitle,
      director: award.director,
      country: award.country,
    })),
  }))

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Header lang={lang} dict={dict} />

        <h1 className="font-visf-headline font-medium leading-none text-black text-4xl sm:text-5xl lg:text-[79px] px-4 sm:px-6 md:px-12 lg:px-[87px] pt-6 lg:pt-0">
          {dict.winnersPage.titleLine1}
          <br />
          <span className="text-visf-accent">{dict.winnersPage.titleAccent}</span>
        </h1>

        <WinnersSection years={winnersData} />
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}
