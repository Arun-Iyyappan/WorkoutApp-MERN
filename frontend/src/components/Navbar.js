import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <nav>
          {user && (
            <div className='navicon'>
              <Link to='/bmi' className='spage'><strong>BMI</strong></Link>
              <Link to='/exercises' className='spage'><strong>Exercises</strong></Link>
              <Link to='/nutrition' className='spage'><strong>Nutrition</strong></Link>
              <span className='glow'>{user.email}</span>
              <button  className='navbtn logout' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className='navbtn'>Login</Link>
              <Link to="/signup" className='navbtn'>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar