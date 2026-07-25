import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import WinnersSection, { type WinnersYear } from '@/components/winners/WinnersSection'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import type { PayloadSponsor, PayloadWinnersYear } from '@/types/cms'

export default async function WinnersPage() {
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

  const winnersResult = await payload.find({
    collection: 'winners',
    depth: 1,
    sort: '-year',
    limit: 4,
  })

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
        <Header />

        <h1 className="font-visf-headline font-medium leading-none text-black text-4xl sm:text-5xl lg:text-[79px] px-4 sm:px-6 lg:px-[87px] pt-6 lg:pt-0">
          LIST OF
          <br />
          <span className="text-visf-accent">WINNERS</span>
        </h1>

        <WinnersSection years={winnersData} />
      </div>

      <Footer sponsors={sponsorsData} />
    </main>
  )
}
