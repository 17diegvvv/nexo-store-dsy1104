import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { getProducts, saveOrder } from '../data/store.js'
import { money, validateCheckout } from '../utils/shop.js'

const customerFields = [
  ['nombre', 'Nombre'],
  ['apellido', 'Apellido'],
  ['email', 'Correo electrónico'],
  ['telefono', 'Teléfono'],
]
const deliveryFields = [
  ['direccion', 'Calle y número'],
  ['comuna', 'Comuna'],
]
const regions = [
  'Metropolitana de Santiago', 'Valparaíso', 'Biobío',
  'La Araucanía', 'Coquimbo', 'Los Lagos', 'Otra región',
]
const initialForm = {
  nombre: '', apellido: '', email: '', telefono: '', direccion: '',
  comuna: '', region: '', entrega: 'domicilio', instrucciones: '',
}

export default function Checkout() {
  const { cart, total, clearCart } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const setField = (key, value) => {
    setForm(previous => ({ ...previous, [key]: value }))
    setErrors(previous => ({ ...previous, [key]: undefined }))
  }

  function submit(event) {
    event.preventDefault()
    const validation = validateCheckout(form)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }
    if (cart.length === 0) return

    const products = getProducts()
    const unavailable = cart.some(item => {
      const product = products.find(entry => entry.id === item.id)
      return !product || product.stock < item.cantidad
    })
    if (unavailable) {
      navigate('/resultado/rechazada', {
        state: { reason: 'Algunos productos cambiaron su disponibilidad. Revisa tu carrito e inténtalo nuevamente.' },
      })
      return
    }

    const order = {
      id: `NX-${Date.now()}`,
      estado: 'pendiente',
      medioPago: 'contra_entrega',
      cliente: { ...form },
      productos: cart.map(product => ({ ...product })),
      total,
      fecha: new Date().toISOString(),
    }
    saveOrder(order)
    clearCart()
    navigate('/resultado/aprobada', { state: { order } })
  }

  if (cart.length === 0) {
    return (
      <section className="container section-space empty-state">
        <h2>Agrega productos para continuar</h2>
        <Link className="btn btn-primary" to="/productos">Ir al catálogo</Link>
      </section>
    )
  }

  return (
    <section className="container section-space">
      <div className="page-heading">
        <span className="kicker">FINALIZA TU COMPRA</span>
        <h1>Datos de tu pedido<span className="accent">.</span></h1>
        <p>Completa tus datos, selecciona la entrega y revisa el resumen de tus productos.</p>
      </div>
      <form noValidate onSubmit={submit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="panel p-4">
              <h2 className="h5 mb-4">1. Información del cliente</h2>
              <div className="row g-3">
                {customerFields.map(([key, label]) => (
                  <div className="col-sm-6" key={key}>
                    <label htmlFor={key} className="form-label">{label} *</label>
                    <input
                      id={key}
                      type={key === 'email' ? 'email' : key === 'telefono' ? 'tel' : 'text'}
                      autoComplete={key === 'email' ? 'email' : key === 'telefono' ? 'tel' : key === 'nombre' ? 'given-name' : 'family-name'}
                      className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                      value={form[key]}
                      onChange={event => setField(key, event.target.value)}
                    />
                    {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                  </div>
                ))}
              </div>

              <hr className="my-4" />
              <h2 className="h5 mb-4">2. Dirección de entrega</h2>
              <div className="row g-3">
                {deliveryFields.map(([key, label]) => (
                  <div className="col-sm-6" key={key}>
                    <label htmlFor={key} className="form-label">{label} *</label>
                    <input
                      id={key}
                      className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                      value={form[key]}
                      onChange={event => setField(key, event.target.value)}
                    />
                    {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                  </div>
                ))}
                <div className="col-sm-6">
                  <label htmlFor="region" className="form-label">Región *</label>
                  <select
                    id="region"
                    className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                    value={form.region}
                    onChange={event => setField('region', event.target.value)}
                  >
                    <option value="">Selecciona una región</option>
                    {regions.map(region => <option key={region} value={region}>{region}</option>)}
                  </select>
                  {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                </div>
                <div className="col-sm-6">
                  <label htmlFor="entrega" className="form-label">Tipo de entrega *</label>
                  <select
                    id="entrega"
                    className="form-select"
                    value={form.entrega}
                    onChange={event => setField('entrega', event.target.value)}
                  >
                    <option value="domicilio">Despacho a domicilio</option>
                    <option value="retiro">Retiro en tienda</option>
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="instrucciones" className="form-label">Indicaciones adicionales (opcional)</label>
                  <textarea
                    id="instrucciones"
                    className="form-control"
                    rows="2"
                    value={form.instrucciones}
                    onChange={event => setField('instrucciones', event.target.value)}
                  />
                </div>
              </div>

              <hr className="my-4" />
              <h2 className="h5 mb-3">3. Método de pago</h2>
              <div className="payment-option">
                <span className="payment-check" aria-hidden="true">✓</span>
                <div>
                  <strong>Pago contra entrega</strong>
                  <p className="text-secondary small mb-0">Paga al momento de recibir tu pedido.</p>
                </div>
                <span className="ms-auto payment-tag">Seleccionado</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="panel p-4 order-summary">
              <h2 className="h5 mb-3">Resumen de compra</h2>
              {cart.map(item => (
                <div className="d-flex justify-content-between gap-3 py-2" key={item.id}>
                  <span>{item.nombre} ×{item.cantidad}</span>
                  <b className="text-nowrap">{money(item.precio * item.cantidad)}</b>
                </div>
              ))}
              <div className="summary-total d-flex justify-content-between border-top mt-3 pt-3">
                <b>Total de productos</b>
                <strong>{money(total)}</strong>
              </div>
              <p className="small text-secondary mt-2">El despacho se coordina según la dirección de entrega.</p>
              <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">Confirmar pedido →</button>
              <Link className="btn btn-link w-100 mt-2" to="/carrito">← Volver al carrito</Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
