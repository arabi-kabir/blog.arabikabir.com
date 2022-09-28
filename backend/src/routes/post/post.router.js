const express = require('express')
const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')
const {
    insertPost,
    gettPost
} = require('./post.controller')

const postRouter = express.Router()

const multipartyMiddleware = multiparty({
    uploadDir: './images'
})

postRouter.post('/uploads', multipartyMiddleware, (req, res) => {
    let tempFile = req.files.upload;
    let temPathFile = tempFile.path

    let targetPathUrl = path.join(__dirname, "./uploads/" + tempFile.name)

    if(path.extname(tempFile.originalFilename).toLowerCase() === "png" || ".jpg" || ".jpeg") {
        fs.rename(temPathFile, targetPathUrl, err => {
            const basename = path.basename(targetPathUrl)

            if(err) {
                return console.log(err);
            }

            res.status(200).json({
                uploaded: true,
                url: `${process.env.SITE_URL}/${basename}`
            })
        })
    }
})

postRouter.post('/save-post-data', insertPost)
postRouter.get ('/:id', gettPost)

module.exports = postRouter