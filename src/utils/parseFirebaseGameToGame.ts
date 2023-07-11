import { firebaseGame, Game } from '../types'

export const parseFirebaseGameListToGameList = (
  firebaseGames: firebaseGame[],
  gamesList: Game[]
) => {
  const result: Game[] = gamesList.map((game) => {
    const gameReference = firebaseGames.find((firebaseGame) => firebaseGame.gameId === game.id)

    if (gameReference) {
      return {
        ...game,
        isFavorited: gameReference.isFavorited,
        rating: gameReference.rating,
      }
    }
    return {
      ...game,
      isFavorited: false,
      rating: 0,
    }
  })

  console.log(result)

  return result
}
