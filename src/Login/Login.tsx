import './Login.css'
const Login = () => {
  return (
    <div id="login-container">
        <div id="left-container">
            <h2 className='title'>Sign In to Developer</h2>
            <form id="login-form" onSubmit={() => {}}>
                <input type="text" id="username" placeholder="Usuário" />
                <input type="password" id="password" placeholder="Senha" />
                
                <button type="submit">Login</button>
            </form>
        </div>
        <div id="right-container">
            <h2 className="welcome-title">Seja bem vindo!</h2>
            <button type="submit">Login</button>
        </div>
    </div>
  )
}

export default Login