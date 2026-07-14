type IntroSectionProps = {
  imageUrl: string
  dateLabel: string
  locationLabel: string
}

export default function IntroSection({ imageUrl, dateLabel, locationLabel }: IntroSectionProps) {
  return (
    <section className="font-visf-text px-6 py-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="font-visf-headline text-[32px] sm:text-[48px] font-medium leading-[1.02] mb-5">
          WHERE
          <br />
          INDEPENDENT
          <br />
          <span className="text-visf-accent">CINEMA</span> FINDS ITS
          <br />
          AUDIENCE
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed mb-6 max-w-sm">
          The Verona International Short Film Festival showcases outstanding independent short
          films from around the world. Combining live screenings, virtual events, and a strong
          international community, the festival is dedicated to discovering new talent and
          celebrating bold cinematic storytelling.
        </p>
        <button className="text-xs font-semibold bg-visf-accent px-4 py-3 rounded-md">
          Submit
          <br />
          your film
        </button>
      </div>

      <div className="relative rounded-visf-card overflow-hidden">
        <img src={imageUrl} alt="" className="w-full h-[420px] object-cover" />
        <div className="absolute bottom-5 right-5 text-white text-right">
          <p className="font-visf-headline text-xl font-bold leading-tight">{dateLabel}</p>
          <p className="font-visf-headline text-sm font-light text-neutral-100">{locationLabel}</p>
        </div>
      </div>
    </section>
  )
}