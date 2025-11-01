import './Login.css'
const Login = () => {
  return (
    <div id="login-container">
        <div id="left-container">
            <form id="login-form" onSubmit={() => {}}>
                <input type="text" id="username" placeholder="Usuário" />
                <input type="password" id="password" placeholder="Senha" />
                
                <button type="submit">Entrar</button>
            </form>
        </div>
        <div id="right-container">
            LOREM IPSUM
            <button type="submit">Entrar</button>
        </div>
    </div>
  )
}

export default Login