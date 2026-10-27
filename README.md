# Nexo Store

Frontend de comercio electrónico orientado a catálogo, carrito de compras y registro de pedidos. Desarrollado con React, Vite, React Router y Bootstrap. Incluye gestión de productos, almacenamiento local, formularios con validación y pruebas automatizadas.

## Requisitos

- Node.js 20 o superior y npm
- Chrome o Chromium para ejecutar las pruebas Karma

## Ejecutar

```bash
npm install
npm run dev
```

Abre la dirección que muestre Vite (generalmente `http://localhost:5173`).

## Comandos

| Comando | Función |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run preview` | Vista previa de la compilación |
| `npm run test:logic` | 14 pruebas de lógica con Node |
| `npm test` | Pruebas de integración con Jasmine/Karma |
| `npm run test:coverage` | Cobertura mediante Karma e Istanbul |

## Módulos y rutas

- `/`: inicio con productos destacados y categorías.
- `/productos`: catálogo, búsquedas, filtros y ordenamiento.
- `/ofertas`: productos con descuentos.
- `/producto/:id`: detalle de producto.
- `/carrito`: agregar, modificar cantidades y eliminar productos.
- `/checkout`: validación de datos, despacho y registro de pedidos.
- `/resultado/aprobada` y `/resultado/rechazada`: confirmación y manejo de errores.
- `/registro` y `/ingresar`: creación y consulta de perfil local.
- `/contacto`: formulario de consultas.
- `/admin`: gestión de catálogo y consulta de pedidos.

## Organización

```text
src/
  components/      Componentes reutilizables
  context/         Estado del carrito y catálogo
  data/            Productos iniciales y persistencia
  pages/           Vistas y formularios
  utils/           Validaciones y reglas de negocio
  App.jsx          Definición de rutas
  main.jsx         Inicialización React
  styles.css       Estilos generales

tests/             Pruebas automatizadas
```

## Persistencia y alcance del sistema

La aplicación está implementada como frontend independiente. Los productos, perfiles, consultas, carrito y pedidos se almacenan en `localStorage` del navegador. El checkout registra pedidos en estado **pendiente**, con medio de pago **contra entrega**. No procesa pagos, reserva inventario en un servidor, envía correos ni realiza despachos. No solicita tarjetas ni almacena contraseñas.

Para un despliegue comercial sería necesario incorporar un backend, autenticación y autorización, un servicio de pedidos, protección de datos y la integración correspondiente para pagos y logística. La ruta `/admin` no está protegida por roles en esta versión.

## Pruebas

Los tests Jasmine/Karma verifican datos, validaciones, componentes, props, estados y eventos. Las pruebas de Node permiten comprobar las funciones de datos y negocio sin iniciar el navegador. Ejecuta los comandos anteriores y registra los resultados obtenidos en tu equipo.
