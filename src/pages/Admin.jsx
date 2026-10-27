import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createProduct, deleteProduct, getOrders, updateProduct } from '../data/store.js'
import { useStore } from '../context/StoreContext.jsx'
import { money } from '../utils/shop.js'

const blank = { nombre: '', categoria: 'Periféricos', precio: '', anterior: '', stock: '', etiqueta: 'Nuevo', emoji: '🎮', descripcion: '' }
export default function Admin() {
  const { products, refreshProducts } = useStore()
  const [draft, setDraft] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('productos')
  const orders = getOrders()
  const approved = orders.filter(o => o.estado === 'pendiente')
  const revenue = approved.reduce((s, o) => s + o.total, 0)
  function submit(e) {
    e.preventDefault()
    if (draft.nombre.trim().length < 3 || Number(draft.precio) <= 0 || Number(draft.stock) < 0 || draft.stock === '' || draft.descripcion.trim().length < 5) {
      setError('Completa nombre (3+), descripción (5+), precio positivo y stock no negativo.'); return
    }
    const data = { ...draft, nombre: draft.nombre.trim(), descripcion: draft.descripcion.trim(), precio: Number(draft.precio), anterior: draft.anterior ? Number(draft.anterior) : null, stock: Number(draft.stock) }
    if (editing === null) createProduct(data)
    else updateProduct(editing, data)
    refreshProducts(); setError(''); setDraft(blank); setEditing(null)
  }
  function edit(product) { setEditing(product.id); setDraft({ ...product, precio: String(product.precio), anterior: String(product.anterior || ''), stock: String(product.stock) }); window.scrollTo({top:0, behavior:'smooth'}) }
  function remove(id) { if (window.confirm('¿Eliminar producto del catálogo?')) { deleteProduct(id); refreshProducts() } }
  return <section className="container section-space"><div className="page-heading"><span className="kicker">ADMINISTRACIÓN</span><h1>Panel de gestión<span className="accent">.</span></h1><p>Gestiona los productos, el stock y los pedidos de tu tienda.</p></div><div className="row g-3 mb-4">{[['Productos', products.length, '📦'], ['Pedidos registrados', orders.length, '🧾'], ['Total de pedidos', money(revenue), '📊']].map(([title, value, symbol]) => <div className="col-md-4" key={title}><div className="metric panel"><span>{symbol}</span><small>{title}</small><strong>{value}</strong></div></div>)}</div><div className="d-flex gap-2 mb-4"><button className={`btn ${tab === 'productos' ? 'btn-primary' : 'btn-outline-dark'}`} onClick={() => setTab('productos')}>Gestionar productos</button><button className={`btn ${tab === 'ordenes' ? 'btn-primary' : 'btn-outline-dark'}`} onClick={() => setTab('ordenes')}>Ver pedidos</button><Link className="btn btn-outline-secondary ms-auto" to="/">Ir a la tienda</Link></div>
    {tab === 'productos' ? <div className="row g-4"><div className="col-lg-4"><div className="panel p-4"><h2 className="h5 mb-3">{editing ? 'Editar producto' : 'Nuevo producto'}</h2><form onSubmit={submit} noValidate>{[['nombre', 'Nombre'], ['descripcion', 'Descripción'], ['precio', 'Precio CLP'], ['anterior', 'Precio anterior (opcional)'], ['stock', 'Stock'], ['emoji', 'Emoji ilustrativo']].map(([key, label]) => <div className="mb-3" key={key}><label className="form-label" htmlFor={`adm-${key}`}>{label}</label><input id={`adm-${key}`} className="form-control" type={['precio', 'anterior', 'stock'].includes(key) ? 'number' : 'text'} min={['precio', 'anterior', 'stock'].includes(key) ? 0 : undefined} value={draft[key]} onChange={e => setDraft(old => ({ ...old, [key]: e.target.value }))}/></div>)}<div className="mb-3"><label htmlFor="adm-category" className="form-label">Categoría</label><select id="adm-category" className="form-select" value={draft.categoria} onChange={e => setDraft({ ...draft, categoria: e.target.value })}>{['Periféricos', 'Audio', 'Accesorios', 'Streaming'].map(c => <option key={c}>{c}</option>)}</select></div>{error && <p className="text-danger small" role="alert">{error}</p>}<button type="submit" className="btn btn-primary w-100">{editing ? 'Guardar cambios' : 'Crear producto'}</button>{editing && <button type="button" className="btn btn-link w-100" onClick={() => {setEditing(null);setDraft(blank);setError('')}}>Cancelar edición</button>}</form></div></div><div className="col-lg-8"><div className="panel p-4"><h2 className="h5 mb-3">Listado de productos ({products.length})</h2><div className="table-responsive"><table className="table align-middle admin-table"><thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead><tbody>{products.map(p => <tr key={p.id}><td><span className="me-2">{p.emoji}</span><b>{p.nombre}</b><small className="d-block text-secondary">{p.categoria}</small></td><td>{money(p.precio)}</td><td>{p.stock}</td><td><div className="d-flex gap-1"><button className="btn btn-sm btn-outline-primary" onClick={() => edit(p)}>Editar</button><button className="btn btn-sm btn-outline-danger" onClick={() => remove(p.id)}>Eliminar</button></div></td></tr>)}</tbody></table></div></div></div></div> : <div className="panel p-4"><h2 className="h5 mb-3">Historial de pedidos</h2><div className="table-responsive"><table className="table"><thead><tr><th>Número</th><th>Fecha</th><th>Estado</th><th>Total</th></tr></thead><tbody>{orders.map(o => <tr key={o.id}><td>{o.id}</td><td>{new Date(o.fecha).toLocaleString('es-CL')}</td><td>{o.estado}</td><td>{money(o.total)}</td></tr>)}</tbody></table></div>{orders.length === 0 && <p>Todavía no hay pedidos registrados.</p>}</div>}
  </section>
}
