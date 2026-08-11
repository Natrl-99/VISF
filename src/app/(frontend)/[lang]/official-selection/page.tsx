import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import BuyTicketsButton from '@/components/ui/BuyTicketsButton'
import TitleImage from '@/components/ui/TitleImage'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import { getDictionary, type Locale } from '../dictionaries'
import type { PayloadSponsor } from '@/types/cms'

const CARD_CLASSNAME =
  'group relative w-full h-[280px] sm:h-[350px] lg:max-w-[648px] lg:h-[433px] rounded-visf-card overflow-hidden block'
const CAPTION_CLASSNAME =
  'absolute bottom-6 left-6 lg:bottom-8 lg:left-8 text-white text-2xl sm:text-3xl lg:text-[48px] font-medium leading-tight lg:leading-[49px]'

export default async function OfficialSelectionPage({ params }: PageProps<'/[lang]/official-selection'>) {
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

        <h1 className="font-visf-headline font-medium leading-none px-4 sm:px-6 md:px-12 lg:px-[87px] pt-8 sm:pt-10 lg:pt-6">
          <div className="h-[72px] sm:h-[96px] lg:h-[150px] overflow-hidden">
            <TitleImage
              src={dict.officialSelectionPage.h1Image}
              alt={dict.officialSelectionPage.h1ImageAlt}
              width={12500}
              height={8334}
              className="h-[151px] sm:h-[202px] lg:h-[315px] w-auto block -mt-[45px] sm:-mt-[60px] lg:-mt-[93px]"
            />
          </div>
        </h1>

        <section className="font-visf-headline px-4 sm:px-6 lg:px-[59px] pb-16 max-w-[1440px] mx-auto mt-0 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-[31px]">
            <Link href={`/${lang}/short-films`} className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/OfficialSelection_ShortFilms.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>
                {dict.officialSelectionPage.shortFilmsCardLine1}
                <br />
                {dict.officialSelectionPage.shortFilmsCardLine2}
              </p>
            </Link>

            <BuyTicketsButton className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/OfficialSelection_Tickets.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>{dict.cta.tickets}</p>
            </BuyTicketsButton>

            <Link href={`/${lang}/screening-schedule`} className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/OfficialSelection_ScreeningSchedule.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>
                {dict.officialSelectionPage.screeningScheduleCardLine1}
                <br />
                {dict.officialSelectionPage.screeningScheduleCardLine2}
              </p>
            </Link>

            <Link href={`/${lang}/winners`} className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/OfficialSelection_Winners.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>{dict.officialSelectionPage.winnersCard}</p>
            </Link>
          </div>
        </section>
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}
