import { useState, useEffect, ChangeEvent } from 'react'
import { Card, SearchInput, Loader } from './components'
import { Game } from './types'
import { useGamesApi } from './hooks/useGamesApi'
import { getErrorMessage } from './utils/getErrorMessage'

import { motion, AnimatePresence } from 'framer-motion'
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
  const { getGames } = useGamesApi()

  const fetchGames = async (): Promise<void> => {
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
      setErrorMessage('')
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

        <motion.div layout className='game-list'>
          {filteredGames.map((game: Game) => (
            <AnimatePresence key={game.id}>
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
