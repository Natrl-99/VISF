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
          className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] rounded-visf-card overflow-hidden block"
        >
          <GrayscaleHoverImage
            src={officialSelectionImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <div className="absolute -bottom-[21px] sm:-bottom-[27px] lg:-bottom-[35px] right-6 h-[66px] sm:h-[84px] lg:h-[110px] overflow-hidden">
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
          className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] rounded-visf-card overflow-hidden block"
        >
          <GrayscaleHoverImage
            src={onlineSessionsImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <div className="absolute top-6 right-6 h-[90px] sm:h-[115px] lg:h-[150px] overflow-hidden">
            <TitleImage
              src={dict.home.onlineSessionsCardAccentVisfImage}
              alt={dict.home.onlineSessionsCardAccentVisfImageAlt}
              width={12500}
              height={8334}
              className="h-[223px] sm:h-[285px] lg:h-[372px] w-auto block -mt-[72px] sm:-mt-[92px] lg:-mt-[120px]"
            />
          </div>
        </Link>
      </div>
    </section>
  )
}