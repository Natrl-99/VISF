import React from "react";
import Image from "next/image";

export function Icon() {
  return (
    <div>
      <Image
        className="w-10 h-5"
        src="/ICON-VISF-BLACK.png"
        alt="VISF Icon"
        width={48}
        height={48}
      />
    </div>
  );
}
