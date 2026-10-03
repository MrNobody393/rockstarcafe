import MenuPage from '@/components/menu-page'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title: 'Full Menu | Rockstar Cafe & Restaurant',
  description: 'Explore the Rockstar Cafe menu in Islamabad: burgers, sandwiches, starters, steaks, seafood, pasta, cocktails and more.',
  openGraph: {
    title: 'Full Menu | Rockstar Cafe & Restaurant',
    description: 'Explore burgers, sandwiches, steaks, seafood, pasta, cocktails and cafe favourites in Islamabad.',
    images: siteUrl ? [{ url: '/assets/burger/Burger_Rockstar%20special%20burger.png', alt: 'Rockstar Special Burger' }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Menu | Rockstar Cafe & Restaurant',
    description: 'Explore burgers, sandwiches, steaks, seafood, pasta, cocktails and cafe favourites in Islamabad.',
    images: siteUrl ? ['/assets/burger/Burger_Rockstar%20special%20burger.png'] : undefined,
  },
}

export default function Page() {
  return <MenuPage />
}
