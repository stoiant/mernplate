'use strict'

const homeRoute = require('./home')
const errorRoute = require('./error')

/**
 * Initialize routes
 */
const init = (app) => {
  app.use('*', homeRoute)
  app.use('*', errorRoute)
}

module.exports = {
  init
}
