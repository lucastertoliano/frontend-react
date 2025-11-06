import './Home.css';

const Home = () => {
  return (
    <nav id="home-bar">
        <div className='links'>
            <a href="/home">Home</a>
            <a href="/gerenciamentoProduto">Produtos</a>
            <a href="/promocao">Promoção</a>
            <a href="/gerenciamentoUsuario">Usuários</a>
            <a href="/detalhesUsuario">Detalhes dos Usuários</a>
            <a href="/login">Sair</a>
        </div>
        <div className='user-info'>
          <div className='avatar'>
            <img src="src/assets/avatar_icon.png" alt="User Avatar" />
          </div>
          <label>User Name</label>
        </div>
    </nav>
  )
}

export default Home