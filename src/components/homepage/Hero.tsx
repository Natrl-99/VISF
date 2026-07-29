import GrayscaleHoverImage from "@/components/ui/GrayscaleHoverImage";
import SubmitFilmButton from "@/components/ui/SubmitFilmButton";
import type { Dictionary } from "@/app/(frontend)/[lang]/dictionaries";

type HeroProps = {
  imageUrl: string;
  dict: Dictionary;
};

export default function Hero({ imageUrl, dict }: HeroProps) {
  return (
    <div className="group relative w-full h-[330px] sm:h-[440px] lg:h-[672px] overflow-hidden">
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
    </div>
  );
}
