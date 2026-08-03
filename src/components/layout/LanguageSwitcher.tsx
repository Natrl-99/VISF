'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const LOCALES = ['en', 'it'] as const

type LanguageSwitcherProps = {
  currentLang: string
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const activeIndex = LOCALES.indexOf(currentLang as (typeof LOCALES)[number])

  return (
    <div className="relative flex items-center rounded-full bg-neutral-200 p-0.5 text-[10px] font-semibold sm:text-xs lg:text-sm">
      <span
        aria-hidden="true"
        className={`absolute inset-y-0.5 left-0.5 w-8 rounded-full bg-black transition-transform duration-200 ease-out sm:w-9 lg:w-10 ${
          activeIndex === 1 ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      {LOCALES.map((locale) => {
        const segments = pathname.split('/')
        segments[1] = locale
        const href = segments.join('/') || `/${locale}`
        const isActive = locale === currentLang

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? 'true' : undefined}
            className={`relative z-10 w-8 rounded-full py-1 text-center transition-colors sm:w-9 lg:w-10 ${
              isActive ? 'text-white' : 'text-black hover:text-neutral-600'
            }`}
          >
            {locale === 'en' ? 'EN' : 'IT'}
          </Link>
        )
      })}
    </div>
  )
}
