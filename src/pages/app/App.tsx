import { useState, useEffect, ChangeEvent } from 'react'
import { Tooltip, Modal } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

import { Input, Loader, SortFilter, ThemeSwitch, GameList } from '../../components'
import { Game, firebaseGame, ratingSort, defaultRatingSortValues } from '../../types'
import { useGamesApi, useFirebase } from '../../hooks'
import { getGamesErrorMessage, parseFirebaseGameListToGameList } from '../../utils'
import { useTheme } from '../../context/themeContext'

import './style.scss'

const ALL = 'All'

function App(): JSX.Element {
  const [gameList, setGameList] = useState<Game[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [avaliableGenres, setAvaliableGenres] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>(ALL)
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [isFavoriteFilter, setIsFavoriteFilter] = useState<boolean>(false)
  const [ratingSort, setRatingSort] = useState<ratingSort>(defaultRatingSortValues)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const handleOpen = () => setModalIsOpen(true)
  const handleClose = () => setModalIsOpen(false)

  const { getGames } = useGamesApi()
  const { getUserInfo, updateUserInfo, logout, getUserId } = useFirebase()
  const navigate = useNavigate()

  const { theme } = useTheme()

  const userId = localStorage.getItem('uid')
  const fetchUserInfos = async () => {
    const userId = getUserId()
    if (userId) {
      const user = await getUserInfo()
      return user!.games
    }
    return []
  }

  const updateUserInformation = async (updatedGame: firebaseGame) => {
    const gameListToSave: firebaseGame[] = [updatedGame]
    gameList.forEach((game: Game) => {
      if (game.isFavorited || game.rating) {
        gameListToSave.push({
          isFavorited: game.isFavorited,
          gameId: game.id,
          rating: game.rating,
        })
      }
    })

    try {
      await updateUserInfo(gameListToSave)

      const updatedGameList = parseFirebaseGameListToGameList(gameListToSave, gameList)

      setGameList(updatedGameList)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchGames = async (): Promise<void> => {
    try {
      const gamesPromise = getGames()
      const userGamesPromise = fetchUserInfos()

      const [games, userGames] = await Promise.all([gamesPromise, userGamesPromise])
      let gamesToSave = games.data

      if (userGames) {
        gamesToSave = parseFirebaseGameListToGameList(userGames, games.data)
      } else {
        gamesToSave = parseFirebaseGameListToGameList([], games.data)
      }

      setGameList(gamesToSave)
      setFilteredGames(gamesToSave)
      const newAvaliableGenres = gamesToSave
        .map((game: Game) => game.genre)
        .filter(function (elem: string, pos: number, self: string | string[]) {
          return self.indexOf(elem) == pos
        })

      newAvaliableGenres.sort()
      newAvaliableGenres.unshift(ALL)

      setAvaliableGenres(newAvaliableGenres)
      setErrorMessage('')
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(getGamesErrorMessage(error.response.status))
      } else {
        setErrorMessage(getGamesErrorMessage(error.code))
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
    return () => {
      setGameList([])
    }
  }, [])

  useEffect(() => {
    let newFilteredGames = [...gameList]

    if (selectedGenre !== ALL) {
      newFilteredGames = newFilteredGames.filter((game: Game) => game.genre === selectedGenre)
    }

    if (isFavoriteFilter) {
      newFilteredGames = newFilteredGames.filter((game: Game) => game.isFavorited)
    }

    if (searchText.length) {
      newFilteredGames = newFilteredGames.filter((game: Game) =>
        game.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    if (ratingSort.isActivated) {
      newFilteredGames = newFilteredGames.sort((a: Game, b: Game) => {
        if (a.rating > b.rating) {
          return ratingSort.isDesc ? -1 : 1
        } else {
          return ratingSort.isDesc ? 1 : -1
        }
      })
    }

    setFilteredGames(newFilteredGames)
  }, [
    selectedGenre,
    searchText,
    gameList,
    isFavoriteFilter,
    ratingSort.isActivated,
    ratingSort.isDesc,
  ])

  const handleOnSelectGenre = (genre: string): void => {
    if (genre === selectedGenre) {
      setSelectedGenre(ALL)
    } else {
      setSelectedGenre(genre)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)
  }

  const handleOnReset = (): void => {
    setSearchText('')
  }

  const handleOnRetry = (): void => {
    setIsLoading(true)
    fetchGames()
  }

  const handleLogoff = (): void => {
    logout()
    location.reload()
  }

  return (
    <main className={`app ${theme}`}>
      <Modal open={modalIsOpen} onClose={handleClose}>
        <div className='modal'>
          <p>To favorite or rate, you need to be logged in.</p>
          <div className='modal-buttons'>
            <button onClick={() => navigate('/auth')}>Login</button>
          </div>
        </div>
      </Modal>
      <div className='container'>
        <div className='search-container'>
          <ThemeSwitch />

          <Input
            isSearch={true}
            text={'Search'}
            value={searchText}
            onChange={handleChange}
            onReset={handleOnReset}
            size='medium'
            type='text'
          />
          {userId ? (
            <Tooltip title='Logout'>
              <button className='logout-button' onClick={handleLogoff} type='button'>
                <LogoutIcon />
              </button>
            </Tooltip>
          ) : null}
        </div>
        {!isLoading && !errorMessage.length ? (
          <div className={`filters ${theme}`}>
            <div className='favorite-and-sort-filters'>
              <Tooltip title='Filter only Favorited Games'>
                <div
                  onClick={() => setIsFavoriteFilter(!isFavoriteFilter)}
                  className={`card-genre favorite-filter ${isFavoriteFilter ? 'selected' : ''}`}
                >
                  <p>Favorited</p>
                </div>
              </Tooltip>
              <SortFilter value={ratingSort} setRatingSort={setRatingSort} />
            </div>

            <div className='available-genres-filter'>
              {avaliableGenres.map((genre) => (
                <Tooltip key={genre} title={`Filter only games that are of genre ${genre}`}>
                  <div
                    key={genre}
                    onClick={() => handleOnSelectGenre(genre)}
                    className={`card-genre  ${theme} ${selectedGenre === genre ? 'selected' : ''}`}
                  >
                    <p>{genre}</p>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        ) : null}

        <div className='loading-container'>{isLoading ? <Loader /> : null}</div>

        {!isLoading && errorMessage.length ? (
          <div className='error-container'>
            <div className='error-message'>
              <p>{errorMessage}</p>
              <button className='retry-button' onClick={handleOnRetry}>
                Try again
              </button>
            </div>
          </div>
        ) : null}
        <GameList
          filteredGames={filteredGames}
          onRateOrFavorite={updateUserInformation}
          handleOpenModal={handleOpen}
        />
      </div>
    </main>
  )
}

export default App
