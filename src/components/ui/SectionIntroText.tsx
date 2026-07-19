type SectionIntroTextProps = {
  text: string
  className?: string
}

export default function SectionIntroText({ text, className }: SectionIntroTextProps) {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

  return (
    <div className={`space-y-4 ${className ?? ''}`}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="font-visf-text font-extralight text-black text-sm leading-relaxed sm:text-base sm:leading-6 lg:text-[20px] lg:leading-[29px] max-w-sm lg:max-w-[470px]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}