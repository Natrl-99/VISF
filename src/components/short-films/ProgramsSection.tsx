'use client'

import { useState } from 'react'
import SectionIntroTextWide from '@/components/ui/SectionIntroTextWide'

export type ProgramFilm = {
  id: string
  title: string
  director: string
  country: string
  duration: string
  description: string
  posterUrl?: string | null
}

export type Program = {
  id: string
  label: string
  intro: string
  films: ProgramFilm[]
}

type ProgramsSectionProps = {
  programs: Program[]
  showPoster?: boolean
}

// Shared with online-sessions-line-up, which reuses this layout without posters.
// Defaults to true so short-films (the original consumer) keeps its current look.
export default function ProgramsSection({ programs, showPoster = true }: ProgramsSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = programs[selectedIdx]

  if (!selected) return null

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[87px] mt-8 lg:mt-14 pb-8 lg:pb-14">
      <nav className="flex flex-wrap gap-3 lg:gap-4">
        {programs.map((program, idx) => (
          <button
            key={program.id}
            onClick={() => setSelectedIdx(idx)}
            className={`text-base sm:text-lg lg:text-[25px] leading-none font-medium text-black px-5 py-2.5 rounded-visf-card whitespace-nowrap hover:bg-visf-accent ${
              idx === selectedIdx ? 'bg-visf-accent' : 'bg-neutral-200'
            }`}
          >
            {program.label}
          </button>
        ))}
      </nav>
      <SectionIntroTextWide
        text={selected.intro}
        className="text-sm sm:text-base lg:text-[25px] mt-8 lg:mt-10 w-full lg:w-[1026px]"
      />

      <div className="mt-10 lg:mt-12 flex flex-col gap-6 lg:gap-10">
        {selected.films.map((film) => (
          <div
            key={film.id}
            className="font-visf-text flex flex-col lg:flex-row gap-4 lg:gap-10 items-start"
          >
            {showPoster && (
              <div className="w-[160px] h-[237px] sm:w-[200px] sm:h-[297px] lg:w-[235px] lg:h-[349px] lg:shrink-0 overflow-hidden">
                <img
                  src={film.posterUrl ?? '/homepage/Homepage_Banner.jpg'}
                  alt={film.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="text-left space-y-2 max-w-sm lg:max-w-[900px]">
              <p className="font-bold text-base sm:text-lg lg:text-[20px] leading-snug">
                {film.title.toUpperCase()}
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
