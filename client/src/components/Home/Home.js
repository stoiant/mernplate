import React, { Component } from 'react'
import styles from './home.module.scss'
import { Card, CardContent, Typography } from '@material-ui/core'
import GitHubButton from 'react-github-btn'

class Home extends Component {
  render() {
    return (
      <div className={ styles.home }>
        <Card className={ styles.card }>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Mern Boiler Plate
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>

            </Typography>
            <Typography component="p">
              <GitHubButton
                href="https://github.com/stoiant/score_td"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star stoiant/score_fg on GitHub"
              >
                Star
              </GitHubButton>
            </Typography>
            <Typography component="p">
              <GitHubButton
                href="https://github.com/stoiant"
                data-size="large"
                aria-label="Follow @stoiant on GitHub"
              >
                Follow @stoiant
              </GitHubButton>
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Home
