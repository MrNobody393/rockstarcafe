import type { Metadata, Viewport } from 'next'
import { CartProvider } from '@/components/cart-context'
import './globals.css'
import './commerce.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: 'Rockstar Cafe & Restaurant | Islamabad',
  description: 'Visit Rockstar Cafe in I-8/4, Islamabad for burgers, steaks, cafe favourites and rooftop views. Open daily until 3 AM at Murtaza Heights.',
  applicationName: 'Rockstar Cafe & Restaurant',
  keywords: ['Rockstar Cafe Islamabad', 'restaurant in Islamabad', 'rooftop cafe Islamabad', 'I-8/4 restaurants', 'Murtaza Heights cafe'],
  icons: { icon: '/icon.svg', shortcut: '/icon.svg' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: 'Rockstar Cafe & Restaurant | Islamabad',
    description: 'Burgers, cafe favourites and rooftop views at Murtaza Heights, I-8/4, Islamabad. Open daily until 3 AM.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'Rockstar Cafe & Restaurant',
    images: siteUrl ? [{ url: '/assets/Hero%20section.png', width: 1448, height: 1086, alt: 'Inside Rockstar Cafe in Islamabad' }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rockstar Cafe & Restaurant | Islamabad',
    description: 'Burgers, cafe favourites and rooftop views at Murtaza Heights, I-8/4, Islamabad.',
    images: siteUrl ? ['/assets/Hero%20section.png'] : undefined,
  },
}

export const viewport: Viewport = { themeColor: '#100e0c', colorScheme: 'dark' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html>
}
