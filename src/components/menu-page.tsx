'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { categories, formatPrice, menu } from '@/data/menu'
import { useCart } from '@/components/cart-context'
import SiteHeader from '@/components/site-header'

export default function MenuPage() {
  const { add, count, items } = useCart()
  const [detailProduct, setDetailProduct] = useState<(typeof menu)[number] | null>(null)
  const detailDialogRef = useRef<HTMLDialogElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [addedId, setAddedId] = useState<string | null>(null)
  const visibleItems = activeCategory === 'All' ? menu : menu.filter((item) => item.category === activeCategory)
  const displayedSections = activeCategory === 'All'
    ? categories.map((category) => ({ category, products: menu.filter((product) => product.category === category) })).filter((section) => section.products.length > 0)
    : [{ category: activeCategory, products: visibleItems }]

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category')
    if (requested && categories.includes(requested)) setActiveCategory(requested)
  }, [])

  useEffect(() => {
    const dialog = detailDialogRef.current
    if (!dialog) return
    if (detailProduct && !dialog.open) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      dialog.showModal()
      return () => { document.body.style.overflow = previousOverflow }
    }
    if (!detailProduct && dialog.open) dialog.close()
  }, [detailProduct])

  function addToCart(product: (typeof menu)[number]) {
    if (items.some((line) => line.product.id === product.id)) return
    add(product)
    setAddedId(product.id)
    window.setTimeout(() => setAddedId((current) => current === product.id ? null : current), 1100)
  }

  function renderProductCard(product: (typeof menu)[number], index: number) {
    const isAdded = items.some((line) => line.product.id === product.id)
    const explodedImage = product.id === 'rockstar-burger'
      ? '/assets/burger/exploded%20rockstar%20special%20burger.png'
      : product.id === 'zinger-burger'
        ? '/assets/burger/exploded%20zinger%20burger.png'
        : null
    return <article className="product-card" key={product.id} style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}>
      <div className="product-image">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 600px) 48vw, (max-width: 1000px) 31vw, 23vw" priority={activeCategory === 'All' ? menu.slice(0, 4).some((item) => item.id === product.id) : index < 4} />
        {explodedImage && <button type="button" className="burger-detail-trigger" onClick={() => setDetailProduct(product)} aria-label={`View ${product.name} details and exploded view`}><span>VIEW BURGER <b>↗</b></span></button>}
        <span className="product-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="product-detail"><div className="product-category">{product.category}</div><h2>{product.name}</h2><p>{product.note}</p><div className="product-buy"><strong>{formatPrice(product.price)}</strong><button type="button" className={isAdded ? 'add-button added' : 'add-button'} onClick={() => addToCart(product)} disabled={isAdded} aria-label={isAdded ? `${product.name} added to cart` : `Add ${product.name} to cart`}>{isAdded ? 'ADDED ✓' : 'ADD TO CART +'}</button></div></div>
    </article>
  }

  return <main className="catalog-page">
    <SiteHeader activePage="menu" />
    <section className="catalog-hero">
      <div className="eyebrow">THE FULL SETLIST · 34 PICKS</div>
      <h1>TAKE YOUR<br />PICK. <em>MAKE A NIGHT.</em></h1>
      <p>Settle the cravings. The full menu, from first track to encore.</p>
      <div className="catalog-tape"><span>MADE FRESH · SERVED LOUD · OPEN TILL 3 AM · </span><span>MADE FRESH · SERVED LOUD · OPEN TILL 3 AM · </span></div>
    </section>

    <section className="catalog-content" id="catalog">
      <div className="catalog-toolbar"><div className="catalog-count">{visibleItems.length.toString().padStart(2, '0')} ITEMS <span>·</span> {activeCategory.toUpperCase()}</div><Link className="catalog-cart-mobile" href="/cart">CART ↗</Link></div>
      <div className="category-filters" aria-label="Filter menu by category">
        {['All', ...categories].map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'category-chip active' : 'category-chip'} aria-pressed={activeCategory === category}>{category}</button>)}
      </div>
      <div className="catalog-sections" key={activeCategory}>
        {displayedSections.map((section) => <section className="catalog-category-section" key={section.category}>
          <div className="catalog-section-heading"><div><span className="catalog-section-kicker">ON THE MENU</span><h2>{section.category}</h2></div><span>{section.products.length.toString().padStart(2, '0')} ITEMS</span></div>
          <div className="catalog-grid">{section.products.map((product, index) => renderProductCard(product, index))}</div>
        </section>)}
      </div>
      <p className="menu-tax-note">5% service charge and GST will be added to the bill.</p>
    </section>
    <footer className="footer"><Link className="footer-brand" href="/">ROCKSTAR <em>CAFE.</em></Link><span>GOOD FOOD. GOOD VIBES ONLY.</span><Link href="/cart">VIEW YOUR CART ↗</Link><div className="footer-copyright">© 2026 ROCKSTAR CAFE & RESTAURANT · ISLAMABAD</div></footer>
    <div className="cart-toast" aria-live="polite">{addedId ? `Added to cart · ${count} ${count === 1 ? 'item' : 'items'}` : ''}</div>
    <dialog ref={detailDialogRef} className="burger-dialog" onClose={() => setDetailProduct(null)} aria-labelledby="burger-dialog-title">
      {detailProduct && <div className="burger-dialog-content">
        <button type="button" className="burger-dialog-close" onClick={() => detailDialogRef.current?.close()} aria-label="Close burger details">×</button>
        <div className="burger-dialog-art"><Image src={detailProduct.id === 'zinger-burger' ? '/assets/burger/exploded%20zinger%20burger.png' : '/assets/burger/exploded%20rockstar%20special%20burger.png'} alt={`Exploded view of ${detailProduct.name}`} fill sizes="(max-width: 720px) 90vw, 48vw" /></div>
        <div className="burger-dialog-copy"><div className="eyebrow">THE HEADLINER · {detailProduct.category.toUpperCase()}</div><h2 id="burger-dialog-title">{detailProduct.name}</h2><p>{detailProduct.note}. Explore every layer of this house favourite.</p><strong>{formatPrice(detailProduct.price)}</strong><button type="button" className={items.some((line) => line.product.id === detailProduct.id) ? 'add-button added' : 'add-button'} onClick={() => addToCart(detailProduct)} disabled={items.some((line) => line.product.id === detailProduct.id)}>{items.some((line) => line.product.id === detailProduct.id) ? 'ADDED ✓' : 'ADD TO CART +'}</button></div>
      </div>}
    </dialog>
  </main>
}
