import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import styles from './app.module.scss'
import Home from './components/Home/Home'
import Error from './components/Error/Error'
import Navigation from './components/Navigation/Navigation'
import ExpressStatus from './components/Status/ExpressStatus'
import NodeStatus from './components/Status/NodeStatus'
import Log from './components/Log/Log'
import Readme from './components/Readme/Readme'
import { connect } from 'react-redux'
import { setUrl, setNodeUrl, setLogUrl, setNotifications } from './actions/connectionActions'
import ReactNotification from "react-notifications-component"
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

// eslint-disable-next-line
import axios from 'axios'
import { CssBaseline } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#e0e0e0',
      dark: '#aeaeae',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      paper: '#e0e0e0',
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.url = `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;
    this.nodeUrl = 'http://localhost:3003';
    this.logUrl = 'http://localhost:6688/';
    this.props.setNotifications(this.notification);
    this.props.setUrl(this.url);
    this.props.setNodeUrl(this.nodeUrl);
    this.props.setLogUrl(this.logUrl);
    axios.defaults.withCredentials = true;
  }

  componentDidMount() {
    axios.interceptors.response.use(undefined, (error) => {
      if(error.response.status === 401) {
        this.notification({
          type: 'danger',
          title: 'Failed!',
          message: 'Not logged in!'
        })
        return Promise.reject(error)
      }
    })
  }

  notification = (options) => {
    const { type, title, message } = options;
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceInRight"],
      animationOut: ["animated", "bounceOutRight"],
      dismiss: { duration: 5000 },
      dismissable: { click: true }
    })
  }

  render() {
    return (
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className={ styles.app }>
            <ReactNotification />
            <Navigation />
            <Switch>
              <Route path="/" component={ Home } exact />
              <Route path="/expressStatus" component={ ExpressStatus } />
              <Route path="/nodeStatus" component={ NodeStatus } />
              <Route path="/readme" component={ Readme } />
              <Route path="/logs" component={ Log } />
              <Route component={ Error } />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    theme: state.theme,
    url: state.url
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUrl: url => { dispatch(setUrl(url)) },
    setNodeUrl: nodeUrl => { dispatch(setNodeUrl(nodeUrl))},
    setLogUrl: logUrl => { dispatch(setLogUrl(logUrl))},
    setNotifications: notifications => { dispatch(setNotifications(notifications)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
