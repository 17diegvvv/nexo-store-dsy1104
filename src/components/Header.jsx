import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'

const nav = [ ['/', 'Inicio'], ['/productos', 'Productos'], ['/categorias', 'Categorías'], ['/ofertas', 'Ofertas'], ['/contacto', 'Contacto'] ]
export default function Header() {
  const { count, total } = useStore()
  return <>
    <div className="notice-bar">TECNOLOGÍA Y GAMING <span className="mx-2 opacity-50">•</span> ENCUENTRA TU PRÓXIMO FAVORITO</div>
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg container" aria-label="Menú principal">
        <Link to="/" className="navbar-brand brand"><span className="brand-mark">N</span><span>NEXO<span className="brand-accent">.</span><small>STORE</small></span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir menú" onClick={() => document.querySelector('#mainNav')?.classList.toggle('show')}><span className="navbar-toggler-icon" /></button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav mx-auto gap-lg-2">
            {nav.map(([path, label]) => <NavLink end={path === '/'} key={path} to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{label}</NavLink>)}
          </div>
          <div className="d-flex flex-wrap gap-2 header-actions">
            <Link className="btn btn-ghost btn-sm" to="/ingresar">Mi cuenta</Link>
            <Link className="btn btn-dark btn-sm" to="/carrito" aria-label={`Ver carrito, ${count} productos`}>🛒 {count} <span className="small opacity-75 ms-1">{total > 0 ? '• Carrito' : '• Vacío'}</span></Link>
          </div>
        </div>
      </nav>
    </header>
  </>
}
