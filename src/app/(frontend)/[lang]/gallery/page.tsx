import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import GalleryGrid, { type GalleryPhoto } from '@/components/gallery/GalleryGrid'
import TitleImage from '@/components/ui/TitleImage'
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
    url: '/homepage/Homepage_Banner.jpg',
    alt: dict.galleryPage.photoAlt,
  }))

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <div className="flex-1">
        <Header lang={lang} dict={dict} />

        <h1 className="font-visf-headline font-medium leading-none text-visf-accent px-4 sm:px-6 md:px-12 lg:px-[87px] pt-8 sm:pt-10 lg:pt-6">
          <div className="h-[36px] sm:h-[48px] lg:h-[79px] overflow-hidden">
            <TitleImage
              src={dict.galleryPage.h1Image}
              alt={dict.galleryPage.h1ImageAlt}
              width={1389}
              height={283}
              className={
                lang === 'it'
                  ? 'h-[191px] sm:h-[258px] lg:h-[424px] w-auto block -mt-[80px] sm:-mt-[108px] lg:-mt-[176px] -ml-[4px] sm:-ml-[7px] lg:-ml-[11px]'
                  : 'h-[37px] sm:h-[50px] lg:h-[82px] w-auto block -mt-[3px] sm:-mt-[4px] lg:-mt-[6px] -ml-[8px] sm:-ml-[11px] lg:-ml-[19px]'
              }
              loading="eager"
            />
          </div>
        </h1>

        <h2 className="font-visf-headline font-medium text-black text-2xl leading-snug sm:text-3xl sm:leading-normal lg:text-[44px] lg:leading-[63px] tracking-normal lg:tracking-[2px] px-4 sm:px-6 md:px-12 lg:px-[87px] mt-0 lg:mt-0.5">
          {dict.galleryPage.h2}
        </h2>

        <GalleryGrid photos={galleryPhotos} />
      </div>
      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}