import Link from 'next/link'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'

type OfficialSelectionOnlineSessionsProps = {
  officialSelectionImageUrl: string
  onlineSessionsImageUrl: string
}

export default function OfficialSelectionOnlineSessions({
  officialSelectionImageUrl,
  onlineSessionsImageUrl,
}: OfficialSelectionOnlineSessionsProps) {
  return (
    <section className="font-visf-headline px-[35px] pb-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-[30px]">
        <Link
          href="/official-selection"
          className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] rounded-visf-card overflow-hidden block"
        >
          <GrayscaleHoverImage
            src={officialSelectionImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <p className="absolute bottom-6 right-6 text-right text-white text-2xl sm:text-3xl lg:text-[40px] font-medium leading-none">
            OFFICIAL
            <br />
            <span className="text-visf-accent">SELECTION</span>
          </p>
        </Link>

        <Link
          href="/online-sessions"
          className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] rounded-visf-card overflow-hidden block"
        >
          <GrayscaleHoverImage
            src={onlineSessionsImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <p className="absolute top-6 right-6 text-right text-white text-2xl sm:text-3xl lg:text-[40px] font-medium leading-none">
            <span className="text-visf-accent">VISF</span> ONLINE
            <br />
            SESSIONS
          </p>
        </Link>
      </div>
    </section>
  )
}