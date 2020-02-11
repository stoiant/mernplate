'use strict'

const config = require('./services/config')
const express = require('./services/express')
const db = require('./services/database')
const show = require('./services/logging')
const stats = require('./services/stats')
// TODO fix it to use redis for sessions
const session = require('express-session')

module.exports = {
  config,
  express,
  session,
  show,
  db,
  stats
}
