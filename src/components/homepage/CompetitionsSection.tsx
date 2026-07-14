const MAIN_COMPETITIONS = [
  'Narrative Shorts Competition',
  'Foreign Shorts Competition',
  'Documentary Shorts Competition',
  'Animation Shorts Competition',
  'New Filmmakers Shorts Competition',
  'Experimental Shorts Competition',
  'Student Shorts Competition',
  'Horror Shorts Competition',
  'Music Videos Competition',
  'Comedy Shorts Competition',
]

const TECHNICAL_LEFT = [
  'Best Producer',
  'Best Female Director',
  'Best Male Director',
  'Best Female Student Director',
  'Best Male Student Director',
  'Best Editing',
  'Best Actor',
  'Best Cinematography',
]

const TECHNICAL_RIGHT = [
  'Best Acting Ensemble',
  'Best Production Design',
  'Best Actress',
  'Best Screenwriting',
  'Best Original Score',
  'Best Sound Design',
]

type CompetitionsSectionProps = {
  imageUrl: string
}

export default function CompetitionsSection({ imageUrl }: CompetitionsSectionProps) {
  return (
    <section className="font-visf-text px-6 pb-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Título — Main Competitions */}
        <div className="relative rounded-visf-card overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-[220px] object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <p className="font-visf-headline absolute bottom-5 left-5 text-white text-2xl font-medium">
            MAIN
            <br />
            COMPETITIONS
          </p>
        </div>

        {/* Título — Technical and Performance Categories */}
        <div className="relative rounded-visf-card overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-[220px] object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <p className="font-visf-headline absolute bottom-5 left-5 text-white text-2xl font-medium leading-tight">
            TECHNICAL
            <br />
            AND PERFORMANCE CATEGORIES
          </p>
        </div>

        {/* Lista — Main Competitions */}
        <div className="relative rounded-visf-card overflow-hidden p-6">
          <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.75)' }} />
          <ul className="relative text-white text-xs space-y-2">
            {MAIN_COMPETITIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Lista — Technical categories (2 columnas) */}
        <div className="relative rounded-visf-card overflow-hidden p-6 grid grid-cols-2 gap-x-4">
          <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.75)' }} />
          <ul className="relative text-white text-xs space-y-2">
            {TECHNICAL_LEFT.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <ul className="relative text-white text-xs space-y-2 text-right">
            {TECHNICAL_RIGHT.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}