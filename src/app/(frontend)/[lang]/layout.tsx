import type { Metadata } from 'next'
import { Stack_Sans_Text } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from './dictionaries'
import './../../globals.css'


const stackSansText = Stack_Sans_Text({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-visf-text-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VISF — Verona International Short Film Festival',
  description: 'Where independent cinema finds its audience.',
  icons: {
    icon: '/cursor-visf.png',
  },
}

export default async function FrontendLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <html lang={lang} className={stackSansText.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}