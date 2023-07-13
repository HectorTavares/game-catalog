import { useState } from 'react'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useFirebase } from '../../hooks'

import './style.scss'

export const FavoriteButton = ({
  value,
  onFavorite,
  handleOpenModal,
}: {
  value: boolean
  onFavorite: (value: boolean) => void
  handleOpenModal: () => void
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(value)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getUserId } = useFirebase()

  const toggleFavorite = () => {
    const id = getUserId()
    if (id) {
      onFavorite(!isFavorite)
      setIsFavorite(!isFavorite)
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    } else {
      handleOpenModal()
    }
  }

  return (
    <button className={`favorite-button ${isLoading ? 'favorited' : ''}`} onClick={toggleFavorite}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
    </button>
  )
}
