import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import { useStore } from '../context/StoreContext.jsx'

export default function Home() {
  const { products, addToCart } = useStore()
  return <>
    <section className="container py-4 py-lg-5">
      <div className="hero row g-0 align-items-center">
        <div className="col-lg-7 hero-copy"><div className="eyebrow">⚡ EQUIPA TU SETUP</div><h1>Tu próximo nivel <br /><em>comienza aquí.</em></h1><p>Tecnología, periféricos y accesorios con precios que se sienten bien. Arma el espacio que siempre imaginaste.</p><div className="d-flex flex-wrap gap-3 mt-4"><Link className="btn btn-light btn-lg" to="/productos">Explorar productos <span aria-hidden="true">→</span></Link><Link className="btn btn-outline-light btn-lg" to="/ofertas">Ver ofertas</Link></div><div className="hero-proof mt-5"><span>✦ Productos seleccionados</span><span>✦ Atención cercana</span></div></div>
        <div className="col-lg-5 hero-visual" aria-hidden="true"><div className="hero-halo"></div><div className="hero-device">🎧</div><div className="hero-floating floating-top">AUDIO PREMIUM <b>✦</b></div><div className="hero-floating floating-bottom">TU SETUP, TU ESTILO ↗</div></div>
      </div>
    </section>
    <section className="container py-4"><div className="row g-3">
      {[['✦', 'Selección destacada', 'Accesorios para tu espacio'], ['🚚', 'Despacho a domicilio', 'Selecciona tu dirección al comprar'], ['✓', 'Compra sin complicaciones', 'Carrito y pedidos en pocos pasos']].map(([icon, title, subtitle]) => <div className="col-md-4" key={title}><div className="benefit"><span className="benefit-icon">{icon}</span><div><b>{title}</b><small>{subtitle}</small></div></div></div>)}
    </div></section>
    <section className="container section-space"><div className="section-head"><div><span className="kicker">DESCUBRE LO MEJOR</span><h2>Productos destacados<span className="accent">.</span></h2><p>Todo para estudiar, trabajar y jugar.</p></div><Link className="text-link" to="/productos">Ver todo el catálogo →</Link></div><ProductGrid products={products.slice(0, 4)} onAdd={addToCart}/></section>
    <section className="container"><div className="split-banner"><div><span className="kicker">PRECIOS ESPECIALES</span><h2>Actualiza tu setup <br />sin gastar de más.</h2><Link className="btn btn-light mt-3" to="/ofertas">Comprar en oferta →</Link></div><span className="split-art" aria-hidden="true">⌨️</span></div></section>
    <section className="container section-space"><div className="section-head"><div><span className="kicker">ORGANIZA TU ESPACIO</span><h2>Encuentra lo que necesitas<span className="accent">.</span></h2></div></div><div className="row g-3">{[['Periféricos', '🖱️'], ['Audio', '🎧'], ['Accesorios', '🎮'], ['Streaming', '📷']].map(([name, emo]) => <div key={name} className="col-6 col-lg-3"><Link className="category-tile" to={`/productos?categoria=${encodeURIComponent(name)}`}><span>{emo}</span><strong>{name}</strong><small>Explorar →</small></Link></div>)}</div></section>
  </>
}
