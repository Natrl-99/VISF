import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { redirect } from 'next/navigation'
import { hasLocale } from './dictionaries'
import './../../globals.css'


const stackSansText = localFont({
  src: [
    { path: './fonts/StackSansText-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: './fonts/StackSansText-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/StackSansText-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/StackSansText-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/StackSansText-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/StackSansText-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-visf-text-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VISF — Verona International Short Film Festival',
  description: 'Where independent cinema finds its audience.',
  icons: {
    icon: '/ui/cursor-visf.png',
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