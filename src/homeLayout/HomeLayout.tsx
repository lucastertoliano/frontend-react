import { Outlet, Link } from 'react-router-dom';
import './HomeLayout.css';

const HomeLayout = () => {
  return (
    <>
      <nav id="home-bar">
          <div className='links'>
              <Link to="/homeLayout">Home</Link>
              <Link to="/gerenciamentoProduto">Produtos</Link>
              <Link to="/promocao">Promoção</Link>
              <Link to="/gerenciamentoUsuario">Usuários</Link>
              <Link to="/detalhesUsuario">Detalhes dos Usuários</Link>
              <Link to="/login">Sair</Link>
          </div>

          <div className='user-info'>
            <div className='avatar'>
              <img src="src/assets/avatar_icon.png" alt="User Avatar" />
            </div>
            <label>Administrador1</label>
          </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default HomeLayout