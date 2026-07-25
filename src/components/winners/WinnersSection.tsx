'use client'

import { useState } from 'react'

type Award = {
  category: string
  movieTitle: string
  director: string
  country: string
}

type WinnersYear = {
  year: number
  awards: Award[]
}

const YEARS: WinnersYear[] = [
  {
    year: 2026,
    awards: [
      { category: 'BEST FILM', movieTitle: 'Movie Name 1', director: 'Director 1', country: 'Mexico' },
      { category: 'BEST DIRECTOR', movieTitle: 'Movie Name 2', director: 'Director 2', country: 'USA' },
      { category: 'BEST SCREENPLAY', movieTitle: 'Movie Name 3', director: 'Director 3', country: 'Spain' },
      { category: 'AUDIENCE AWARD', movieTitle: 'Movie Name 4', director: 'Director 4', country: 'Argentina' },
    ],
  },
  {
    year: 2025,
    awards: [
      { category: 'BEST FILM', movieTitle: 'Movie Name 1', director: 'Director 1', country: 'Mexico' },
      { category: 'BEST DIRECTOR', movieTitle: 'Movie Name 2', director: 'Director 2', country: 'USA' },
      { category: 'BEST SCREENPLAY', movieTitle: 'Movie Name 3', director: 'Director 3', country: 'Spain' },
      { category: 'AUDIENCE AWARD', movieTitle: 'Movie Name 4', director: 'Director 4', country: 'Argentina' },
    ],
  },
  {
    year: 2024,
    awards: [
      { category: 'BEST FILM', movieTitle: 'Movie Name 1', director: 'Director 1', country: 'Mexico' },
      { category: 'BEST DIRECTOR', movieTitle: 'Movie Name 2', director: 'Director 2', country: 'USA' },
      { category: 'BEST SCREENPLAY', movieTitle: 'Movie Name 3', director: 'Director 3', country: 'Spain' },
      { category: 'AUDIENCE AWARD', movieTitle: 'Movie Name 4', director: 'Director 4', country: 'Argentina' },
    ],
  },
  {
    year: 2023,
    awards: [
      { category: 'BEST FILM', movieTitle: 'Movie Name 1', director: 'Director 1', country: 'Mexico' },
      { category: 'BEST DIRECTOR', movieTitle: 'Movie Name 2', director: 'Director 2', country: 'USA' },
      { category: 'BEST SCREENPLAY', movieTitle: 'Movie Name 3', director: 'Director 3', country: 'Spain' },
      { category: 'AUDIENCE AWARD', movieTitle: 'Movie Name 4', director: 'Director 4', country: 'Argentina' },
    ],
  },
]

export default function WinnersSection() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = YEARS[selectedIdx]

  return (
    <section className="px-4 sm:px-6 lg:px-[87px] mt-8 lg:mt-14 pb-16">
      <nav className="flex flex-wrap gap-x-10 sm:gap-x-14 lg:gap-x-20 gap-y-2 mb-10 lg:mb-16">
        {YEARS.map((yearEntry, idx) => (
          <button
            key={yearEntry.year}
            onClick={() => setSelectedIdx(idx)}
            className={`font-visf-headline font-normal text-2xl leading-tight sm:text-3xl sm:leading-snug lg:text-[48px] lg:leading-[29px] whitespace-nowrap hover:underline ${
              idx === selectedIdx ? 'underline' : ''
            }`}
          >
            {yearEntry.year}
          </button>
        ))}
      </nav>

      <div className="bg-visf-accent rounded-tr-[60px] sm:rounded-tr-[160px] lg:rounded-tr-[441px] p-8 sm:p-10 lg:p-14">
        <div className="flex flex-col gap-y-8 lg:gap-y-10">
          {selected.awards.map((award, idx) => (
            <div key={`${selected.year}-${idx}`} className="flex flex-col">
              <p className="font-visf-headline font-medium text-sm leading-snug sm:text-base lg:text-[25px]">
                {award.category}
              </p>
              <p className="font-visf-headline font-light text-lg leading-snug sm:text-xl lg:text-[25px]">
                {award.movieTitle} | {award.director} | {award.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
