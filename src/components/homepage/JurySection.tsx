'use client'

import { useState } from 'react'

export type JuryMember = {
  id: string
  name: string
  bio: string
  photoUrl: string
}

type JurySectionProps = {
  members: JuryMember[]
}

export default function JurySection({ members }: JurySectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = members[selectedIdx]

  return (
    <section className="px-6 pb-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10">
        <div className="font-visf-text">
          <h2 className="font-visf-headline text-[40px] font-medium leading-[1.05] mb-4">
            <span className="text-visf-accent underline decoration-current underline-offset-4">MEET</span>
            <br />
            THE JURY
          </h2>
          <p className="text-xs text-neutral-700 leading-relaxed mb-3 underline decoration-neutral-300 underline-offset-4">
            Our distinguished jury brings together industry leaders, creative visionaries, and
            experienced professionals from across the design and innovation landscape. Each juror
            has been carefully selected for their expertise, achievements, and commitment to
            recognizing outstanding work.
          </p>
          <p className="text-xs text-neutral-700 leading-relaxed underline decoration-neutral-300 underline-offset-4">
            With diverse perspectives and deep knowledge, they will evaluate every submission
            based on creativity, originality, execution, impact, and excellence.
          </p>
        </div>

        <div>
          <nav className="flex gap-5 border-b border-neutral-200 pb-3 mb-5 overflow-x-auto">
            {members.map((member, idx) => (
              <button
                key={member.id}
                onClick={() => setSelectedIdx(idx)}
                className={`font-visf-headline text-xs sm:text-sm whitespace-nowrap pb-1 ${
                  idx === selectedIdx
                    ? 'font-bold text-neutral-900 underline underline-offset-4'
                    : 'text-neutral-500'
                }`}
              >
                {member.name.toUpperCase()}
              </button>
            ))}
          </nav>

          {selected && (
            <div className="rounded-visf-card p-6 flex flex-col sm:flex-row gap-6 bg-visf-accent">
              <div className="flex-1">
                <p className="font-visf-headline font-medium text-sm mb-2">{selected.name}</p>
                <p className="font-visf-text text-xs text-neutral-800 leading-relaxed">{selected.bio}</p>
              </div>
              <img
                src={selected.photoUrl}
                alt={selected.name}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-[32px] object-cover shrink-0"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}