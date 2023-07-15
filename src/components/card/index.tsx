import { motion } from 'framer-motion'
import { Tooltip } from '@mui/material'

import { FavoriteButton } from '../../components/favorite'
import { Avaliation } from '../avaliation'
import { firebaseGame } from '../../types'
import { useTheme } from '../../context/themeContext'

import './style.scss'

export const Card = ({
  title,
  image,
  description,
  platform,
  publisher,
  genre,
  link,
  gameId,
  isFavorited = false,
  avaliation = 2.5,
  onRateOrFavorite,
  handleOpenModal,
}: {
  title: string
  image: string
  description: string
  platform: string
  publisher: string
  genre: string
  link: string
  gameId: number
  isFavorited: boolean
  avaliation: number
  onRateOrFavorite: (updatedGame: firebaseGame) => void
  handleOpenModal: () => void
}) => {
  const { theme } = useTheme()
  const handleOnClick = (): void => {
    window.open(link, '_blank')
  }

  const handleOnAvaliate = (value: number): void => {
    const updatedGame: firebaseGame = {
      isFavorited,
      rating: value,
      gameId: gameId,
    }

    onRateOrFavorite(updatedGame)
  }

  const handleOnFavorite = (value: boolean): void => {
    const updatedGame: firebaseGame = {
      isFavorited: value,
      rating: avaliation,
      gameId: gameId,
    }

    onRateOrFavorite(updatedGame)
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      layout
      className={`card ${theme}`}
    >
      <Tooltip title={`Click to play ${title}`}>
        <img
          onClick={handleOnClick}
          className='card-image'
          src={image}
          alt={`${title} thumbnail`}
        />
      </Tooltip>
      <div className='card-content'>
        <h1 className='card-title'>{title}</h1>
        <p className={`card-description ${theme}`}>{description}</p>
        <div className='card-details'>
          <div className='card-plataform-publisher'>
            <p>{platform}</p>
            <p>{publisher}</p>
          </div>
          <div className={`card-genre ${theme}`}>
            <p>{genre}</p>
          </div>
        </div>
        <div className='card-options'>
          <Avaliation
            onAvaliate={handleOnAvaliate}
            avaliation={avaliation}
            handleOpenModal={handleOpenModal}
          />
          <FavoriteButton
            onFavorite={handleOnFavorite}
            value={isFavorited}
            handleOpenModal={handleOpenModal}
          />
        </div>
      </div>
    </motion.div>
  )
}
