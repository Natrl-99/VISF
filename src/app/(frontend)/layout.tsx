import type { Metadata } from 'next'
import { Stack_Sans_Text } from 'next/font/google'
import './../globals.css'


const stackSansText = Stack_Sans_Text({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-visf-text-loaded',
  display: 'swap',
})

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
    <html lang="en" className={stackSansText.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}