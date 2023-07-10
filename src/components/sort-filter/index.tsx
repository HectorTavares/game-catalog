import { ratingSort } from '../../types'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Tooltip from '@mui/material/Tooltip'
import './style.scss'

export const SortFilter = ({
  value,
  setRatingSort,
}: {
  value: ratingSort
  setRatingSort: (value: ratingSort) => void
}) => {
  return (
    <div className='sort-filter'>
      <Tooltip
        title={`${value.isActivated ? 'Disable sorting by rating ' : 'Enable  sorting by rating'}`}
      >
        <button
          className={`sort-activation ${value.isActivated ? 'selected' : ''}`}
          onClick={() => setRatingSort({ ...value, isActivated: !value.isActivated })}
        >
          {value.isActivated ? 'On' : 'Off'}
        </button>
      </Tooltip>
      <Tooltip
        title={`${
          value.isDesc ? 'Change sort order to ascending' : 'Change sort order to descending'
        }`}
      >
        <button
          className={`sort-direction ${value.isActivated ? 'selected' : ''}`}
          disabled={!value.isActivated}
          onClick={() => setRatingSort({ ...value, isDesc: !value.isDesc })}
        >
          {value.isDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </button>
      </Tooltip>
    </div>
  )
}
