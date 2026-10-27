import { Link, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { getDiscount, money } from '../utils/shop.js'

export default function ProductDetail() {
  const { id } = useParams()
  const { products, addToCart } = useStore()
  const product = products.find(p => p.id === Number(id))
  if (!product) return <section className="container section-space empty-state"><h2>Producto no encontrado</h2><Link to="/productos">Volver al catálogo</Link></section>
  return <section className="container section-space"><Link to="/productos" className="text-link">← Volver a productos</Link><div className="row g-4 g-lg-5 align-items-center mt-2"><div className="col-lg-6"><div className="detail-art"><span aria-hidden="true">{product.emoji}</span></div></div><div className="col-lg-6"><span className="kicker">{product.categoria} / SKU NX-{String(product.id).padStart(4, '0')}</span><h1 className="detail-title mt-3">{product.nombre}</h1><p className="text-secondary fs-5">{product.descripcion}</p><div className="d-flex align-items-center gap-3 my-4"><strong className="detail-price">{money(product.precio)}</strong>{getDiscount(product) > 0 && <><s className="old-price">{money(product.anterior)}</s><span className="discount">-{getDiscount(product)}%</span></>}</div><p className="availability">● {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}</p><button className="btn btn-primary btn-lg w-100" disabled={product.stock <= 0} onClick={() => addToCart(product)}>Agregar al carrito 🛒</button><div className="detail-note">✓ Compra fácil &nbsp; ✓ Resumen del pedido &nbsp; ✓ Atención personalizada</div></div></div></section>
}
