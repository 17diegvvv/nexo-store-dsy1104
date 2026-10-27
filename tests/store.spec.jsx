import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, saveOrder, getOrders, seedProducts } from '../src/data/store.js'
import { cartCount, cartTotal, getDiscount, validateCheckout, validateAccount } from '../src/utils/shop.js'

describe('Catálogo, CRUD y reglas de negocio', () => {
  beforeEach(() => localStorage.clear())
  it('T01: lee los productos precargados', () => {
    expect(getProducts().length).toBe(seedProducts.length)
  })
  it('T02: crea un producto con identificador único', () => {
    const product = createProduct({ nombre: 'Producto prueba', precio: 1000, stock: 5, categoria: 'Audio', emoji: '🎧', descripcion: 'Ejemplo' })
    expect(getProduct(product.id).nombre).toBe('Producto prueba')
    expect(getProducts().length).toBe(seedProducts.length + 1)
  })
  it('T03: actualiza precio sin alterar otros campos', () => {
    const updated = updateProduct(1, { precio: 17000 })
    expect(updated.precio).toBe(17000)
    expect(getProduct(1).nombre).toBe(seedProducts[0].nombre)
  })
  it('T04: elimina un producto y persiste el cambio', () => {
    expect(deleteProduct(1)).toBeTrue()
    expect(getProduct(1)).toBeUndefined()
    expect(deleteProduct(999)).toBeFalse()
  })
  it('T05: calcula total y cantidad del carrito', () => {
    const cart = [{ precio: 1000, cantidad: 2 }, { precio: 2500, cantidad: 1 }]
    expect(cartTotal(cart)).toBe(4500)
    expect(cartCount(cart)).toBe(3)
  })
  it('T06: calcula el descuento esperado y no inventa uno si no existe', () => {
    expect(getDiscount({ precio: 8000, anterior: 10000 })).toBe(20)
    expect(getDiscount({ precio: 9000, anterior: null })).toBe(0)
  })
  it('T07: rechaza formulario de checkout vacío (casos límite)', () => {
    const errors = validateCheckout({})
    expect(errors.email).toContain('correo')
    expect(errors.region).toContain('región')
    expect(Object.keys(errors).length).toBeGreaterThan(5)
  })
  it('T08: acepta un checkout completo con datos de prueba', () => {
    expect(validateCheckout({ nombre:'Ana', apellido:'Prueba', email:'ana@ejemplo.cl', telefono:'912345678', direccion:'Calle Falsa 123', comuna:'Santiago', region:'Metropolitana de Santiago', entrega:'domicilio' })).toEqual({})
  })
  it('T09: valida el formato de correo en registro', () => {
    expect(validateAccount({ nombre: 'Ana', email:'invalido' }).email).toBeDefined()
    expect(validateAccount({ nombre: 'Ana', email:'ana@ejemplo.cl' })).toEqual({})
  })
  it('T10: guarda y consulta un pedido', () => {
    saveOrder({ id:'TEST-1', estado:'aprobada', total:15000 })
    expect(getOrders()).toEqual([{ id:'TEST-1', estado:'aprobada', total:15000 }])
  })
  it('T11: usa mock (spyOn) para comprobar lectura en localStorage', () => {
    const readSpy = spyOn(Storage.prototype, 'getItem').and.returnValue(null)
    expect(getProducts().length).toBe(seedProducts.length)
    expect(readSpy).toHaveBeenCalled()
  })
})
