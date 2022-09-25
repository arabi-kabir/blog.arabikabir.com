const express = require('express')

const postRouter = require('./post/post.router')

const api = express.Router()

// routers
api.use('/post', postRouter)