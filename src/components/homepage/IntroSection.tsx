import Link from 'next/link'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import SubmitFilmButton from '@/components/ui/SubmitFilmButton'
import SectionIntroText from '@/components/ui/SectionIntroText'

type IntroSectionProps = {
  imageUrl: string
  dateLabel: string
  locationLabel: string
  introText: string
}

export default function IntroSection({
  imageUrl,
  dateLabel,
  locationLabel,
  introText,
}: IntroSectionProps) {
  return (
    <section className="font-visf-text pl-8 sm:pl-12 lg:pl-[90px] pr-8 sm:pr-12 lg:pr-[30px] py-16 max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
      <div className="lg:w-[406px] lg:shrink-0">
        <h2 className="font-visf-headline text-[32px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.02] mb-5 uppercase">
          WHERE
          <br />
          INDEPENDENT
          <br />
          <span className="text-visf-accent uppercase">CINEMA</span> FINDS ITS
          <br />
          AUDIENCE
        </h2>

        <SectionIntroText text={introText} className="mb-6" />

        <SubmitFilmButton className="inline-block text-xs font-semibold bg-visf-accent px-4 py-3 rounded-md hover:underline">
          SUBMIT
          <br />
          YOUR FILM
        </SubmitFilmButton>
      </div>

      <div className="group relative w-full sm:w-[420px] lg:w-[784px] h-[300px] sm:h-[380px] lg:h-[523px] rounded-visf-card overflow-hidden shrink-0">
        <GrayscaleHoverImage
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/[0.56] opacity-[0.71]" />
        <div className="absolute bottom-5 right-5 lg:bottom-8 lg:right-8 text-right">
          <p className="font-visf-headline text-white text-xl sm:text-2xl lg:text-[48px] lg:leading-[49px] font-bold uppercase">
            {dateLabel}
          </p>
          <p className="font-visf-headline text-white text-sm sm:text-base lg:text-[48px] lg:leading-[49px] font-extralight uppercase">
            {locationLabel}
          </p>
        </div>
        <Link href="/gallery" className="absolute inset-0" aria-label="View gallery" />
      </div>
    </section>
  )
}