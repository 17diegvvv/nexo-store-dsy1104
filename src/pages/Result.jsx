import { Link, useLocation, useParams } from 'react-router-dom'
import { money } from '../utils/shop.js'

export default function Result() {
  const { status } = useParams()
  const { state } = useLocation()
  const order = state?.order
  const success = status === 'aprobada' && Boolean(order)

  return (
    <section className="container section-space">
      <div className="result-panel panel text-center mx-auto p-4 p-md-5">
        <div className={`result-icon ${success ? 'success' : 'failure'}`} aria-hidden="true">
          {success ? '✓' : '!'}
        </div>
        <span className="kicker">{success ? 'CONFIRMACIÓN DE PEDIDO' : 'NO SE PUDO COMPLETAR'}</span>
        <h1 className="my-3">{success ? '¡Recibimos tu pedido!' : 'No pudimos registrar tu pedido'}</h1>
        <p className="text-secondary">
          {success
            ? 'Tu pedido quedó registrado y se encuentra pendiente de coordinación para la entrega.'
            : state?.reason || 'Ocurrió un problema al procesar la solicitud. Revisa tus productos y vuelve a intentarlo.'}
        </p>
        {order && (
          <div className="result-receipt mt-4">
            <div className="d-flex justify-content-between py-2"><span>Número de pedido</span><b>{order.id}</b></div>
            <div className="d-flex justify-content-between py-2"><span>Medio de pago</span><b>Contra entrega</b></div>
            <div className="d-flex justify-content-between py-2"><span>Estado</span><b>Pendiente</b></div>
            <div className="d-flex justify-content-between border-top pt-3 mt-2"><b>Total de productos</b><strong>{money(order.total)}</strong></div>
          </div>
        )}
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
          {!success && <Link className="btn btn-primary" to="/carrito">Revisar carrito →</Link>}
          <Link className="btn btn-outline-dark" to="/productos">Seguir comprando</Link>
        </div>
      </div>
    </section>
  )
}
