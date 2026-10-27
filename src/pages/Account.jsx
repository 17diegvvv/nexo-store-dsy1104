import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers, saveUser } from '../data/store.js'
import { validateAccount } from '../utils/shop.js'

export default function Account({ mode = 'login' }) {
  const [form, setForm] = useState({ nombre: '', email: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function submit(event) {
    event.preventDefault()
    const invalid = validateAccount({ nombre: mode === 'login' ? 'Cliente' : form.nombre, email: form.email })
    if (Object.keys(invalid).length > 0) {
      setErrors(invalid)
      setMessage('')
      return
    }
    if (mode === 'register') {
      const created = saveUser(form)
      setMessage(created ? 'Tu perfil se ha guardado correctamente.' : 'Ya existe un perfil con ese correo.')
    } else {
      const person = getUsers().find(user => user.email.toLowerCase() === form.email.toLowerCase())
      setMessage(person ? `Hola, ${person.nombre}. Ya puedes seguir explorando nuestro catálogo.` : 'No encontramos un perfil asociado a ese correo.')
    }
  }

  return (
    <section className="container section-space">
      <div className="panel account-panel mx-auto p-4 p-md-5">
        <span className="kicker">MI CUENTA</span>
        <h1 className="h2 mt-2">{mode === 'register' ? 'Crear perfil' : 'Consultar mi perfil'}<span className="accent">.</span></h1>
        <p className="text-secondary">{mode === 'register' ? 'Guarda tus datos básicos para futuras visitas.' : 'Ingresa el correo con el que registraste tu perfil.'}</p>
        <form onSubmit={submit} noValidate>
          {mode === 'register' && (
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input id="nombre" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} value={form.nombre} onChange={event => setForm({ ...form, nombre: event.target.value })} />
              {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input id="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <button className="btn btn-primary w-100" type="submit">{mode === 'register' ? 'Guardar perfil' : 'Consultar perfil'}</button>
        </form>
        {message && <p role="status" className="alert alert-info mt-3 small mb-0">{message}</p>}
        <div className="mt-3 small">
          {mode === 'register' ? <>¿Ya tienes un perfil? <Link to="/ingresar">Consultar mi perfil</Link></> : <>¿Primera vez aquí? <Link to="/registro">Crear perfil</Link></>}
        </div>
      </div>
    </section>
  )
}
