const initState = {
  user: null,
  authenticated: false,
  notification: null,
  theme: 'light'
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'setUrl':
      return {
        ...state,
        url: action.url
      }
    case 'setNodeUrl':
      return {
        ...state,
        nodeUrl: action.nodeUrl
      }
     case 'setLogUrl':
      return {
        ...state,
        logUrl: action.logUrl
      }
    case 'setNotifications':
      return {
        ...state,
        notification: action.notification
      }
    case 'setTheme':
      return {
        ...state,
        theme: action.theme
      }
    default:
      return state
  }
}

export default rootReducer
