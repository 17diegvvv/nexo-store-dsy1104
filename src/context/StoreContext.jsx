import { createContext, useContext, useEffect, useState } from 'react'
import { getProducts } from '../data/store.js'
import { cartCount, cartTotal } from '../utils/shop.js'

const StoreContext = createContext(null)
const CART_KEY = 'nexo_carrito_v2'
function initialCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch { return [] }
}
export function StoreProvider({ children }) {
  const [products, setProducts] = useState(getProducts)
  const [cart, setCart] = useState(initialCart)
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)) }, [cart])

  const refreshProducts = () => setProducts(getProducts())
  const addToCart = product => {
    setCart(previous => {
      const found = previous.find(x => x.id === product.id)
      if (found) return previous.map(x => x.id === product.id ? { ...x, cantidad: Math.min(product.stock, x.cantidad + 1), precio: product.precio } : x)
      return product.stock > 0 ? [...previous, { id: product.id, nombre: product.nombre, precio: product.precio, emoji: product.emoji, cantidad: 1 }] : previous
    })
  }
  const updateQuantity = (id, cantidad) => setCart(old => old.map(x => {
    if (x.id !== id) return x
    const product = products.find(p => p.id === id)
    return { ...x, cantidad: Math.min(Number(product?.stock) || x.cantidad, Math.max(1, Number(cantidad) || 1)) }
  }))
  const removeFromCart = id => setCart(old => old.filter(x => x.id !== id))
  const clearCart = () => setCart([])
  return <StoreContext.Provider value={{ products, cart, count: cartCount(cart), total: cartTotal(cart), refreshProducts, addToCart, updateQuantity, removeFromCart, clearCart }}>{children}</StoreContext.Provider>
}
export function useStore() {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore necesita StoreProvider')
  return value
}
