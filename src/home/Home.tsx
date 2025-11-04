import './Home.css';

const Home = () => {
  return (
    <nav id="home-bar">
        <div className='links'>
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/sign-up">Sign Up</a>
            <a href="/login">Logout</a>
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