import type { Metadata } from 'next'
import FindUsPage from '@/components/find-us-page'

export const metadata: Metadata = {
  title: 'Find Us | Rockstar Cafe & Restaurant',
  description: 'Visit Rockstar Cafe at Murtaza Heights in I-8/4, Islamabad. Find our address, hours, phone number, and contact form.',
}

export default function Page() {
  return <FindUsPage />
}
