import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../../hooks'
import './style.scss'

export function ErrorPage() {
  const navigate = useNavigate()
  const { logout } = useFirebase()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='error-page'>
      <h1>Sorry, an unexpected error occurred 😞</h1>
      <h2>Please try again later.</h2>
      <button onClick={() => window.location.reload()}>Reload the page</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
