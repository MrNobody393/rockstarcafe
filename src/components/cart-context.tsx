'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { menu, type MenuProduct } from '@/data/menu'

export type CartLine = { product: MenuProduct; quantity: number }
type CartContextValue = {
  items: CartLine[]
  hydrated: boolean
  count: number
  subtotal: number
  add: (product: MenuProduct) => void
  update: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = 'rockstar-cafe-cart-v1'

function restoreCart(raw: string | null): CartLine[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const restored = new Map<string, number>()
    for (const entry of parsed) {
      if (!entry || typeof entry !== 'object') continue
      const line = entry as { product?: { id?: unknown }; quantity?: unknown }
      const id = line.product?.id
      const quantity = line.quantity
      if (typeof id !== 'string' || !Number.isInteger(quantity) || (quantity as number) < 1) continue
      const product = menu.find((item) => item.id === id)
      if (!product) continue
      restored.set(id, Math.min(99, (restored.get(id) ?? 0) + Math.min(99, quantity as number)))
    }
    return [...restored].map(([id, quantity]) => ({ product: menu.find((item) => item.id === id)!, quantity }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      setItems(restoreCart(localStorage.getItem(storageKey)))
    } catch {
      setItems([])
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(items))
      } catch {
        // Keep the in-memory cart usable when browser storage is unavailable.
      }
    }
  }, [hydrated, items])

  const value = useMemo<CartContextValue>(() => ({
    items,
    hydrated,
    count: items.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: items.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    add: (product) => setItems((current) => {
      const existing = current.find((line) => line.product.id === product.id)
      return existing
        ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }]
    }),
    update: (productId, quantity) => setItems((current) => quantity < 1
      ? current.filter((line) => line.product.id !== productId)
      : current.map((line) => line.product.id === productId ? { ...line, quantity } : line)),
    remove: (productId) => setItems((current) => current.filter((line) => line.product.id !== productId)),
    clear: () => setItems([]),
  }), [items, hydrated])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside CartProvider')
  return value
}
