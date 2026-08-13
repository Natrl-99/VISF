'use client'

import { useState } from 'react'
import { Mail, X } from 'lucide-react'
import GrayscaleHoverImage from '@/components/ui/GrayscaleHoverImage'
import { CONTACT_EMAIL } from '@/lib/constants'

type JoinScreeningCardProps = {
  url: string | null
  imageUrl: string
  line1: string
  line2: string
  unavailableMessage: string
  contactLabel: string
  className: string
  captionClassName: string
}

export default function JoinScreeningCard({
  url,
  imageUrl,
  line1,
  line2,
  unavailableMessage,
  contactLabel,
  className,
  captionClassName,
}: JoinScreeningCardProps) {
  const [showUnavailable, setShowUnavailable] = useState(false)

  const cardContent = (
    <>
      <GrayscaleHoverImage src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
      <p className={captionClassName}>
        {line1}
        <br />
        {line2}
      </p>
    </>
  )

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {cardContent}
      </a>
    )
  }

  return (
    <>
      <button type="button" onClick={() => setShowUnavailable(true)} className={className}>
        {cardContent}
      </button>

      {showUnavailable && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowUnavailable(false)}
        >
          <div
            className="relative bg-white rounded-visf-card max-w-sm w-full p-8 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowUnavailable(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
            >
              <X size={20} />
            </button>
            <p className="font-visf-headline font-medium text-lg mb-6">{unavailableMessage}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-visf-accent rounded-visf-card px-6 py-3 font-visf-headline font-medium hover:underline"
            >
              <Mail size={18} />
              {contactLabel}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
