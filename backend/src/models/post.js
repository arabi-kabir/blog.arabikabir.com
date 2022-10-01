const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    post_title: {
        type: String,
        trim: true,
        required: true
    },
    post_author: {
        type: String,
        required: false
    },
    post_body: {
        type: String,
        required: false
    },
    post_owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post