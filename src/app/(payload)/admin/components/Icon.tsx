import React from "react";
import Image from "next/image";

export function Icon() {
  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <Image
        className="w-4 h-4"
        src="/brand/ICON-VISF-BLACK.png"
        alt="VISF Icon"
        width={16}
        height={16}
      />
      <span className="text-xs leading-none">Home</span>
    </div>
  );
}
