import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { setNotifications } from '../../actions/connectionActions'
import styles from './readme.module.scss'
import ReactMarkdown from 'react-markdown/with-html'
import axios from 'axios'

class Readme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: "## Unable to load README.MD.",
      loading: true
    }
    this.markdown = null;
  }

  downloadReadmeMD = async () => {
    let response
    try {
      response = await axios.get('/README.md');
    } catch (error) {
      this.props.notification({
        type: 'danger',
        title: 'Meh...',
        message: 'Some error error!' + error
      })
    }
    if (response.status === 200) {
      this.setState({ markdown: response.data, loading: false });
    } else {
      this.props.notification({
        type: 'danger',
        title: `${response.status} - ${response.message}`,
        message: `Some unknown error occured: ${response.status}`
      })
    }
    this.setState({ loading: false });
  }

  async componentDidMount() {
    await this.downloadReadmeMD();
  }

  render() {
    return (
      <div className = { styles.readme } >
        <ReactMarkdown
          source={this.state.markdown}
          escapeHtml={false}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Readme))
