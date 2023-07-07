export const getGamesErrorMessage = (status: any): string => {
  const timeoutExceeded = 'ECONNABORTED'
  const StatusCodeList = [500, 502, 503, 504, 507, 508, 509]

  if (status === timeoutExceeded) {
    return 'The server took a while to respond, please try again later.'
  }

  if (status in StatusCodeList) {
    return 'The server failed to respond, try reloading the page.'
  }

  return 'The server will not be able to respond for now, please try to come back later.'
}

export const getAuthErrorMessage = (message: string): string => {
  const newString = message.replace('auth/', '')

  const result = newString.replace(/-/g, ' ')

  return result
}
