export const getErrorMessage = (status: any) => {
  const timeoutExceeded = 'ECONNABORTED'
  const StatusCodeList = [500, 502, 503, 504, 507, 508, 509]

  if (status === timeoutExceeded) {
    return {
      'pt-br': 'O servidor demorou para responder, tente mais tarde.',
      'en-us': 'The server took a while to respond, please try again later.',
    }
  }

  if (status in StatusCodeList) {
    return {
      'pt-br': 'O servidor falhou em responder, tente recarregar a página.',
      'en-us': 'The server failed to respond, try reloading the page.',
    }
  }

  return {
    'pt-br': 'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.',
    'en-us': 'The server will not be able to respond for now, please try to come back later.',
  }
}
