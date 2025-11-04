import './Home.css';

const Home = () => {
  return (
    <nav id="home-bar">
        <div className='avatar'>
            <img src="src/assets/avatar_icon.png" alt="User Avatar" />
        </div>
        <div className='links'>
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/sign-up">Sign Up</a>
            <a href="/login">Login</a>
        </div>
    </nav>
  )
}

export default Home