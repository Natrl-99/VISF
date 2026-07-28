"use client";

import { useMemo, useState } from "react";
import GrayscaleHoverImage from "@/components/ui/GrayscaleHoverImage";
import type { Dictionary } from "@/app/(frontend)/[lang]/dictionaries";

export type Competition = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};

type CompetitionsSectionProps = {
  competitions: Competition[];
  categories: Category[];
  dict: Dictionary;
};

const CARD_IMAGE = "/banner.png";

type FlipCardProps = {
  titleLines: string[];
  items: string[];
};

function FlipCard({ titleLines, items }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const firstColumn = items.slice(0, 10);
  const secondColumn = items.length > 10 ? items.slice(10) : [];

  return (
    <button
      type="button"
      onClick={() => setFlipped((prev) => !prev)}
      aria-pressed={flipped}
      className="group relative w-full sm:w-1/2 h-[221px] sm:h-[292px] lg:h-[450px] lg:max-w-[675px] text-left"
      style={{ perspective: "1500px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-visf-card overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <GrayscaleHoverImage
            src={CARD_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.32)" }}
          />
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
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <GrayscaleHoverImage
            src={CARD_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.75)" }}
          />
          <div className="absolute inset-0 p-4 sm:p-6 lg:p-6 flex flex-col justify-between gap-2">
            <ul className="font-visf-text relative flex-1 min-h-0 overflow-y-auto text-white text-xs lg:w-[279px] lg:text-[14px] font-light lg:leading-[16px] space-y-0">
              {firstColumn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {secondColumn.length > 0 && (
              <ul className="font-visf-text relative flex-1 min-h-0 overflow-y-auto self-end text-right text-white text-xs lg:w-[279px] lg:text-[14px] font-light lg:leading-[16px] space-y-0">
                {secondColumn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function CompetitionsSection({
  competitions,
  categories,
  dict,
}: CompetitionsSectionProps) {
  const sortedCompetitions = useMemo(
    () => [...competitions].sort((a, b) => a.name.localeCompare(b.name)),
    [competitions],
  );

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories],
  );

  return (
    <section className="font-visf-text px-[35px] pb-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-[30px]">
        <FlipCard
          titleLines={[dict.home.competitionsTitleLine1, dict.home.competitionsTitleLine2]}
          items={sortedCompetitions.map((competition) => competition.name)}
        />
        <FlipCard
          titleLines={[dict.home.categoriesTitleLine1, dict.home.categoriesTitleLine2]}
          items={sortedCategories.map((category) => category.name)}
        />
      </div>
    </section>
  );
}
