import Image from "next/image";
interface GrayscaleHoverImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function GrayscaleHoverImage({
  src,
  alt,
  className,
}: GrayscaleHoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      className={`grayscale hover:grayscale-0 group-hover:grayscale-0 transition-[filter] duration-500 ${className ?? ""}`}
    />
  );
}
