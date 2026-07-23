'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaVimeoV } from 'react-icons/fa'
import SubmitFilmButton from '@/components/ui/SubmitFilmButton'

const NAV_LINKS = [
  'Submit your film',
  'Official Selection',
  'Online Sessions',
  'Meet the Jury',
  'Categories',
  'Gallery',
]

const HEADER_HEIGHT = 'h-20 sm:h-24 lg:h-36'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${HEADER_HEIGHT} flex items-center justify-between bg-white px-4 sm:px-6 lg:px-12 font-visf-text text-black`}
      >
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-6 shrink-0 flex-col items-stretch justify-center gap-1.5 sm:h-12 sm:w-8 sm:gap-2 lg:w-[38px]"
        >
          <span className="h-px w-full bg-black" />
          <span className="h-px w-full bg-black" />
          <span className="h-px w-full bg-black" />
        </button>

        <Link
          href="/"
          aria-label="VISF — Back to home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/LOGO-VISF-BLACK.png"
            alt="VISF — Verona International Short Film Festival"
            width={238}
            height={118}
            preload
            className="h-14 w-auto sm:h-16 lg:h-24"
          />
        </Link>

        <div className="flex flex-col items-end gap-1.5 sm:gap-2">
          <span className="text-xs font-medium leading-tight text-black sm:text-sm sm:leading-6 lg:text-base lg:leading-9 hover:underline">
            ENG/IT
          </span>
          <SubmitFilmButton className="text-[16px] leading-[14px] font-medium text-black bg-visf-accent px-3 py-1.5 rounded-[16px] whitespace-nowrap hover:underline" />
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
          className={`absolute top-0 left-0 h-full w-64 bg-white p-6 transition-transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-8">
            <X size={14} /> Close
          </button>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((label) =>
              label === 'Submit your film' ? (
                <SubmitFilmButton key={label} className="text-sm font-semibold uppercase text-neutral-800 text-left">
                  {label}
                </SubmitFilmButton>
              ) : label === 'Official Selection' ? (
                <Link key={label} href="/official-selection" className="text-sm font-semibold uppercase text-neutral-800">
                  {label}
                </Link>
              ) : label === 'Gallery' ? (
                <Link key={label} href="/gallery" className="text-sm font-semibold uppercase text-neutral-800">
                  {label}
                </Link>
              ) : (
                <a key={label} href="#" className="text-sm font-semibold uppercase text-neutral-800">
                  {label}
                </a>
              )
            )}
          </nav>
          <div className="flex gap-3 mt-10 text-neutral-700">
            <FaInstagram size={16} />
            <FaVimeoV size={16} />
          </div>
        </div>
      </div>
    </>
  )
}