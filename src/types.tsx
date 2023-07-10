export interface Game {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
  isFavorited: boolean
  rating: number
}

export interface firebaseGame {
  isFavorited: boolean
  gameId: number
  rating: number
}

export interface ratingSort {
  isActivated: boolean
  isDesc: boolean
}

export const defaultRatingSortValues: ratingSort = {
  isActivated: false,
  isDesc: true,
}
