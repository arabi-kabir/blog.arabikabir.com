const express = require('express')
const {
    insertPost,
    getPost,
    getMyPost,
    getAllPost,
    updatePost,
    deletePost
} = require('./post.controller')
const auth = require('../../middleware/auth')

const postRouter = express.Router()

postRouter.get ('/all-posts', getAllPost)
postRouter.post('/save-post-data', auth, insertPost)
postRouter.get('/my-posts', auth, getMyPost)
postRouter.put('/update-post/:id', auth, updatePost)
postRouter.delete('/delete-post/:id', deletePost)
postRouter.get ('/:id', getPost)


module.exports = postRouter