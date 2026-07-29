"use client";

import { useState } from "react";
import { X } from "lucide-react";
import GrayscaleHoverImage from "@/components/ui/GrayscaleHoverImage";

export type GalleryPhoto = {
  id: string;
  url: string;
  alt: string;
};

type GalleryGridProps = {
  photos: GalleryPhoto[];
};

const COLUMN_COUNT = 3;

// Columns 0 and 2 start tall, column 1 starts short — this is what produces
// the staggered masonry look from the Figma spec (each column stacks
// independently, so column 1's shorter first tile makes its second tile
// start higher than columns 0/2's).
function isTallAt(columnIndex: number, rowIndex: number) {
  const startsTall = columnIndex === 0 || columnIndex === 2;
  return startsTall ? rowIndex % 2 === 0 : rowIndex % 2 === 1;
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const columns: GalleryPhoto[][] = Array.from({ length: COLUMN_COUNT }, () => []);
  photos.forEach((photo, index) => {
    columns[index % COLUMN_COUNT].push(photo);
  });

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-[87px] mt-3 lg:mt-6 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:hidden">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            className={`group relative w-full overflow-hidden rounded-visf-card cursor-pointer ${
              index % 2 === 0 ? "h-[240px] sm:h-[320px]" : "h-[162px] sm:h-[216px]"
            }`}
          >
            <GrayscaleHoverImage
              src={photo.url}
              alt={photo.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="hidden lg:flex lg:justify-center lg:gap-x-[38px]">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-y-[29px] lg:w-[425px]">
            {column.map((photo, rowIndex) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative w-full overflow-hidden rounded-visf-card cursor-pointer ${
                  isTallAt(columnIndex, rowIndex) ? "h-[470px]" : "h-[318px]"
                }`}
              >
                <GrayscaleHoverImage
                  src={photo.url}
                  alt={photo.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-[92vw] h-[260px] sm:h-[385px] sm:max-w-[700px] lg:h-[550px] lg:max-w-[1000px] bg-black overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="w-full h-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
}