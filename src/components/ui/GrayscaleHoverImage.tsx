interface GrayscaleHoverImageProps {
  src: string
  alt: string
  className?: string
}

export default function GrayscaleHoverImage({ src, alt, className }: GrayscaleHoverImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`grayscale hover:grayscale-0 group-hover:grayscale-0 transition-[filter] duration-500 ${className ?? ''}`}
    />
  )
}
