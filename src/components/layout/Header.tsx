'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaVimeoV } from 'react-icons/fa'
import SubmitFilmButton from '@/components/ui/SubmitFilmButton'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import type { Dictionary } from '@/app/(frontend)/[lang]/dictionaries'

const HEADER_HEIGHT = 'h-20 sm:h-24 lg:h-36'
const CONTACT_EMAIL = 'victormgb99@gmail.com'

type HeaderProps = {
  lang: string
  dict: Dictionary
}

export default function Header({ lang, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_LINKS = [
    { key: 'submit', label: dict.nav.submitFilm, href: null },
    { key: 'official-selection', label: dict.nav.officialSelection, href: `/${lang}/official-selection` },
    { key: 'online-sessions', label: dict.nav.onlineSessions, href: `/${lang}/online-sessions` },
    { key: 'jury', label: dict.nav.meetTheJury, href: `/${lang}#jury` },
    { key: 'categories', label: dict.nav.categories, href: `/${lang}#categories` },
    { key: 'gallery', label: dict.nav.gallery, href: `/${lang}/gallery` },
    { key: 'contact', label: dict.nav.contactUs, href: null },
  ] as const

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${HEADER_HEIGHT} flex items-center gap-2 bg-white px-4 sm:px-6 lg:px-12 font-visf-text text-black`}
      >
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label={dict.header.openMenu}
            className="flex h-10 w-6 shrink-0 flex-col items-stretch justify-center gap-1.5 sm:h-12 sm:w-8 sm:gap-2 lg:w-[38px]"
          >
            <span className="h-px w-full bg-black" />
            <span className="h-px w-full bg-black" />
            <span className="h-px w-full bg-black" />
          </button>
        </div>

        <Link
          href={`/${lang}`}
          aria-label={dict.header.backToHome}
          className="shrink-0"
        >
          <Image
            src="/brand/LOGO-VISF-BLACK.png"
            alt={dict.header.logoAlt}
            width={238}
            height={118}
            preload
            className="h-14 w-auto sm:h-16 lg:h-24"
          />
        </Link>

        <div className="flex-1 flex flex-col items-end gap-1.5 sm:gap-2">
          <LanguageSwitcher currentLang={lang} />
          <SubmitFilmButton className="text-xs sm:text-sm lg:text-[16px] leading-[14px] font-medium text-black bg-visf-accent px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-[16px] whitespace-nowrap hover:underline">
            {dict.cta.submitFilm}
          </SubmitFilmButton>
        </div>
      </header>

      {/* Spacer to offset the fixed header's height */}
      <div className={HEADER_HEIGHT} aria-hidden="true" />

      {/* Side menu */}
      <div
        className={`fixed inset-0 z-[60] transition ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white p-6 transition-transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <button onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-s text-neutral-500 mb-8">
            <X size={14} /> {dict.header.closeMenu}
          </button>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((item) =>
              item.key === 'submit' ? (
                <SubmitFilmButton key={item.key} className="text-base uppercase text-neutral-800 text-left">
                  {item.label}
                </SubmitFilmButton>
              ) : item.href ? (
                <Link key={item.key} href={item.href} className="text-base uppercase text-neutral-800">
                  {item.label}
                </Link>
              ) : (
                <a key={item.key} href={`mailto:${CONTACT_EMAIL}`} className="text-base uppercase text-neutral-800">
                  {item.label}
                </a>
              )
            )}
          </nav>
          <div className="flex gap-3 mt-10 text-neutral-700">
            <a
              href="https://www.instagram.com/visfverona?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a> 
            <FaVimeoV size={24} />
          </div>
        </div>
      </div>
    </>
  )
}