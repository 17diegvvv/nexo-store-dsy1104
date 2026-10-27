import { Link } from 'react-router-dom'
import { money, getDiscount } from '../utils/shop.js'

export default function ProductCard({ product, onAdd }) {
  const discount = getDiscount(product)
  return <article className="product-card h-100" data-testid="product-card">
    <Link className="product-art" to={`/producto/${product.id}`} aria-label={`Ver ${product.nombre}`}>
      <span className="art-orbit" aria-hidden="true" />
      <span className="product-emoji" role="img" aria-label={product.categoria}>{product.emoji}</span>
      {product.etiqueta && <span className="product-badge">{product.etiqueta}</span>}
    </Link>
    <div className="p-3 p-lg-4 d-flex flex-column flex-grow-1">
      <small className="kicker mb-2">{product.categoria}</small>
      <Link to={`/producto/${product.id}`} className="product-title">{product.nombre}</Link>
      <div className="mt-auto pt-3">
        <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
          <strong className="product-price">{money(product.precio)}</strong>
          {discount > 0 && <><s className="old-price">{money(product.anterior)}</s><span className="discount">-{discount}%</span></>}
        </div>
        <button className="btn btn-primary w-100" disabled={product.stock <= 0} onClick={() => onAdd(product)}>
          {product.stock > 0 ? '+ Agregar al carrito' : 'Sin stock'}
        </button>
      </div>
    </div>
  </article>
}
