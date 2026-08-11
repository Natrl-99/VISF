"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const CARD_COMPETITIONS = "/Homepage_MainCompetitions.jpg";
const CARD_CATEGORIES = "/Homepage_Categories.jpg";


type FlipCardProps = {
  titleLines: string[];
  items: string[];
  frontImage: string;
  backImage: string;
};

function splitColumns(items: string[]): { firstColumn: string[]; secondColumn: string[] } {
  if (items.length <= 3) {
    return { firstColumn: items, secondColumn: [] };
  }
  const half = Math.ceil(items.length / 2);
  return { firstColumn: items.slice(0, half), secondColumn: items.slice(half) };
}

const OVERFLOW_FADE_STYLE = {
  WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
} as const;

function useOverflowFade() {
  const ref = useRef<HTMLUListElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => setHasOverflow(el.scrollHeight > el.clientHeight + 1);
    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  return { ref, hasOverflow };
}

function FlipCard({ titleLines, items, frontImage, backImage }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { firstColumn, secondColumn } = splitColumns(items);
  const firstColumnFade = useOverflowFade();
  const secondColumnFade = useOverflowFade();

  return (
    <button
      type="button"
      onClick={() => setFlipped((prev) => !prev)}
      aria-pressed={flipped}
      className="group relative w-full sm:w-1/2 h-107.5 sm:h-110 lg:h-[450px] lg:max-w-[675px] text-left"
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
            src={frontImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.32)" }}
          />
          <p className="font-visf-headline absolute bottom-5 left-5 lg:bottom-8 lg:left-8 lg:w-[394px] text-white text-2xl sm:text-3xl lg:text-[48px] font-medium leading-tight lg:leading-[49px]">
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
            src={backImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.75)" }}
          />
          <div className="absolute inset-0 p-4 sm:p-6 lg:p-6 flex flex-col justify-between gap-2">
            <ul
              ref={firstColumnFade.ref}
              className="font-visf-text relative flex-1 min-h-0 overflow-y-auto text-white text-sm sm:text-base lg:w-[279px] lg:text-base font-light leading-snug sm:leading-4.75 lg:leading-4.75 space-y-0"
              style={firstColumnFade.hasOverflow ? OVERFLOW_FADE_STYLE : undefined}
            >
              {firstColumn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {secondColumn.length > 0 && (
              <ul
                ref={secondColumnFade.ref}
                className="font-visf-text relative flex-1 min-h-0 overflow-y-auto self-end text-right text-white text-sm sm:text-base lg:w-[279px] lg:text-base font-light leading-snug sm:leading-4.75 lg:leading-4.75 space-y-0"
                style={secondColumnFade.hasOverflow ? OVERFLOW_FADE_STYLE : undefined}
              >
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
    <section
      id="categories"
      className="font-visf-text scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-36 px-[35px] pb-16 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-[30px]">
        <FlipCard
          titleLines={[dict.home.competitionsTitleLine1, dict.home.competitionsTitleLine2]}
          items={sortedCompetitions.map((competition) => competition.name)}
          frontImage={CARD_COMPETITIONS}
          backImage={CARD_COMPETITIONS}
        />
        <FlipCard
          titleLines={[dict.home.categoriesTitleLine1, dict.home.categoriesTitleLine2]}
          items={sortedCategories.map((category) => category.name)}
          frontImage={CARD_CATEGORIES}
          backImage={CARD_CATEGORIES}
        />
      </div>
    </section>
  );
}
