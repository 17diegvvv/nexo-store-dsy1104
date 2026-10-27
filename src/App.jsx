import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Categories from './pages/Categories.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Result from './pages/Result.jsx'
import Account from './pages/Account.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return <div className="app-shell"><Header/><main id="content">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/productos" element={<Catalog/>}/>
      <Route path="/categorias" element={<Categories/>}/>
      <Route path="/ofertas" element={<Catalog offersOnly/>}/>
      <Route path="/producto/:id" element={<ProductDetail/>}/>
      <Route path="/carrito" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/resultado/:status" element={<Result/>}/>
      <Route path="/ingresar" element={<Account mode="login"/>}/>
      <Route path="/registro" element={<Account mode="register"/>}/>
      <Route path="/contacto" element={<Contact/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="*" element={<div className="container section-space"><h1>404 - Página no encontrada</h1></div>}/>
    </Routes>
  </main><Footer/></div>
}
