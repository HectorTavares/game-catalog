import './style.scss'
import { motion } from 'framer-motion'
export const Card = ({
  title,
  image,
  description,
  platform,
  publisher,
  genre,
  link,
}: {
  title: string
  image: string
  description: string
  platform: string
  publisher: string
  genre: string
  link: string
}) => {
  const handleOnClick = () => {
    window.open(link, '_blank')
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      layout
      className='card'
      onClick={handleOnClick}
    >
      <img className='card-image' src={image} alt={`${title} thumbnail`} />
      <div className='card-content'>
        <h1 className='card-title'>{title}</h1>
        <p className='card-description'>{description}</p>
        <div className='card-details'>
          <div className='card-plataform-publisher'>
            <p>{platform}</p>
            <p>{publisher}</p>
          </div>
          <div className='card-genre'>
            <p>{genre}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
