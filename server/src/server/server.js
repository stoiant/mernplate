'use strict'

const {
  config,
  express,
  // session,
  // passport,
  // TODO enable DB
  // db,
  show,
  stats
  // socket
} = require('../config')

const routes = require('../../routes')
const mongoose = require('mongoose')
const spdy = require('spdy')
let server = null

/**
 * Start HTTP/2 server, database, socket.io connection
 * Load routes, services, check memory usage
 * @function
 */
const listen = () => {
  const app = express.init()
  app.use(require('express-status-monitor')())
  // TODO fix to use redis sessions
  // session.init(app)
  // TODO enable passport
  // passport.init(app)
  // db.init()

  var options = {
    // Private key
    // key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),

    // Fullchain file or cert file (prefer the former)
    // cert: fs.readFileSync(__dirname + '/keys/spdy-fullchain.pem'),

    // **optional** SPDY-specific options
    spdy: {
      // protocols: ['h2', 'spdy/3.1', ..., 'http/1.1'],
      plain: true,
      ssl: false,

      // **optional**
      // Parse first incoming X_FORWARDED_FOR frame and put it to the
      // headers of every request.
      // NOTE: Use with care! This should not be used without some proxy that
      // will *always* send X_FORWARDED_FOR
      'x-forwarded-for': true,

      connection: {
        windowSize: 1024 * 1024, // Server's window size

        // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
        autoSpdy31: false
      }
    }
  }

  // TODO Enable SSL
  // server = spdy.createServer(config.sslOptions, app).listen(config.port, config.ip)
  server = spdy.createServer(options, app).listen(config.port, config.ip)
  show.debug(`Listening at http://${config.host}:${config.port}`)
  // TODO integrate socket.io
  // socket.listen(server)
  routes.init(app)
  stats.memory()
}

/**
 * Close server, database connection
 * @function
 */
const close = () => {
  server.close()
  mongoose.disconnect()
  show.debug('Server down')
}

module.exports = {
  listen,
  close,
  server
}
