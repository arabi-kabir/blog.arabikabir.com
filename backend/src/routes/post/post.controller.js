const { response } = require('express');
var mongoose = require('mongoose');
const Post = require('../../models/post');

const Expense = require('../../models/post')

// get all expense
async function insertPost(req, res) {
    const data = req.body

    const post = new Post();
    post.post_title =  data.post_title
    post.post_author = data.post_author
    post.post_body = data.post_body

    try {
        await post.save()
        res.status(201).send(post)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    insertPost
}