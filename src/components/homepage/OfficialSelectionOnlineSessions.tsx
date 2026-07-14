type OfficialSelectionOnlineSessionsProps = {
  officialSelectionImageUrl: string
  onlineSessionsImageUrl: string
}

export default function OfficialSelectionOnlineSessions({
  officialSelectionImageUrl,
  onlineSessionsImageUrl,
}: OfficialSelectionOnlineSessionsProps) {
  return (
    <section className="font-visf-headline px-6 pb-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/official-selection" className="relative rounded-visf-card overflow-hidden block">
          <img src={officialSelectionImageUrl} alt="" className="w-full h-[380px] object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <p className="absolute bottom-6 left-6 text-white text-[40px] font-medium leading-none">
            OFFICIAL
            <br />
            <span className="text-visf-accent">SELECTION</span>
          </p>
        </a>

        <a href="/online-sessions" className="relative rounded-visf-card overflow-hidden block">
          <img src={onlineSessionsImageUrl} alt="" className="w-full h-[380px] object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <p className="absolute top-6 left-6 text-white text-[28px] font-medium leading-none">
            <span className="text-visf-accent">S</span> ONLINE
            <br />
            SESSIONS
          </p>
        </a>
      </div>
    </section>
  )
}