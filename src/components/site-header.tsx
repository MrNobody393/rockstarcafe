'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/components/cart-context'

type SiteHeaderProps = {
  activePage: 'home' | 'menu' | 'contact' | 'cart'
  home?: boolean
}

export let hasNavigatedAwayFromHome = false

export default function SiteHeader({ activePage, home = false }: SiteHeaderProps) {
  const { items } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (activePage !== 'home') hasNavigatedAwayFromHome = true
  }, [activePage])

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 48)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return <header className={`site-header${home ? '' : ' catalog-header'}${scrolled ? ' is-scrolled' : ''}`}>
    <Link className="brand" href="/" aria-label="Rockstar Cafe home"><Image src="/assets/rockstar-logo.jpg" width={48} height={48} alt="Rockstar Cafe logo" /><span>ROCKSTAR <small>CAFE & RESTAURANT</small></span></Link>
    <nav aria-label="Main navigation">
      <Link href="/#top" aria-current={activePage === 'home' ? 'page' : undefined}>Home</Link>
      <Link href="/menu" aria-current={activePage === 'menu' ? 'page' : undefined}>Menu</Link>
      <Link href="/find-us" aria-current={activePage === 'contact' ? 'page' : undefined}>Contact</Link>
    </nav>
    <Link className="header-cta cart-icon-link" href="/cart" aria-current={activePage === 'cart' ? 'page' : undefined} aria-label={items.length > 0 ? `View cart, ${items.length} different items` : 'View cart'}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 9H6" /><circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></svg>
      {items.length > 0 && <span className="cart-icon-count">{items.length}</span>}
    </Link>
  </header>
}
