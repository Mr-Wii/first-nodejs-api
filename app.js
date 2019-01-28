require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')
const UserController = require('./user/UserController')

app.use('/User', UserController)

const AuthController = require('./auth/AuthController')

app.use('/auth', AuthController)

module.exports = app
