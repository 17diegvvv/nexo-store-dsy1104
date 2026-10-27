import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import { useStore } from '../context/StoreContext.jsx'

export default function Catalog({ offersOnly = false }) {
  const { products, addToCart } = useStore()
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('destacados')
  const category = params.get('categoria') || 'Todas'
  const categories = ['Todas', ...new Set(products.map(p => p.categoria))]
  const shown = useMemo(() => {
    const selected = products.filter(p => (!offersOnly || (p.anterior > p.precio)) && (category === 'Todas' || p.categoria === category) && `${p.nombre} ${p.descripcion}`.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'menor') selected.sort((a, b) => a.precio - b.precio)
    if (sort === 'mayor') selected.sort((a, b) => b.precio - a.precio)
    return selected
  }, [products, category, search, sort, offersOnly])
  return <section className="container section-space">
    <div className="page-heading"><span className="kicker">{offersOnly ? 'PRECIOS ESPECIALES' : 'ELIGE TU FAVORITO'}</span><h1>{offersOnly ? 'Ofertas de la semana' : 'Nuestro catálogo'}<span className="accent">.</span></h1><p>{offersOnly ? 'Descubre los precios especiales en productos seleccionados.' : 'Busca y filtra nuestros productos tecnológicos.'}</p></div>
    <div className="filter-bar row gy-3 align-items-end"><div className="col-lg-5"><label className="form-label small fw-semibold" htmlFor="search">Buscar productos</label><input id="search" className="form-control" placeholder="Ej. Mouse, audífonos, teclado..." value={search} onChange={e => setSearch(e.target.value)} /></div>
    <div className="col-sm-6 col-lg-4"><label className="form-label small fw-semibold" htmlFor="category">Categoría</label><select id="category" className="form-select" value={category} onChange={e => setParams(e.target.value === 'Todas' ? {} : { categoria: e.target.value })}>{categories.map(name => <option key={name}>{name}</option>)}</select></div>
    <div className="col-sm-6 col-lg-3"><label className="form-label small fw-semibold" htmlFor="sort">Ordenar</label><select id="sort" className="form-select" value={sort} onChange={e => setSort(e.target.value)}><option value="destacados">Destacados</option><option value="menor">Menor precio</option><option value="mayor">Mayor precio</option></select></div></div>
    <div className="d-flex justify-content-between align-items-center mt-4 mb-3"><h2 className="fs-5 mb-0">Resultados</h2><span className="results-count">{shown.length} productos</span></div><ProductGrid products={shown} onAdd={addToCart}/>
  </section>
}
