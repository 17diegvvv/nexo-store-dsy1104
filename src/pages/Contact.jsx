import { useState } from 'react'

const CONTACT_KEY = 'nexo_consultas_v2'

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (form.nombre.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) || form.mensaje.trim().length < 10) {
      setError('Completa tu nombre, un correo válido y un mensaje de al menos 10 caracteres.')
      setSent(false)
      return
    }
    try {
      const previous = JSON.parse(localStorage.getItem(CONTACT_KEY) || '[]')
      const entries = Array.isArray(previous) ? previous : []
      localStorage.setItem(CONTACT_KEY, JSON.stringify([...entries, { ...form, fecha: new Date().toISOString() }]))
      setError('')
      setSent(true)
      setForm({ nombre: '', correo: '', mensaje: '' })
    } catch {
      setError('No fue posible guardar la consulta. Inténtalo otra vez.')
    }
  }

  return (
    <section className="container section-space">
      <div className="page-heading">
        <span className="kicker">ESTAMOS PARA AYUDAR</span>
        <h1>Hablemos<span className="accent">.</span></h1>
        <p>¿Tienes una consulta sobre nuestros productos? Escríbenos aquí.</p>
      </div>
      <div className="panel p-4 mx-auto" style={{ maxWidth: 650 }}>
        <form onSubmit={submit} noValidate>
          <div className="mb-3"><label htmlFor="contact-name" className="form-label">Nombre</label><input id="contact-name" className="form-control" value={form.nombre} onChange={event => setForm({ ...form, nombre: event.target.value })}/></div>
          <div className="mb-3"><label htmlFor="contact-mail" className="form-label">Correo electrónico</label><input id="contact-mail" type="email" className="form-control" value={form.correo} onChange={event => setForm({ ...form, correo: event.target.value })}/></div>
          <div className="mb-3"><label htmlFor="contact-message" className="form-label">Mensaje</label><textarea id="contact-message" className="form-control" rows="5" value={form.mensaje} onChange={event => setForm({ ...form, mensaje: event.target.value })}/></div>
          {error && <p className="text-danger small" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary">Enviar consulta</button>
          {sent && <p className="alert alert-success mt-3 mb-0" role="status">Tu consulta quedó guardada correctamente.</p>}
        </form>
      </div>
    </section>
  )
}
