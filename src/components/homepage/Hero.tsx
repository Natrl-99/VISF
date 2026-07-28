import GrayscaleHoverImage from "@/components/ui/GrayscaleHoverImage";
import SubmitFilmButton from "@/components/ui/SubmitFilmButton";
import { type Sponsor } from "@/components/layout/Footer";
import type { Dictionary } from "@/app/(frontend)/[lang]/dictionaries";

type HeroProps = {
  imageUrl: string;
  sponsors: Sponsor[];
  dict: Dictionary;
};

export default function Hero({ imageUrl, sponsors, dict }: HeroProps) {
  return (
    <div className="group relative w-full h-[672px] overflow-hidden">
      <SubmitFilmButton className="absolute inset-0 block">
        <GrayscaleHoverImage
          src={imageUrl}
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </SubmitFilmButton>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.32), transparent 55%)",
        }}
      />
      <SubmitFilmButton className="font-visf-text absolute left-6 sm:left-12 lg:left-[92px] bottom-16 sm:bottom-24 lg:bottom-[160px] text-white font-bold text-[36px] sm:text-[60px] lg:text-[85px] leading-[33px] sm:leading-[54px] lg:leading-[77px] uppercase">
        <span className="block">{dict.home.heroLine1}</span>
        <span className="block">{dict.home.heroLine2}</span>
      </SubmitFilmButton>

      <div className="absolute inset-x-0 bottom-0 pb-10 px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {sponsors.map((sp) =>
          sp.logoUrl ? (
            <img
              key={sp.id}
              src={sp.logoUrl}
              alt={sp.name}
              className="h-20 w-28 lg:h-28 lg:w-40 object-contain"
            />
          ) : (
            <span
              key={sp.id}
              className="text-neutral-400 text-[11px] font-semibold tracking-wide uppercase"
            >
              {sp.name}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
