import { useState } from 'react'
import Rating from '@mui/material/Rating'
import './style.scss'
import { useFirebase } from '../../hooks'
export const Avaliation = ({
  avaliation = 0,
  onAvaliate,
  handleOpenModal,
}: {
  avaliation: number
  onAvaliate: (value: number) => void
  handleOpenModal: () => void
}) => {
  const [value, setValue] = useState<number | null>(avaliation)
  const [isLoading, setIsLoading] = useState(false)
  const { getUserId } = useFirebase()

  const toggleRating = async (newValue: number | null) => {
    setIsLoading(true)
    setValue(newValue)
    onAvaliate(newValue!)
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
        onChange={(_event, newValue) => {
          const id = getUserId()
          if (id) {
            toggleRating(newValue)
          } else {
            handleOpenModal()
          }
        }}
        precision={0.5}
      />
    </div>
  )
}
