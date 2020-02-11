import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styles from './node.module.scss'
import Iframe from 'react-iframe'

class NodeStatus extends Component {
  render() {
    console.log('HERE!!! and there')
    console.log('URL: ', `${this.props.nodeUrl}/node-dash`)
    return (
        <div className={ styles.status }>
          <Iframe url = { `${this.props.nodeUrl}/node-dash` }
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
    nodeUrl: state.nodeUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NodeStatus))
