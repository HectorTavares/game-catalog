import React, { useState } from 'react'
import Rating from '@mui/material/Rating'
import './style.scss'
export const Avaliation = ({ avaliation }: { avaliation: number }) => {
  const [value, setValue] = useState<number | null>(avaliation)
  const [isLoading, setIsLoading] = useState(false)

  const toggleRating = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }
  return (
    <div>
      <Rating
        className={`rating ${isLoading ? 'avaliated' : ''}`}
        name='rating'
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          toggleRating()
        }}
        precision={0.5}
      />
    </div>
  )
}
