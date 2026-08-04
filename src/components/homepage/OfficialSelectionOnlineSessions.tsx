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
          <p className="absolute bottom-6 right-6 text-right text-white text-2xl sm:text-3xl lg:text-[40px] font-medium leading-none">
            <TitleImage
              src={dict.home.officialSelectionCardLine1Image}
              alt={dict.home.officialSelectionCardLine1ImageAlt}
              width={300}
              height={100}
              className="h-[24px] sm:h-[30px] lg:h-[40px] w-auto block"
            />
          </p>
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
          <p className="absolute top-6 right-6 text-right text-white text-2xl sm:text-3xl lg:text-[40px] font-medium leading-none">
            <TitleImage
              src={dict.home.onlineSessionsCardAccentVisfImage}
              alt={dict.home.onlineSessionsCardAccentVisfImageAlt}
              width={365}
              height={347}
              className="h-[60px] sm:h-[75px] lg:h-[100px] w-auto block"
            />
          </p>
        </Link>
      </div>
    </section>
  )
}