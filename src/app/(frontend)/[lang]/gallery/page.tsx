import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import GalleryGrid, { type GalleryPhoto } from '@/components/gallery/GalleryGrid'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import { getDictionary, type Locale } from '../dictionaries'
import type { PayloadSponsor } from '@/types/cms'

// Placeholder until the gallery collection is wired up to this page.
const PLACEHOLDER_PHOTO_COUNT = 12

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

  const galleryPhotos: GalleryPhoto[] = Array.from({ length: PLACEHOLDER_PHOTO_COUNT }, (_, index) => ({
    id: String(index),
    url: '/banner.png',
    alt: dict.galleryPage.photoAlt,
  }))

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Header lang={lang} dict={dict} />

        <h1 className="font-visf-headline font-medium leading-none text-visf-accent text-4xl sm:text-5xl lg:text-[79px] px-4 sm:px-6 lg:px-[87px] pt-6 lg:pt-0">
          {dict.galleryPage.h1}
        </h1>

        <h2 className="font-visf-headline font-medium text-black text-2xl leading-snug sm:text-3xl sm:leading-normal lg:text-[44px] lg:leading-[63px] tracking-normal lg:tracking-[2px] px-4 sm:px-6 lg:px-[87px] mt-1 lg:mt-2">
          {dict.galleryPage.h2}
        </h2>

        <GalleryGrid photos={galleryPhotos} />
      </div>
      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}