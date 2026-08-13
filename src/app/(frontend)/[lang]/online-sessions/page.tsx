import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer, { type Sponsor as SponsorProp } from '@/components/layout/Footer'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import BuyTicketsButton from '@/components/ui/BuyTicketsButton'
import TitleImage from '@/components/ui/TitleImage'
import JoinScreeningCard from '@/components/online-sessions/JoinScreeningCard'
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

        <h1 className="font-visf-headline font-medium leading-none px-4 sm:px-6 md:px-12 lg:px-[87px] pt-8 sm:pt-10 lg:pt-6">
          <div className="h-[72px] sm:h-[96px] lg:h-[150px] overflow-hidden">
            <TitleImage
              src={dict.onlineSessionsPage.h1Image}
              alt={dict.onlineSessionsPage.h1ImageAlt}
              width={12500}
              height={8334}
              className="h-[161px] sm:h-[216px] lg:h-[338px] w-auto block -mt-[53px] sm:-mt-[72px] lg:-mt-[112px]"
              loading="eager"
            />
          </div>
        </h1>

        <section className="font-visf-headline px-4 sm:px-6 lg:px-[59px] pb-16 max-w-[1440px] mx-auto mt-0 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-[31px]">
            <Link href={`/${lang}/online-sessions-line-up`} className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/online-sessions/OnlineSessions_LineUp.jpg"
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
                src="/online-sessions/OnlineSessions_Tickets.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
              <p className={CAPTION_CLASSNAME}>{dict.cta.tickets}</p>
            </BuyTicketsButton>

            <Link href={`/${lang}/online-screening-schedule`} className={CARD_CLASSNAME}>
              <GrayscaleHoverImage
                src="/online-sessions/OnlineSessions_ScreeningSchedule.jpg"
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

            <JoinScreeningCard
              url={joinScreeningUrl ?? null}
              imageUrl="/online-sessions/OnlineSessions_JoinScreening.jpg"
              line1={dict.onlineSessionsPage.joinScreeningCardLine1}
              line2={dict.onlineSessionsPage.joinScreeningCardLine2}
              unavailableMessage={dict.onlineSessionsPage.joinScreeningUnavailable}
              contactLabel={dict.footer.contactUs}
              className={CARD_CLASSNAME}
              captionClassName={CAPTION_CLASSNAME}
            />
          </div>
        </section>
      </div>

      <Footer sponsors={sponsorsData} dict={dict} />
    </main>
  )
}
