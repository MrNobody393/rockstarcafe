import type { Metadata } from 'next'
import FindUsPage from '@/components/find-us-page'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title: 'Find Us | Rockstar Cafe & Restaurant',
  description: 'Plan your visit to Rockstar Cafe at Murtaza Heights, I-8/4, Islamabad. Get the address, phone number, opening information and directions.',
  openGraph: {
    title: 'Find Rockstar Cafe | I-8/4, Islamabad',
    description: 'Find our address, phone number and directions to Rockstar Cafe at Murtaza Heights in Islamabad.',
    images: siteUrl ? [{ url: '/assets/Hero%20section.png', alt: 'Inside Rockstar Cafe in Islamabad' }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Rockstar Cafe | I-8/4, Islamabad',
    description: 'Find our address, phone number and directions to Rockstar Cafe at Murtaza Heights in Islamabad.',
    images: siteUrl ? ['/assets/Hero%20section.png'] : undefined,
  },
}

export default function Page() {
  return <FindUsPage />
}
