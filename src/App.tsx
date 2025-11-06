import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login/Login.tsx'
import Home from './home/Home.tsx'
import About from './about/About.tsx'
import ForgotPassword from './forgot-password/ForgotPassword.tsx'
import SignUp from './sign-up/SignUp.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App
