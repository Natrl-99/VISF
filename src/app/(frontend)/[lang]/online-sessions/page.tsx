import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import BuyTicketsButton from '@/components/ui/BuyTicketsButton'
import { getPayloadClient } from '@/lib/fetchFromCMS'
import { getDictionary, type Locale } from '../dictionaries'
import type { PayloadSponsor, PayloadJoinURL } from '@/types/cms'

const CARD_CLASSNAME =
  'group relative w-full h-[280px] sm:h-[350px] lg:max-w-[648px] lg:h-[433px] rounded-visf-card overflow-hidden block'
const CAPTION_CLASSNAME =
  'absolute bottom-6 left-6 lg:bottom-8 lg:left-8 text-white text-2xl sm:text-3xl lg:text-[48px] font-medium leading-tight lg:leading-[49px]'

export default async function OfficialSelectionPage({ params }: PageProps<'/[lang]/online-sessions'>) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  const payload = await getPayloadClient()

  const [sponsorsResult, joinURLResult] = await Promise.all([
    payload.find({
      collection: 'sponsors',
      depth: 1,
      locale: lang,
    }),
    payload.find({
      collection: 'online-sessions-join-url',
      limit: 1,
      depth: 0,
    }),
  ])

  const joinScreeningUrl = (joinURLResult.docs as PayloadJoinURL[])[0]?.url

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

        <h1 className="font-visf-headline font-medium leading-none text-black text-4xl sm:text-5xl lg:text-[79px] px-4 sm:px-6 md:px-12 lg:px-[87px] pt-6 lg:pt-0">
          {dict.onlineSessionsPage.h1Line1}
          <br />
          <span className="text-visf-accent">{dict.onlineSessionsPage.h1Accent}</span>
        </h1>

        <section className="font-visf-headline px-4 sm:px-6 lg:px-[59px] pb-16 max-w-[1440px] mx-auto mt-8 lg:mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-[31px]">
            <Link href={`/${lang}/online-sessions-line-up`} className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/banner.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>
                {dict.onlineSessionsPage.lineUpCardLine1}
                <br />
                {dict.onlineSessionsPage.lineUpCardLine2}
                <br />
                {dict.onlineSessionsPage.lineUpCardLine3}
              </p>
            </Link>

            <BuyTicketsButton className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/banner.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>{dict.cta.tickets}</p>
            </BuyTicketsButton>

            <Link href={`/${lang}/online-screening-schedule`} className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/banner.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>
                {dict.onlineSessionsPage.screeningScheduleCardLine1}
                <br />
                {dict.onlineSessionsPage.screeningScheduleCardLine2}
              </p>
            </Link>

            <a
              href={joinScreeningUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={CARD_CLASSNAME}
            >
              <GrayscaleHoverImage
                src="/banner.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>
                {dict.onlineSessionsPage.joinScreeningCardLine1}
                <br />
                {dict.onlineSessionsPage.joinScreeningCardLine2}
              </p>
            </a>
          </div>
        </section>
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}
