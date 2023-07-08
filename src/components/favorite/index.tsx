import { useState } from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import './style.scss'

export const FavoriteButton = ({ value }: { value: boolean }) => {
  const [isFavorite, setIsFavorite] = useState(value)
  const [isLoading, setIsLoading] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <button className={`favorite-button ${isLoading ? 'favorited' : ''}`} onClick={toggleFavorite}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
    </button>
  )
}
