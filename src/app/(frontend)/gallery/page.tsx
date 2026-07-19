import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import type { PayloadSponsor } from '@/types/cms'

export default async function GalleryPage() {
  const payload = await getPayloadClient()

  const sponsorsResult = await payload.find({
    collection: 'sponsors',
    where: { isActive: { equals: true } },
    sort: 'order',
    depth: 1,
  })

  const sponsorsData: SponsorProp[] = (sponsorsResult.docs as PayloadSponsor[]).map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    logoUrl: typeof doc.logo === 'object' && doc.logo?.url ? doc.logo.url : null,
    websiteUrl: doc.websiteUrl,
  }))

  return (
    <main className="bg-white">
      <Header />
      <Footer sponsors={sponsorsData} />
    </main>
  )
}