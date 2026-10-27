export const money = n => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Number(n) || 0)
export const cartCount = items => items.reduce((n, item) => n + item.cantidad, 0)
export const cartTotal = items => items.reduce((total, item) => total + item.precio * item.cantidad, 0)
export const getDiscount = product => product.anterior && product.anterior > product.precio
  ? Math.round((1 - product.precio / product.anterior) * 100) : 0

export function validateCheckout(values) {
  const errors = {}
  if (!values.nombre?.trim() || values.nombre.trim().length < 2) errors.nombre = 'Ingresa tu nombre (mínimo 2 caracteres).'
  if (!values.apellido?.trim()) errors.apellido = 'Ingresa tu apellido.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '')) errors.email = 'Ingresa un correo válido.'
  if (!/^\+?\d[\d\s-]{7,14}$/.test((values.telefono || '').trim())) errors.telefono = 'Ingresa un teléfono válido.'
  if (!values.direccion?.trim() || values.direccion.trim().length < 5) errors.direccion = 'Ingresa una dirección de al menos 5 caracteres.'
  if (!values.comuna?.trim()) errors.comuna = 'Indica tu comuna.'
  if (!values.region?.trim()) errors.region = 'Selecciona una región.'
  if (!['domicilio', 'retiro'].includes(values.entrega)) errors.entrega = 'Selecciona un método de entrega.'
  return errors
}
export function validateAccount(values) {
  const errors = {}
  if (!values.nombre?.trim() || values.nombre.trim().length < 2) errors.nombre = 'Ingresa al menos 2 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '')) errors.email = 'El correo no es válido.'
  return errors
}
