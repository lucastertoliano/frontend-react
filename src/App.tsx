import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login/Login.tsx'
import Home from './home/Home.tsx'
import GerenciamentoProduto from './gerenciamentoProduto/GerenciamentoProduto.tsx'
import Promocao from './promocao/Promocao.tsx'
import GerenciamentoUsuario from './gerenciamentoUsuario/GerenciamentoUsuario.tsx'
import DetalhesUsuario from './detalhesUsuario/DetalhesUsuario.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gerenciamentoProduto" element={<GerenciamentoProduto />} />
        <Route path="/promocao" element={<Promocao />} />
        <Route path="/gerenciamentoUsuario" element={<GerenciamentoUsuario />} />
        <Route path="/detalhesUsuario" element={<DetalhesUsuario />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App
