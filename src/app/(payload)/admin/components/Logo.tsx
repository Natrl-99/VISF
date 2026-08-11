import Image from "next/image";

export function Logo() {
  return (
    <div>
      <Image
        className="h-28 w-auto object-contain dark:hidden"
        src="/brand/LOGO-VISF-BLACK.png"
        alt="VISF Logo"
        width={2045}
        height={942}
        priority
      />
      <Image
        className="h-28 w-auto object-contain hidden dark:block"
        src="/brand/LOGO-VISF-WHITE.png"
        alt="VISF Logo"
        width={2045}
        height={942}
        priority
      />
    </div>
  );
}
