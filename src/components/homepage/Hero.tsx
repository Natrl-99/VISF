import GrayscaleHoverImage from "@/components/ui/GrayscaleHoverImage";
import SubmitFilmButton from "@/components/ui/SubmitFilmButton";
import { type Sponsor } from "@/components/layout/Footer";

type HeroProps = {
  imageUrl: string;
  sponsors: Sponsor[];
};

export default function Hero({ imageUrl, sponsors }: HeroProps) {
  return (
    <div className="group relative w-full h-[672px] overflow-hidden">
      <GrayscaleHoverImage
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.32), transparent 55%)",
        }}
      />
      <SubmitFilmButton className="font-visf-text absolute left-6 sm:left-12 lg:left-[92px] bottom-10 sm:bottom-16 lg:bottom-[108px] text-white font-bold text-[36px] sm:text-[60px] lg:text-[85px] leading-[33px] sm:leading-[54px] lg:leading-[77px] uppercase hover:underline">
        <span className="block">Submissions</span>
        <span className="block">Open</span>
      </SubmitFilmButton>

      <div className="absolute inset-x-0 bottom-0 pb-10 px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {sponsors.map((sp) =>
          sp.logoUrl ? (
            <img
              key={sp.id}
              src={sp.logoUrl}
              alt={sp.name}
              className="h-15 w-15 object-contain opacity-70 grayscale invert"
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
