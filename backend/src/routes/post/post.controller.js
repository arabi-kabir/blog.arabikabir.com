const { response } = require('express');
var mongoose = require('mongoose');
const Post = require('../../models/post');

const Expense = require('../../models/post')
const { getUserInfo } = require('../../services/user_info')

// get all expense
async function insertPost(req, res) {
    const data = req.body

    const user = await getUserInfo(req)

    console.log(user);

    const post = new Post();
    post.post_title =  data.blogData.title
    post.post_author = data.blogData.author
    post.post_body = data.blogData.content
    post.post_owner_id = user.user_id

    try {
        await post.save()
        res.status(201).send("success")
    } catch (error) {
        res.status(400).send(error)
    }
}

async function getPost(req, res) {
    try {
        post = await Post.findOne({ _id: req.params.id })
        return res.status(200).json({
            post_data: post
        })
    } catch (error) {
        res.status(400).send(error)
    }
}


async function getMyPost(req, res) {
    try {
        const user = await getUserInfo(req)

        const posts = await Post.find({ post_owner_id: mongoose.Types.ObjectId(user.user_id) })
        
        return res.status(200).json({
            my_posts: posts
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    insertPost,
    getPost,
    getMyPost
}