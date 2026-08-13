import Link from 'next/link'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import SubmitFilmButton from '@/components/ui/SubmitFilmButton'
import SectionIntroText from '@/components/ui/SectionIntroText'
import TitleImage from '@/components/ui/TitleImage'
import type { Dictionary } from '@/app/(frontend)/[lang]/dictionaries'

type IntroSectionProps = {
  lang: string
  dict: Dictionary
  imageUrl: string
  dateLabel: string
  locationLabel: string
  introText: string
}

export default function IntroSection({
  lang,
  dict,
  imageUrl,
  dateLabel,
  locationLabel,
  introText,
}: IntroSectionProps) {
  return (
    <section className="font-visf-text pl-8 sm:pl-12 lg:pl-[90px] pr-8 sm:pr-12 lg:pr-[30px] py-16 max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
      <div className="lg:w-[406px] lg:shrink-0">
        <h2 className="font-visf-headline text-[32px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.02] mb-5 uppercase">
          {dict.home.introHeadlineLine1}
          <br />
          {dict.home.introHeadlineLine2}
          <br />
          <span className="text-visf-accent uppercase inline-block align-baseline h-[34px] sm:h-[42px] lg:h-[49px] w-[158px] sm:w-[197px] lg:w-[235px] overflow-hidden">
            <TitleImage
              src={dict.home.introHeadlineAccentImage}
              alt={dict.home.introHeadlineAccentImageAlt}
              width={4000}
              height={4000}
              className="h-[181px] sm:h-[226px] lg:h-[271px] w-auto max-w-none block -mt-[74px] sm:-mt-[93px] lg:-mt-[111px] -ml-[10px] sm:-ml-[13px] lg:-ml-[16px]"
            />
          </span>{' '}
          {dict.home.introHeadlineLine3Rest} {dict.home.introHeadlineLine4}
        </h2>

        <SectionIntroText text={introText} className="mb-6" />

        <SubmitFilmButton className="font-visf-headline inline-flex flex-col items-center justify-center text-center text-xs sm:text-sm font-medium uppercase leading-tight lg:text-[20px] lg:leading-[19px] bg-[url('/ui/submitButtonBackground.svg')] bg-no-repeat bg-[length:100%_100%] px-5 py-3 sm:px-6 sm:py-4 lg:px-7 lg:py-4 hover:underline">
          <span className="block whitespace-nowrap">{dict.home.introSubmitLine1}</span>
          <span className="block whitespace-nowrap">{dict.home.introSubmitLine2}</span>
        </SubmitFilmButton>
      </div>

      <div className="group relative w-full sm:w-[420px] lg:w-auto lg:flex-1 lg:max-w-[784px] min-w-0 h-[300px] sm:h-[380px] lg:h-[523px] rounded-visf-card overflow-hidden shrink-0 lg:shrink">
        <GrayscaleHoverImage
          src={imageUrl}
          alt=""
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/[0.56] opacity-[0.71]" />
        <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-8 text-right">
          <p className="font-visf-headline text-white text-xl sm:text-2xl lg:text-[clamp(24px,3.3vw,48px)] lg:leading-[1.02] font-bold uppercase">
            {dateLabel}
          </p>
          <p className="font-visf-headline text-white text-sm sm:text-base lg:text-[clamp(24px,3.3vw,48px)] lg:leading-[1.02] font-extralight uppercase">
            {locationLabel}
          </p>
        </div>
        <Link
          href={`/${lang}/gallery`}
          className="absolute inset-0"
          aria-label={dict.home.viewGalleryAriaLabel}
        />
      </div>
    </section>
  )
}