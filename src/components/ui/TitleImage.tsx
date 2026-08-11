import Image from 'next/image'

type TitleImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  loading?: 'eager' | 'lazy'
}

// Renders a per-locale title graphic when one has been provided, and falls
// back to the plain translated string otherwise — lets a title be wired up
// for image swap-in before the final art exists.
export default function TitleImage({ src, alt, width, height, className, loading = 'lazy' }: TitleImageProps) {
  if (!src) {
    return <>{alt}</>
  }

  return <Image src={src} alt={alt} width={width} height={height} className={className} loading={loading} />
}
