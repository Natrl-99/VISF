import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import SubmitFilmButton from '@/components/ui/SubmitFilmButton'

type HeroProps = {
  imageUrl: string
}

export default function Hero({ imageUrl }: HeroProps) {
  return (
    <div className="group relative w-full h-[672px] overflow-hidden">
      <GrayscaleHoverImage
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.32), transparent 55%)' }}
      />
      <SubmitFilmButton className="font-visf-text absolute left-6 sm:left-12 lg:left-[92px] bottom-10 sm:bottom-16 lg:bottom-[108px] text-white font-bold text-[36px] sm:text-[60px] lg:text-[85px] leading-[33px] sm:leading-[54px] lg:leading-[77px] uppercase hover:underline">
        <span className="block">Submissions</span>
        <span className="block">Open</span>
      </SubmitFilmButton>
    </div>
  )
}
