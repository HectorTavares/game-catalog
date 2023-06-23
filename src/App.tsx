import { useState, useEffect, ChangeEvent } from 'react'
import { Card, SearchInput, Loader } from './components'
import { Game, errorMessages } from './types'
import { useGamesApi } from './hooks/useGamesApi'
import { getErrorMessage } from './utils/getErrorMessage'

import { motion, AnimatePresence } from 'framer-motion'
import './style.scss'

const ALL = 'All'

const errorMessagesInitialValue: errorMessages = { 'pt-br': '', 'en-us': '' }

function App() {
  const [gameList, setGameList] = useState([])
  const [errorMessage, setErrorMessage] = useState(errorMessagesInitialValue)
  const [isLoading, setIsLoading] = useState(true)

  const [avaliableGenres, setAvaliableGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(ALL)
  const [filteredGames, setFilteredGames] = useState([])
  const [searchText, setSearchText] = useState('')
  const { getGames } = useGamesApi()

  const fetchGames = async () => {
    try {
      const games = await getGames()

      setGameList(games.data)
      setFilteredGames(games.data)
      const newAvaliableGenres = games.data
        .map((game: Game) => game.genre)
        .filter(function (elem: string, pos: number, self: string | string[]) {
          return self.indexOf(elem) == pos
        })

      newAvaliableGenres.sort()
      newAvaliableGenres.unshift(ALL)

      setAvaliableGenres(newAvaliableGenres)
      setErrorMessage(errorMessagesInitialValue)
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(getErrorMessage(error.response.status))
      } else {
        setErrorMessage(getErrorMessage(error.code))
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

    if (selectedGenre === ALL) {
      newFilteredGames = gameList
    } else {
      newFilteredGames = newFilteredGames.filter((game: Game) => game.genre === selectedGenre)
    }

    if (searchText.length) {
      newFilteredGames = newFilteredGames.filter((game: Game) =>
        game.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    setFilteredGames(newFilteredGames)
  }, [selectedGenre, searchText])

  const handleOnSelectGenre = (genre: string) => {
    if (genre === selectedGenre) {
      setSelectedGenre(ALL)
    } else {
      setSelectedGenre(genre)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  const handleOnReset = () => {
    setSearchText('')
  }

  const handleOnRetry = () => {
    setIsLoading(true)
    fetchGames()
  }

  return (
    <section className='app'>
      <div className='container'>
        <div className='search-container'>
          <SearchInput value={searchText} onChange={handleChange} onReset={handleOnReset} />
        </div>
        <div className='available-genres-filter'>
          {avaliableGenres.map((genre) => (
            <div
              key={genre}
              onClick={() => handleOnSelectGenre(genre)}
              className={`card-genre ${selectedGenre === genre ? 'selected' : ''}`}
            >
              <p>{genre}</p>
            </div>
          ))}
        </div>
        <div className='loading-container'>{isLoading ? <Loader /> : null}</div>

        {!isLoading && errorMessage['en-us'].length ? (
          <div className='error-container'>
            <div className='error-message'>
              <p>{errorMessage['en-us']}</p>
              <p>{errorMessage['pt-br']}</p>
              <button className='retry-button' onClick={handleOnRetry}>
                Try again
              </button>
            </div>
          </div>
        ) : null}

        <motion.div layout className='game-list'>
          {filteredGames.map((game: Game) => (
            <AnimatePresence>
              <Card
                key={game.id}
                title={game.title}
                image={game.thumbnail}
                description={game.short_description}
                platform={game.platform}
                publisher={game.publisher}
                genre={game.genre}
                link={game.game_url}
              />
            </AnimatePresence>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default App
