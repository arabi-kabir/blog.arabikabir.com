const express = require('express')
const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')
const multer = require("multer")
const {
    insertPost,
    getPost,
    getMyPost,
    getAllPost
} = require('./post.controller')
const auth = require('../../middleware/auth')

const postRouter = express.Router()

postRouter.get ('/all-posts', getAllPost)


// postRouter.use(auth)

postRouter.post('/save-post-data', auth, insertPost)
postRouter.get ('/my-posts', auth, getMyPost)

postRouter.get ('/:id', getPost)


module.exports = postRouter