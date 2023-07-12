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
      <h1>Desculpe, infelizmente ocorreu um erro inesperado 😞</h1>
      <h2>Tente novamente mais tarde.</h2>
      <button onClick={() => window.location.reload()}>Recarregar a página</button>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
