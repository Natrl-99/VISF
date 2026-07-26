'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const LOCALES = ['en', 'it'] as const

type LanguageSwitcherProps = {
  currentLang: string
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname()

  return (
    <span className="text-xs font-medium leading-tight text-black sm:text-sm sm:leading-6 lg:text-base lg:leading-9">
      {LOCALES.map((locale, i) => {
        const segments = pathname.split('/')
        segments[1] = locale
        const href = segments.join('/') || `/${locale}`

        return (
          <span key={locale}>
            {i > 0 && '/'}
            <Link
              href={href}
              aria-current={locale === currentLang ? 'true' : undefined}
              className={locale === currentLang ? 'font-bold underline' : 'hover:underline'}
            >
              {locale === 'en' ? 'ENG' : 'IT'}
            </Link>
          </span>
        )
      })}
    </span>
  )
}
