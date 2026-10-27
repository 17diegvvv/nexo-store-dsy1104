import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
const icon = { Periféricos: '🖱️', Audio: '🎧', Accesorios: '🎮', Streaming: '📷' }
export default function Categories() {
  const { products } = useStore()
  const cats = [...new Set(products.map(p => p.categoria))]
  return <section className="container section-space"><div className="page-heading"><span className="kicker">COMPRA POR CATEGORÍA</span><h1>Explora tu estilo<span className="accent">.</span></h1><p>Todo organizado para encontrar justo lo que necesitas.</p></div><div className="row g-4">{cats.map(c => <div className="col-6 col-md-4 col-lg-3" key={c}><Link to={`/productos?categoria=${encodeURIComponent(c)}`} className="category-tile large"><span>{icon[c] || '✨'}</span><strong>{c}</strong><small>{products.filter(p => p.categoria === c).length} productos →</small></Link></div>)}</div></section>
}
