import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './Login/Login.tsx'
import HomeLayout from './homeLayout/HomeLayout.tsx'
import GerenciamentoProduto from './gerenciamentoProduto/GerenciamentoProduto.tsx'
import Promocao from './promocao/Promocao.tsx'
import GerenciamentoUsuario from './gerenciamentoUsuario/GerenciamentoUsuario.tsx'
import DetalhesUsuario from './detalhesUsuario/DetalhesUsuario.tsx'
import EditarUsuario from './editarUsuario/EditarUsuario.tsx'

function App() {
    return (
        <BrowserRouter>
            <Routes> 
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                
                <Route element={<HomeLayout />}>
                    
                    <Route index element={<GerenciamentoProduto />} /> 
                    
                    <Route path="/gerenciamentoProduto" element={<GerenciamentoProduto />} />
                    <Route path="/promocao" element={<Promocao />} />
                    <Route path="/gerenciamentoUsuario" element={<GerenciamentoUsuario />} />
                    <Route path="/detalhesUsuario/:id" element={<DetalhesUsuario />} />
                    <Route path="/editarUsuario/:id" element={<EditarUsuario />} />

                    <Route path="*" element={<Navigate to="/gerenciamentoProduto" replace />} />
                </Route>
            </Routes>
        </BrowserRouter> 
    )
}

export default App