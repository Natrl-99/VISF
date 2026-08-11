'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionIntroText from '@/components/ui/SectionIntroText'
import TitleImage from '@/components/ui/TitleImage'
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
    <section
      id="jury"
      className="font-visf-text scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-36 pl-8 sm:pl-12 lg:pl-[90px] pr-[30px] py-16 max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16"
    >
      <div className="lg:w-[406px] lg:shrink-0">
        <h2 className="font-visf-headline text-[28px] sm:text-[34px] lg:text-[40px] font-medium leading-[1.05] mb-4">
          <span className="text-visf-accent  decoration-current block h-[64px] sm:h-[81px] lg:h-[105px] w-[171px] sm:w-[217px] lg:w-[282px] overflow-hidden">
            <TitleImage
              src={dict.jury.headingAccentImage}
              alt={dict.jury.headingAccentImageAlt}
              width={12500}
              height={8334}
              className="h-[139px] sm:h-[177px] lg:h-[231px] w-auto max-w-none block -mt-[37px] sm:-mt-[47px] lg:-mt-[61px] -ml-[19px] sm:-ml-[25px] lg:-ml-[32px]"
            />
          </span>
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
              <p className="font-visf-headline font-medium text-base sm:text-lg lg:text-[20px] leading-[29px] mb-4">
                {selected.name}
              </p>
              <SectionIntroText text={selected.bio} />
            </div>
            <div className="relative w-[140px] h-[187px] sm:w-[220px] sm:h-[300px] lg:w-[317px] lg:h-[423px] rounded-visf-card overflow-hidden shrink-0">
              <Image
                src={selected.photoUrl}
                alt={selected.name}
                fill
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 220px, 317px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}