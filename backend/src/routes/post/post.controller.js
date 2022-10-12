const { response } = require('express');
var mongoose = require('mongoose');
const Post = require('../../models/post');
const { getUserInfo } = require('../../services/user_info');

// get all expense
async function insertPost(req, res) {
    const data = req.body

    const user = await getUserInfo(req)

    const post = new Post();
    post.post_title =  data.blogData.title
    post.post_author = data.blogData.author
    post.post_body = data.blogData.content
    post.short_description = data.blogData.short_description
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

async function updatePost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.id })

        if(!post) {
            res.status(400).send('post not found')
        } else {
            const data = req.body
            post.post_title = data.blogData.title
            post.post_author = data.blogData.author
            post.post_body = data.blogData.content
            post.short_description = data.blogData.short_description
            await post.save()

            res.status(200).send('post saved')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

async function deletePost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.id })

        if(!post) {
            res.status(400).send('post not found')
        } else {
            post.remove()
            res.status(200).send('post deleted')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

async function getAllPost(req, res) {
    const PAGE_SIZE = 5
    const page = parseInt(req.query.page || 0)
    const total = await Post.countDocuments({})

    try {
        post = await Post.find({})
            .limit(PAGE_SIZE)
            .skip(PAGE_SIZE * page)
            .sort({'createdAt': -1})

        return res.status(200).json({
            post_data: post,
            totalPages: Math.ceil(total / PAGE_SIZE)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

async function getMyPost(req, res) {
    try {
        const user = await getUserInfo(req)
        const posts = await Post.find({ post_owner_id: mongoose.Types.ObjectId(user.user_id) }).sort({'createdAt': -1})

        return res.status(200).json({
            my_posts: posts
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

async function recentPosts(req, res) {

}

module.exports = {
    insertPost,
    getPost,
    getMyPost,
    getAllPost,
    updatePost,
    deletePost
}