import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Game, firebaseGame } from '../../types'
import { Card } from '../card'
import { Loader } from '..'

export const MyList = ({
  filteredGames,
  onRateOrFavorite,
  handleOpenModal,
}: {
  filteredGames: Game[]
  onRateOrFavorite: (updatedGame: firebaseGame) => void
  handleOpenModal: () => void
}) => {
  const [visibleItems, setVisibleItems] = useState(12)
  const itemsPerPage = 12

  const fetchMoreData = () => {
    // Simule o carregamento progressivo dos itens
    setTimeout(() => {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage)
    }, 1000)
  }

  return (
    <div className='game-list'>
      <InfiniteScroll
        dataLength={visibleItems}
        next={fetchMoreData}
        hasMore={visibleItems < filteredGames.length}
        loader={<Loader />}
        style={{ overflow: 'initial' }}
      >
        {filteredGames.slice(0, visibleItems).map((game) => (
          <Card
            key={game.id}
            gameId={game.id}
            title={game.title}
            image={game.thumbnail}
            description={game.short_description}
            platform={game.platform}
            publisher={game.publisher}
            genre={game.genre}
            isFavorited={game.isFavorited}
            avaliation={game.rating}
            onRateOrFavorite={onRateOrFavorite}
            handleOpenModal={handleOpenModal}
            link={game.game_url}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
