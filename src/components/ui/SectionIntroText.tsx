type SectionIntroTextProps = {
  text: string
  className?: string
}

export default function SectionIntroText({ text, className }: SectionIntroTextProps) {
  return (
    <p
      className={`font-visf-text font-extralight text-black text-sm leading-relaxed sm:text-base sm:leading-6 lg:text-[20px] lg:leading-[29px] max-w-sm lg:max-w-[470px] ${className ?? ''}`}
    >
      {text}
    </p>
  )
}