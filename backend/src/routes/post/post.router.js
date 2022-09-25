const express = require('express')
const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')
const {
    insertPost
} = require('./post.controller')

const expenseRouter = express.Router()

const multipartyMiddleware = multiparty({
    uploadDir: './images'
})

expenseRouter.post('../uploads', multipartyMiddleware, (req, res) => {
    let tempFile = req.files.upload;
    let temPathFile = tempFile.path

    let targetPathUrl = path.join(__dirname, "./uploads/" + tempFile.name)

    if(path.extname(tempFile.originalFilename).toLowerCase() === "png" || ".jpg" || ".jpeg") {
        fs.rename(temPathFile, targetPathUrl, err => {
            const basename = path.basename(targetPathUrl)

            if(!basename) {
                return console.log('file not found');
            }

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

expenseRouter.post('/', insertPost)