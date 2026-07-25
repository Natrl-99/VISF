'use client'

import { useState } from 'react'
import SectionIntroTextWide from '@/components/ui/SectionIntroTextWide'

type Film = {
  name: string
  director: string
  country: string
  duration: string
  description: string
}

type Program = {
  label: string
  intro: string
  films: Film[]
}

const PROGRAMS: Program[] = Array.from({ length: 7 }, (_, i) => ({
  label: `PROGRAM ${i + 1}`,
  intro: 'Finding connection in unexpected places. This block explores the quiet moments that shape our lives. Through intimate dramas, heartfelt comedies, and character-driven stories, these films reveal how chance encounters, fragile relationships, and shared spaces can transform the ordinary into something unforgettable. Each story reflects the delicate balance between loneliness and belonging, reminding us that even the smallest human connections can change the course of our lives.',
  films: [
    {
      name: 'movie1',
      director: 'director1',
      country: 'Mexico',
      duration: '3:05',
      description: 'This block explores the quiet moments that shape our lives. Through intimate dramas, heartfelt comedies, and character-driven stories, these films reveal how chance encounters, fragile relationships, and shared spaces can transform the ordinary into something unforgettable.',
    },
    {
      name: 'movie2',
      director: 'director2',
      country: 'USA',
      duration: '2:15',
      description: 'This block explores the quiet moments that shape our lives. Through intimate dramas, heartfelt comedies, and character-driven stories, these films reveal how chance encounters, fragile relationships, and shared spaces can transform the ordinary into something unforgettable.',
    },
  ],
}))

type ProgramsSectionProps = {
  showPoster?: boolean
}

// Shared with online-sessions-line-up, which reuses this layout without posters.
// Defaults to true so short-films (the original consumer) keeps its current look.
export default function ProgramsSection({ showPoster = true }: ProgramsSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = PROGRAMS[selectedIdx]

  return (
    <section className="px-4 sm:px-6 lg:px-[87px] mt-12 lg:mt-24 pb-8 lg:pb-14">
      <nav className="flex flex-wrap gap-3 lg:gap-4">
        {PROGRAMS.map((program, idx) => (
          <button
            key={program.label}
            onClick={() => setSelectedIdx(idx)}
            className={`text-[25px] leading-none font-medium text-black px-5 py-2.5 rounded-visf-card whitespace-nowrap hover:bg-visf-accent ${
              idx === selectedIdx ? 'bg-visf-accent' : 'bg-neutral-200'
            }`}
          >
            {program.label}
          </button>
        ))}
      </nav>
      <SectionIntroTextWide
        text={selected.intro}
        className="text-sm sm:text-base lg:text-[25px] mt-8 lg:mt-10 w-full lg:w-[1026px] lg:h-[188px]"
      />

      <div className="mt-14 lg:mt-16 flex flex-col gap-9 lg:gap-16">
        {selected.films.map((film, idx) => (
          <div
            key={`${selected.label}-${idx}`}
            className="font-visf-text flex flex-col lg:flex-row gap-4 lg:gap-10 items-start"
          >
            {showPoster && (
              <div className="w-[160px] h-[237px] lg:w-[235px] lg:h-[349px] lg:shrink-0 overflow-hidden">
                <img src="/banner.png" alt={film.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="text-left space-y-2 max-w-sm lg:max-w-[900px]">
              <p className="font-bold text-base sm:text-lg lg:text-[20px] leading-snug">
                {film.name.toUpperCase()}
              </p>
              <p className="font-extralight text-sm sm:text-base lg:text-[20px] leading-snug">{film.director}</p>
              <p className="font-extralight text-sm sm:text-base lg:text-[20px] leading-snug">
                {film.country}  {film.duration}
              </p>
              <br />
              <p className="font-extralight text-sm sm:text-base lg:text-[22px] leading-relaxed lg:leading-[29px]">
                {film.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}