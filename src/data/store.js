/** Persistencia del catálogo y los pedidos mediante almacenamiento local. */
export const PRODUCT_KEY = 'nexo_productos_v2'
export const ORDER_KEY = 'nexo_ordenes_v2'
export const USER_KEY = 'nexo_usuarios_v2'

export const seedProducts = [
  { id: 1, nombre: 'Mouse Vector RGB', categoria: 'Periféricos', precio: 18990, anterior: 25990, stock: 18, etiqueta: 'Más vendido', emoji: '🖱️', descripcion: 'Mouse gamer ergonómico con iluminación RGB y seis botones configurables.' },
  { id: 2, nombre: 'Teclado Nova Mecánico', categoria: 'Periféricos', precio: 42990, anterior: 54990, stock: 12, etiqueta: 'Oferta', emoji: '⌨️', descripcion: 'Teclado mecánico compacto, retroiluminado y cómodo para largas sesiones.' },
  { id: 3, nombre: 'Audífonos Pulse Pro', categoria: 'Audio', precio: 34990, anterior: 44990, stock: 9, etiqueta: 'Oferta', emoji: '🎧', descripcion: 'Audífonos over-ear con micrófono flexible y sonido envolvente.' },
  { id: 4, nombre: 'Parlante Orbit Mini', categoria: 'Audio', precio: 22990, anterior: null, stock: 16, etiqueta: 'Nuevo', emoji: '🔊', descripcion: 'Parlante de escritorio compacto con conexión USB y diseño moderno.' },
  { id: 5, nombre: 'Mousepad XL Galaxy', categoria: 'Accesorios', precio: 12990, anterior: 16990, stock: 25, etiqueta: 'Oferta', emoji: '🪐', descripcion: 'Superficie amplia y base antideslizante para mouse y teclado.' },
  { id: 6, nombre: 'Soporte Headset Edge', categoria: 'Accesorios', precio: 9990, anterior: null, stock: 20, etiqueta: 'Popular', emoji: '🎮', descripcion: 'Soporte para audífonos con base estable que ordena tu escritorio.' },
  { id: 7, nombre: 'Webcam Focus HD', categoria: 'Streaming', precio: 39990, anterior: 49990, stock: 7, etiqueta: 'Oferta', emoji: '📷', descripcion: 'Webcam HD con montaje ajustable para clases, reuniones y streaming.' },
  { id: 8, nombre: 'Luz Stream Ring', categoria: 'Streaming', precio: 16990, anterior: null, stock: 14, etiqueta: 'Nuevo', emoji: '💡', descripcion: 'Luz circular USB con intensidad ajustable para videollamadas.' }
]

const read = (key, fallback) => {
  try {
    const content = localStorage.getItem(key)
    if (!content) return fallback
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : fallback
  } catch { return fallback }
}
const write = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export const getProducts = () => read(PRODUCT_KEY, seedProducts.map(p => ({ ...p })))
export const getProduct = (id) => getProducts().find(p => p.id === Number(id))
export function createProduct(data) {
  const products = getProducts()
  const id = Math.max(0, ...products.map(p => Number(p.id) || 0)) + 1
  const product = { ...data, id }
  write(PRODUCT_KEY, [...products, product])
  return product
}
export function updateProduct(id, changes) {
  const products = getProducts()
  if (!products.some(p => p.id === Number(id))) return null
  const updated = products.map(p => p.id === Number(id) ? { ...p, ...changes, id: Number(id) } : p)
  write(PRODUCT_KEY, updated)
  return updated.find(p => p.id === Number(id))
}
export function deleteProduct(id) {
  const products = getProducts()
  const kept = products.filter(p => p.id !== Number(id))
  if (kept.length === products.length) return false
  write(PRODUCT_KEY, kept)
  return true
}
export function saveOrder(order) {
  const orders = read(ORDER_KEY, [])
  write(ORDER_KEY, [...orders, order])
  return order
}
export const getOrders = () => read(ORDER_KEY, [])
export const getUsers = () => read(USER_KEY, [])
export const saveUser = user => {
  const people = getUsers()
  if (people.some(p => p.email.toLowerCase() === user.email.toLowerCase())) return false
  // La cuenta guarda información básica y no implementa autenticación.
  write(USER_KEY, [...people, { nombre: user.nombre, email: user.email }])
  return true
}
