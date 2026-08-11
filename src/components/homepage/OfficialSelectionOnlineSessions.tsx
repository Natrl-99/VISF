import Link from 'next/link'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import TitleImage from '@/components/ui/TitleImage'
import type { Dictionary } from '@/app/(frontend)/[lang]/dictionaries'

type OfficialSelectionOnlineSessionsProps = {
  lang: string
  dict: Dictionary
  officialSelectionImageUrl: string
  onlineSessionsImageUrl: string
}

export default function OfficialSelectionOnlineSessions({
  lang,
  dict,
  officialSelectionImageUrl,
  onlineSessionsImageUrl,
}: OfficialSelectionOnlineSessionsProps) {
  return (
    <section className="font-visf-headline px-[35px] pb-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-[30px]">
        <Link
          href={`/${lang}/official-selection`}
          className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] block"
        >
          <div className="absolute inset-0 rounded-visf-card overflow-hidden">
            <GrayscaleHoverImage
              src={officialSelectionImageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          </div>
          <div className="absolute bottom-2 sm:-bottom-[43px] lg:-bottom-[57px] right-6 h-[66px] sm:h-[84px] lg:h-[110px] overflow-hidden">
            <TitleImage
              src={dict.home.officialSelectionCardLine1Image}
              alt={dict.home.officialSelectionCardLine1ImageAlt}
              width={12500}
              height={8334}
              className="h-[139px] sm:h-[177px] lg:h-[231px] w-auto block -mt-[41px] sm:-mt-[52px] lg:-mt-[68px]"
            />
          </div>
        </Link>

        <Link
          href={`/${lang}/online-sessions`}
          className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] block"
        >
          <div className="absolute inset-0 rounded-visf-card overflow-hidden">
            <GrayscaleHoverImage
              src={onlineSessionsImageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          </div>
          <div className="absolute top-2 sm:-top-[39px] lg:-top-[50px] right-6 h-[55px] sm:h-[69px] lg:h-[89px] overflow-hidden">
            <TitleImage
              src={dict.home.onlineSessionsCardAccentVisfImage}
              alt={dict.home.onlineSessionsCardAccentVisfImageAlt}
              width={12500}
              height={8334}
              className="h-[139px] sm:h-[177px] lg:h-[231px] w-auto block -mt-[47px] sm:-mt-[60px] lg:-mt-[79px]"
            />
          </div>
        </Link>
      </div>
    </section>
  )
}