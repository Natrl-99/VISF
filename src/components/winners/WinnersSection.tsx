"use client";

import { useState } from "react";

export type Award = {
  id: string;
  category: string;
  movieTitle: string;
  director: string;
  country: string;
};

export type WinnersYear = {
  id: string;
  year: number;
  awards: Award[];
};

type WinnersSectionProps = {
  years: WinnersYear[];
};

export default function WinnersSection({ years }: WinnersSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = years[selectedIdx];

  if (!selected) return null;

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[87px] mt-8 lg:mt-14 pb-16">
      <nav className="flex flex-wrap gap-x-10 sm:gap-x-14 lg:gap-x-20 gap-y-2 mb-10 lg:mb-16">
        {years.map((yearEntry, idx) => (
          <button
            key={yearEntry.id}
            onClick={() => setSelectedIdx(idx)}
            className={`font-visf-headline font-normal text-2xl leading-tight sm:text-3xl sm:leading-snug lg:text-[48px] lg:leading-[29px] whitespace-nowrap hover:underline ${
              idx === selectedIdx ? "underline" : ""
            }`}
          >
            {yearEntry.year}
          </button>
        ))}
      </nav>

      <div className="bg-visf-accent rounded-tr-[60px] sm:rounded-tr-[160px] lg:rounded-tr-[441px] p-8 sm:p-10 lg:p-14">
        <div className="flex flex-col gap-y-8 lg:gap-y-10">
          {selected.awards.map((award) => (
            <div key={award.id} className="flex flex-col">
              <p className="font-visf-headline font-medium text-sm leading-snug sm:text-base lg:text-[25px] uppercase">
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
  );
}
