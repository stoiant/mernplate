import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styles from './log.module.scss'
import Iframe from 'react-iframe'

class Log extends Component {
  render() {
    return (
        <div className={ styles.status }>
          <Iframe url = { `${this.props.logUrl}` }
            id = "frame"
            width = "100%"
            height = "100%"
            overflow = "auto"
          />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    theme: state.theme,
    logUrl: state.logUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Log))
