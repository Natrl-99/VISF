'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'

type VideoBannerProps = {
  headline: string
  posterUrl: string
  videoUrl: string | null
}

export default function VideoBanner({ headline, posterUrl, videoUrl }: VideoBannerProps) {
  const [playerOpen, setPlayerOpen] = useState(false)
  const words = headline.split(' ')

  return (
    <section className="font-visf-headline px-6 pb-16 max-w-5xl mx-auto">
      {playerOpen && videoUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={() => setPlayerOpen(false)}
        >
          <video
            src={videoUrl}
            className="max-w-3xl w-full rounded-md"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={() => setPlayerOpen(false)} className="absolute top-6 right-6 text-white">
            <X size={24} />
          </button>
        </div>
      )}

      <div className="relative rounded-visf-card overflow-hidden border-2 border-visf-accent">
        <img src={posterUrl} alt="" className="w-full h-[280px] object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <p className="absolute bottom-6 left-6 text-white text-2xl sm:text-[64px] font-medium leading-tight">
          {words.slice(0, -2).join(' ')}
          <br />
          {words.slice(-2).join(' ')}
        </p>
        <button
          onClick={() => videoUrl && setPlayerOpen(true)}
          disabled={!videoUrl}
          className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition disabled:opacity-50"
        >
          <Play size={18} className="text-neutral-900 ml-0.5" fill="currentColor" />
        </button>
      </div>
    </section>
  )
}