'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="relative z-10 flex items-center justify-between px-6 py-5 font-visf-text">
        <button onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          <Menu size={22} />
        </button>

        <div className="text-center">
          <p className="font-visf-headline text-lg font-black tracking-tight leading-none">◎ VISF</p>
          <p className="text-[9px] tracking-widest uppercase text-neutral-500 leading-tight mt-0.5">
            Verona International
            <br />
            Short Film Festival
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium hidden sm:inline">ENG/IT</span>
          <SubmitFilmButton className="text-[16px] leading-[14px] font-medium text-black bg-visf-accent px-3 py-1.5 rounded-[16px] whitespace-nowrap" />
        </div>
      </header>

      {/* Side menu */}
      <div
        className={`fixed inset-0 z-40 transition ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
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