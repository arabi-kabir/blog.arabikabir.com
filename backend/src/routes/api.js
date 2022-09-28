const express = require('express')

const authRouter = require('./auth/auth.router')
const postRouter = require('./post/post.router')

const api = express.Router()

// routers
api.use('/auth', authRouter)
api.use('/post', postRouter)

module.exports = api