import axios, { AxiosInstance } from 'axios'

export const useGamesApi = () => {
  const axiosInstance: AxiosInstance = axios.create({
    timeout: 5000,
    headers: {
      'dev-email-address': 'hectortavares07@gmail.com',
    },
  })

  const getGames: any = async () => {
    const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data'
    const response = await axiosInstance.get(url)
    return response
  }

  return { getGames }
}
