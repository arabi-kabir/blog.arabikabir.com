const { response } = require('express');
var mongoose = require('mongoose');
const Post = require('../../models/post');

const Expense = require('../../models/post')

// get all expense
async function insertPost(req, res) {
    const data = req.body

    console.log(data);

    const post = new Post();
    post.post_title =  data.blogData.title
    post.post_author = data.blogData.author
    post.post_body = data.blogData.content

    try {
        await post.save()
        res.status(201).send("success")
    } catch (error) {
        res.status(400).send(error)
    }
}

async function gettPost(req, res) {
    try {
        post = await Post.findOne({ _id: req.params.id })
        return res.status(200).json({
            post_data: post
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    insertPost,
    gettPost
}