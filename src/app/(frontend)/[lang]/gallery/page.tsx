import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import { getDictionary, type Locale } from '../dictionaries'
import type { PayloadSponsor } from '@/types/cms'

export default async function GalleryPage({ params }: PageProps<'/[lang]/gallery'>) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  const payload = await getPayloadClient()

  const sponsorsResult = await payload.find({
    collection: 'sponsors',
    depth: 1,
    locale: lang,
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
        <Header lang={lang} dict={dict} />
      </div>
      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}