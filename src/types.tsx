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
}

export interface errorMessages {
  'pt-br': string
  'en-us': string
}

export interface GameResponse {
  data: Game[]
}
