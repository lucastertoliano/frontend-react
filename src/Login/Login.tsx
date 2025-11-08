import { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import fruta from '../assets/carrinhoFruta.png';
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigate();
  
  const sendRequest = (e: any) => {
      e.preventDefault();
      if(!email || !password){
          alert("Por favor, preencha todos os campos.");
          return;
      }
      navigation('/homeLayout');

  }
  return (
    <div id="login-container">
        <div id="left-container">
            <img src={logo} alt="logo" title='logo'/>
            <h2 className='title'>Acesse sua conta</h2>
      
            <form id="login-form" onSubmit={(e) => {sendRequest(e)}}>
                <input type="email" id="username" placeholder="Usuário" onChange ={(e) => {setEmail(e.target.value)}}/> 
                <input type="password" id="password" placeholder="Senha" onChange ={(e) => {setPassword(e.target.value)}}/>
            <div className='forgot-password-container'>
              <a href="/forgot-password">Esqueceu a senha?</a>
              <button type="submit">Login</button>
            </div>
                
            </form>
        </div>
        <div id="right-container">
            <img src={fruta} alt="fruta" title='fruta'/>
            <h2 className="welcome-title">Ainda não tem conta?</h2>
            <p className='welcome-message'>Cadastre-se e aproveite as ofertas!</p>
            <button onClick={() => navigation("/sign-up")} type="submit">Criar conta</button>
        </div>
    </div>
  )
}
export default Login