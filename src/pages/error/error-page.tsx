import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../../hooks'
import { useTheme } from '../../context/themeContext'

import './style.scss'

export function ErrorPage() {
  const navigate = useNavigate()
  const { logout } = useFirebase()
  const { theme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={`error-page ${theme}`}>
      <h1>Sorry, an unexpected error occurred 😞</h1>
      <h2>Please try again later.</h2>
      <button onClick={() => window.location.reload()}>Reload the page</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
