import { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
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
      navigation('/home');

  }
  return (
    <div id="login-container">
        <div id="left-container">
            <h2 className='title'>Sign In to Developer</h2>
        <div className='icon-container'>
            <button>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button>
              <i className="fab fa-instagram"></i>
            </button>
            <button>
              <i className="fab fa-linkedin-in"></i>
            </button>
        </div>
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
            <h2 className="welcome-title">Seja bem vindo!</h2>
            <p className='welcome-message'>Para continuar, faça seu login</p>
            <button onClick={() => navigation("/sign-up")} type="submit">Sign up</button>
        </div>
    </div>
  )
}
export default Login