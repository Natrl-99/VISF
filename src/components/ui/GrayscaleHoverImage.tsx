import Image from "next/image";
interface GrayscaleHoverImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  // Cards in this codebase are full-width below sm:, roughly half-width
  // between sm: and lg:, and capped around 425-800px at lg: and up — this
  // default covers that shape so next/image doesn't default to assuming
  // 100vw (and fetching a full-viewport-sized image) for every card.
  sizes?: string;
}

export default function GrayscaleHoverImage({
  src,
  alt,
  className,
  loading = "lazy",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px",
}: GrayscaleHoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      loading={loading}
      sizes={sizes}
      className={`grayscale hover:grayscale-0 group-hover:grayscale-0 transition-[filter] duration-500 ${className ?? ""}`}
    />
  );
}
