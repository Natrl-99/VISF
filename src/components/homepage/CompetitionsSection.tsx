'use client'

import { useState } from 'react'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'

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

const CARD_IMAGE = '/banner.png'

type FlipCardProps = {
  titleLines: string[]
  items: string[]
}

function FlipCard({ titleLines, items }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setFlipped((prev) => !prev)}
      aria-pressed={flipped}
      className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] text-left"
      style={{ perspective: '1500px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="absolute inset-0 rounded-visf-card overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <GrayscaleHoverImage
            src={CARD_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
          <p className="font-visf-headline absolute bottom-5 left-5 lg:bottom-8 lg:left-8 lg:w-[394px] text-white text-2xl lg:text-[48px] font-medium leading-tight lg:leading-[49px]">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div
          className="absolute inset-0 rounded-visf-card overflow-hidden p-6"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <GrayscaleHoverImage
            src={CARD_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.75)' }} />
          <ul className="font-visf-headline relative text-white text-xs lg:w-[323px] lg:text-[20px] lg:font-light lg:leading-[26px] space-y-2">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

export default function CompetitionsSection() {
  return (
    <section className="font-visf-text px-[35px] pb-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-[30px]">
        <FlipCard titleLines={['MAIN', 'COMPETITIONS']} items={MAIN_COMPETITIONS} />
        <FlipCard
          titleLines={['TECHNICAL', 'AND PERFORMANCE CATEGORIES']}
          items={TECHNICAL_LEFT}
        />
      </div>
    </section>
  )
}