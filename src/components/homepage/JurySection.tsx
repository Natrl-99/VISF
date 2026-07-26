'use client'

import { useState } from 'react'
import SectionIntroText from '@/components/ui/SectionIntroText'
import type { Dictionary } from '@/app/(frontend)/[lang]/dictionaries'

export type JuryMember = {
  id: string
  name: string
  bio: string
  photoUrl: string
}

type JurySectionProps = {
  members: JuryMember[]
  dict: Dictionary
}

// Order comes from the query (sort: "createdAt") rather than a client-side
// name sort — sorting by a translated field would put members in a different
// order per locale depending on how each name was translated.
export default function JurySection({ members, dict }: JurySectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = members[selectedIdx]

  return (
    <section className="font-visf-text pl-8 sm:pl-12 lg:pl-[90px] pr-[30px] py-16 max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
      <div className="lg:w-[406px] lg:shrink-0">
        <h2 className="font-visf-headline text-[40px] font-medium leading-[1.05] mb-4">
          <span className="text-visf-accent  decoration-current">{dict.jury.headingAccent}</span>
          <br />
          {dict.jury.headingRest}
        </h2>

        <SectionIntroText text={dict.jury.intro} />
      </div>

      <div className="w-full lg:flex-1 lg:min-w-0">
        <nav className="flex flex-wrap gap-x-10 gap-y-3 pb-3 mb-5">
          {members.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => setSelectedIdx(idx)}
              className={`font-visf-headline font-medium text-sm leading-snug sm:text-base sm:leading-normal lg:text-[20px] lg:leading-[29px] hover:underline whitespace-nowrap ${
                idx === selectedIdx ? 'underline' : 'text-visf-gray'
              }`}
            >
              {member.name.toUpperCase()}
            </button>
          ))}
        </nav>

        {selected && (
          <div className="bg-visf-accent rounded-visf-card p-8 sm:p-10 lg:p-12 flex flex-col sm:flex-row gap-8 lg:min-h-[683px]">
            <div className="flex-1">
              <p className="font-visf-headline font-medium text-[20px] leading-[29px] mb-4">
                {selected.name}
              </p>
              <SectionIntroText text={selected.bio} />
            </div>
            <div className="w-[140px] h-[187px] sm:w-[220px] sm:h-[300px] lg:w-[317px] lg:h-[423px] rounded-visf-card overflow-hidden shrink-0">
              <img
                src={selected.photoUrl}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}