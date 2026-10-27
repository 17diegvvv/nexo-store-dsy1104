/** Pruebas independientes de React que pueden ejecutarse solo con Node.js. */
import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct, saveOrder, getOrders, seedProducts } from '../src/data/store.js'
import { cartCount, cartTotal, getDiscount, validateCheckout, validateAccount } from '../src/utils/shop.js'
const map = new Map()
globalThis.localStorage = { getItem:k => map.has(k)?map.get(k):null, setItem:(k,v) => {map.set(k,String(v))}, removeItem:k=>map.delete(k), clear:()=>map.clear() }
beforeEach(() => map.clear())
test('N01 catálogo inicial',()=>assert.equal(getProducts().length,8))
test('N02 productos son copias independientes',()=>{getProducts()[0].nombre='alterado';assert.equal(getProducts()[0].nombre,seedProducts[0].nombre)})
test('N03 crear producto',()=>{const p=createProduct({nombre:'Auriculares',precio:1234});assert.equal(getProduct(p.id).nombre,'Auriculares')})
test('N04 actualizar producto',()=>{updateProduct(1,{precio:100});assert.equal(getProduct(1).precio,100)})
test('N05 eliminar producto',()=>{assert.equal(deleteProduct(1),true);assert.equal(getProduct(1),undefined)})
test('N06 eliminar inexistente',()=>assert.equal(deleteProduct(9000),false))
test('N07 total y cantidad carrito',()=>{const c=[{precio:100,cantidad:3},{precio:250,cantidad:2}];assert.equal(cartTotal(c),800);assert.equal(cartCount(c),5)})
test('N08 carrito vacío',()=>{assert.equal(cartTotal([]),0);assert.equal(cartCount([]),0)})
test('N09 descuento',()=>{assert.equal(getDiscount({precio:80,anterior:100}),20);assert.equal(getDiscount({precio:80,anterior:null}),0)})
test('N10 checkout inválido',()=>assert.ok(Object.keys(validateCheckout({})).length>=7))
test('N11 checkout válido',()=>assert.deepEqual(validateCheckout({nombre:'Ana',apellido:'Test',email:'ana@test.cl',telefono:'912345678',direccion:'Calle 123',comuna:'Santiago',region:'Valparaíso',entrega:'domicilio'}),{}))
test('N12 validar cuenta',()=>{assert.ok(validateAccount({nombre:'',email:'a'}).email);assert.deepEqual(validateAccount({nombre:'Ana',email:'a@b.cl'}),{})})
test('N13 persistir pedido',()=>{saveOrder({id:'X1'});assert.deepEqual(getOrders(),[{id:'X1'}])})
test('N14 localStorage inválido utiliza base',()=>{localStorage.setItem('nexo_productos_v2','invalid-json');assert.equal(getProducts().length,8)})
