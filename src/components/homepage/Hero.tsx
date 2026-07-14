type HeroProps = {
  headline: string
  imageUrl: string
}

export default function Hero({ headline, imageUrl }: HeroProps) {
  return (
    <div className="relative h-[440px] mx-4 sm:mx-6 mb-6 rounded-visf-card overflow-hidden">
      <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.32), transparent 55%)' }}
      />
      <h1 className="font-visf-text absolute bottom-8 left-6 sm:left-10 text-white text-[40px] sm:text-[85px] font-bold leading-[0.9]">
        {headline.split(' ').map((word, i) => (
          <span key={i} className="underline decoration-white underline-offset-8 block">
            {word}
          </span>
        ))}
      </h1>
    </div>
  )
}