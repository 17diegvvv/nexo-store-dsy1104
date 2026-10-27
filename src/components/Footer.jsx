import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-5">
            <div className="footer-brand">NEXO<span>.</span> STORE</div>
            <p className="text-secondary mt-3 small">Tecnología para tu día a día. Explora periféricos, accesorios y soluciones para potenciar tu espacio.</p>
          </div>
          <div className="col-md-3">
            <h6>Explorar</h6>
            <Link to="/productos">Todos los productos</Link>
            <Link to="/ofertas">Ofertas</Link>
            <Link to="/categorias">Categorías</Link>
          </div>
          <div className="col-md-4">
            <h6>Ayuda y gestión</h6>
            <Link to="/contacto">Contacto</Link>
            <Link to="/ingresar">Mi cuenta</Link>
            <Link to="/admin">Administración</Link>
          </div>
        </div>
        <div className="footer-bottom mt-4 pt-3">© 2026 Nexo Store · Todos los derechos reservados</div>
      </div>
    </footer>
  )
}
