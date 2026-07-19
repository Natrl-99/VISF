import Image from "next/image";
interface GrayscaleHoverImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export default function GrayscaleHoverImage({
  src,
  alt,
  className,
  loading = "lazy",
}: GrayscaleHoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      loading={loading}
      className={`grayscale hover:grayscale-0 group-hover:grayscale-0 transition-[filter] duration-500 ${className ?? ""}`}
    />
  );
}
