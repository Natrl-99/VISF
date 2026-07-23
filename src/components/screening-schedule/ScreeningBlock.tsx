type ScreeningBlockProps = {
  chapterLabel: string
  blockName: string
  date: string
  time: string
  movies: string[]
}

export default function ScreeningBlock({
  chapterLabel,
  blockName,
  date,
  time,
  movies,
}: ScreeningBlockProps) {
  return (
    <div className="font-visf-headline flex flex-col lg:flex-row gap-4 lg:gap-16 items-start px-4 sm:px-6 lg:px-[87px]">
      <div className="text-left lg:w-[220px] lg:shrink-0 lg:min-w-0 break-words space-y-4">
        <p className="font-bold text-base sm:text-lg lg:text-[30px] leading-snug lg:leading-[24px]">
          {chapterLabel}
        </p>
        <p className="font-bold text-base sm:text-lg lg:text-[40px] leading-snug lg:leading-[24px]">
          {blockName}
        </p>
      </div>

      <div className="text-left space-y-4">
        <p className="uppercase font-bold text-base sm:text-lg lg:text-[30px] leading-snug lg:leading-[24px]">
          {date}
        </p>
        <p className="font-bold text-base sm:text-lg lg:text-[30px] leading-snug lg:leading-[24px]">
          {time}
        </p>
        <p className="font-extralight text-sm sm:text-base lg:text-[25px] leading-relaxed lg:leading-[24px]">
          {movies.map((movie, index) => (
            <span key={movie}>
              {movie}
              {index < movies.length - 1 && <span className="font-bold"> • </span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
