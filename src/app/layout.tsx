import type { Metadata } from 'next'
import { CartProvider } from '@/components/cart-context'
import './globals.css'
import './commerce.css'

export const metadata: Metadata = {
  title: 'Rockstar Cafe & Restaurant | Islamabad',
  description: 'Big flavours, late nights and rooftop views in I-8/4, Islamabad. Join us daily until 3 AM.',
  keywords: ['Rockstar Cafe', 'restaurant Islamabad', 'rooftop cafe Islamabad', 'I-8 Islamabad'],
  openGraph: { title: 'Rockstar Cafe & Restaurant', description: 'Good food. Good vibes only. Find your flavour in Islamabad.', type: 'website' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html>
}
