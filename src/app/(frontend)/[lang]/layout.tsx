import type { Metadata } from 'next'
import { Stack_Sans_Text } from 'next/font/google'
import { redirect } from 'next/navigation'
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
  // Redirect rather than notFound() here: this layout is the one that
  // renders <html>/<body>, so throwing before returning JSX leaves no
  // document for a not-found.tsx boundary to render into. Redirecting
  // into a valid locale (keeping the bad segment as a sub-path) lets the
  // normal [lang]/not-found.tsx render a proper 404 instead of a 200.
  if (!hasLocale(lang)) redirect(`/en/${lang}`)

  return (
    <html lang={lang} className={stackSansText.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}