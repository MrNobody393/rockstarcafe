'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { formatPrice } from '@/data/menu'
import { useCart, type CartLine } from '@/components/cart-context'
import SiteHeader from '@/components/site-header'

export default function CartPage() {
  const { items, hydrated, subtotal, update, remove, clear } = useCart()
  const [confirmed, setConfirmed] = useState<CartLine[] | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (items.length === 0) return
    setConfirmed(items)
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <main className="cart-page">
    <SiteHeader activePage="cart" />
    <section className="cart-main">
      {confirmed ? <div className="order-confirmation">
        <div className="eyebrow">CHECKOUT PREVIEW</div><div className="confirmation-star">✳</div><h1>ORDER<br /><em>READY.</em></h1>
        <p>Your order summary is ready. This is a confirmation preview only; no order has been sent to the cafe.</p>
        <div className="confirmation-items">{confirmed.map((line) => <div key={line.product.id}><span>{line.quantity} × {line.product.name}</span><b>{formatPrice(line.product.price * line.quantity)}</b></div>)}</div>
        <div className="confirmation-total"><span>ORDER TOTAL</span><strong>{formatPrice(confirmed.reduce((sum, line) => sum + line.product.price * line.quantity, 0))}</strong></div>
        <div className="confirmation-actions"><Link className="button button-hot" href="/menu">BACK TO THE MENU ↗</Link><a className="text-link" href="tel:+92514866611">Want to order now? Call (051) 4866611 ↗</a></div>
      </div> : <>
        <div className="cart-heading"><div className="eyebrow">YOUR NIGHT, YOUR ORDER</div><h1>THE <em>LINEUP.</em></h1></div>
        {!hydrated ? null : items.length === 0 ? <div className="empty-cart"><div className="empty-mark">✳</div><h2>NOTHING ON THE SETLIST YET.</h2><p>Add a few favourites and we’ll line them up here.</p><Link href="/menu" className="button button-hot">BROWSE THE FULL MENU <span>↗</span></Link></div> : <div className="cart-layout">
          <div className="cart-lines">{items.map(({ product, quantity }) => <article className="cart-line" key={product.id}>
            <div className="cart-line-photo"><Image src={product.image} alt={product.name} fill sizes="100px" /></div>
            <div className="cart-line-info"><span>{product.category}</span><h2>{product.name}</h2><b>{formatPrice(product.price)}</b></div>
            <div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button type="button" onClick={() => update(product.id, quantity - 1)} aria-label={`Remove one ${product.name}`}>−</button><span>{quantity}</span><button type="button" onClick={() => update(product.id, quantity + 1)} aria-label={`Add one ${product.name}`}>+</button></div>
            <strong className="line-total">{formatPrice(product.price * quantity)}</strong>
            <button className="remove-line" type="button" onClick={() => remove(product.id)} aria-label={`Delete ${product.name} from cart`} title="Remove from cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" /></svg></button>
          </article>)}</div>
          <aside className="order-summary"><div className="eyebrow">THE TALLY</div><h2>ORDER SUMMARY</h2><div className="summary-row"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><p>5% service charge and GST will be added to the bill.</p><div className="summary-total"><span>TOTAL</span><strong>{formatPrice(subtotal)}</strong></div>
            {checkoutOpen ? <form className="checkout-form" onSubmit={placeOrder}>
              <div className="eyebrow">DELIVERY DETAILS</div>
              <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
              <label>Phone number<input type="tel" name="phone" autoComplete="tel" placeholder="03xx xxxxxxx" required /></label>
              <label>Delivery address<textarea name="address" autoComplete="street-address" rows={3} placeholder="Street, area, city" required /></label>
              <button type="submit" className="place-order-button">CONFIRM ORDER <span>↗</span></button>
              <button type="button" className="checkout-back" onClick={() => setCheckoutOpen(false)}>BACK TO CART</button>
              <div className="confirmation-disclaimer">Demo checkout only. Your details and order won’t be sent to the cafe.</div>
            </form> : <><button type="button" className="place-order-button" onClick={() => setCheckoutOpen(true)}>PLACE ORDER <span>↗</span></button><div className="confirmation-disclaimer">Checkout confirmation only. This won’t send your order to the cafe.</div></>}
          </aside>
        </div>}
      </>}
    </section>
    <footer className="footer"><Link className="footer-brand" href="/">ROCKSTAR <em>CAFE.</em></Link><span>GOOD FOOD. GOOD VIBES ONLY.</span><Link href="/menu">BACK TO THE MENU ↗</Link><div className="footer-copyright">© 2026 ROCKSTAR CAFE & RESTAURANT · ISLAMABAD</div></footer>
  </main>
}
