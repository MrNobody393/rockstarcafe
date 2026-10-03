import HomePage from '@/components/home-page'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const restaurantSchema = {
  '@context': 'https://schema.org', '@type': 'Restaurant', name: 'Rockstar Cafe and Restaurant',
  address: { '@type': 'PostalAddress', streetAddress: '1st Floor, Murtaza Heights, Street 94, Faizabad, I-8/4', addressLocality: 'Islamabad', postalCode: '44000', addressCountry: 'PK' },
  telephone: '+92514866611', description: 'Open daily, closes at 3 AM.',
  amenityFeature: { '@type': 'LocationFeatureSpecification', name: 'Rooftop seating', value: true },
  servesCuisine: ['Burgers', 'Cafe', 'Pakistani', 'Continental'],
  ...(siteUrl ? { url: siteUrl, image: new URL('/assets/burger/Burger_Rockstar%20special%20burger.png', siteUrl).toString() } : {}),
}

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} /><HomePage /></>
}
