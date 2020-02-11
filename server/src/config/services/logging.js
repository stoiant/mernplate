'use strict'

const winston = require('winston')

/**
 * Logging configuration (winston)
 */
const show = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: '/var/log/node/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: '/var/log/node/combined.log'
    })
  ]
})

if (process.env.NODE_ENV !== 'test') {
  show.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = show
