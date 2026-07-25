type SectionIntroTextWideProps = {
  text: string
  className?: string
}

export default function SectionIntroTextWide({ text, className }: SectionIntroTextWideProps) {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

  return (
    <div className={`space-y-4 ${className ?? ''}`}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="font-visf-text font-extralight text-black leading-relaxed sm:leading-6 lg:leading-[34px]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}