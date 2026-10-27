import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, onAdd, emptyMessage = 'No encontramos productos con ese filtro.' }) {
  if (products.length === 0) return <div className="empty-state" role="status">{emptyMessage}</div>
  return <div className="row g-3 g-lg-4" data-testid="product-list">
    {products.map(product => <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}><ProductCard product={product} onAdd={onAdd} /></div>)}
  </div>
}
