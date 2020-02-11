'use strict'

let dash = require('appmetrics-dash')
const server = require('./src/server')

dash.monitor({
  server: server.server,
  port: 3003,
  host: 'localhost',
  url: '/node-dash'
})

/**
 * Start server
 */
server.listen()
