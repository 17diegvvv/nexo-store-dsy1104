import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../src/components/ProductCard.jsx'
import ProductGrid from '../src/components/ProductGrid.jsx'
import { StoreProvider, useStore } from '../src/context/StoreContext.jsx'
import Checkout from '../src/pages/Checkout.jsx'
import { seedProducts } from '../src/data/store.js'

// Pruebas de renderizado y comportamiento de componentes React.
globalThis.IS_REACT_ACT_ENVIRONMENT = true
let node, root
function render(ui) {
  node = document.createElement('div')
  document.body.appendChild(node)
  act(() => { root = createRoot(node); root.render(<MemoryRouter>{ui}</MemoryRouter>) })
  return node
}
function cleanup() {
  if (root) act(() => root.unmount())
  if (node) node.remove()
  node = null; root = null
}
function CartProbe() {
  const { count, total, addToCart } = useStore()
  return <div><span id="count">{count}</span><span id="total">{total}</span><button onClick={() => addToCart(seedProducts[0])}>Añadir</button></div>
}

describe('Componentes React: props, renderizado, estados y eventos', () => {
  beforeEach(() => localStorage.clear())
  afterEach(cleanup)
  it('T12: muestra un ProductCard con las props correctas', () => {
    const page = render(<ProductCard product={seedProducts[0]} onAdd={() => {}} />)
    expect(page.textContent).toContain('Mouse Vector RGB')
    expect(page.textContent).toContain('Periféricos')
  })
  it('T13: ProductGrid dibuja todos los productos entregados', () => {
    const page = render(<ProductGrid products={seedProducts.slice(0, 3)} onAdd={() => {}} />)
    expect(page.querySelectorAll('[data-testid="product-card"]').length).toBe(3)
  })
  it('T14: ProductGrid renderiza estado vacío condicional', () => {
    const page = render(<ProductGrid products={[]} onAdd={() => {}} />)
    expect(page.querySelector('[role="status"]')).not.toBeNull()
    expect(page.textContent).toContain('No encontramos productos')
  })
  it('T15: simula clic en botón y ejecuta el callback pasado por props', () => {
    const click = jasmine.createSpy('click agregar')
    const page = render(<ProductCard product={seedProducts[0]} onAdd={click} />)
    act(() => page.querySelector('button').click())
    expect(click).toHaveBeenCalledOnceWith(seedProducts[0])
  })
  it('T16: re-renderiza el estado y total del carrito después de un evento', () => {
    const page = render(<StoreProvider><CartProbe/></StoreProvider>)
    expect(page.querySelector('#count').textContent).toBe('0')
    act(() => page.querySelector('button').click())
    expect(page.querySelector('#count').textContent).toBe('1')
    expect(page.querySelector('#total').textContent).toBe(String(seedProducts[0].precio))
  })
  it('T17: muestra errores condicionales al enviar el checkout sin datos', () => {
    localStorage.setItem('nexo_carrito_v2', JSON.stringify([{id:1,nombre:'Mouse Vector RGB',precio:18990,cantidad:1,emoji:'🖱️'}]))
    const page = render(<StoreProvider><Checkout/></StoreProvider>)
    expect(page.textContent).not.toContain('Ingresa un correo válido.')
    act(() => page.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })))
    expect(page.textContent).toContain('Ingresa un correo válido.')
  })
})
