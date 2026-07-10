import type { Metadata } from 'next'
import './../globals.css'

export const metadata: Metadata = {
  title: 'VISF — Verona International Short Film Festival',
  description: 'Where independent cinema finds its audience.',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}