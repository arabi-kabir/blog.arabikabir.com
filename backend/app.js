// const express = require('express')
const bodyparser = require('body-parser')
// const multiparty = require('connect-multiparty')
// const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

// const multipartyMiddleware = multiparty({
//     uploadDir: './images'
// })

// const PORT = process.env.PORT || 8002

// const app = express()
// app.use(cors())
// app.use(bodyparser.urlencoded({ extended: true }))
// app.use(bodyparser.json())

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: "server is ok"
//     })
// })



app.post('/uploads', multipartyMiddleware, (req, res) => {
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

// app.post('/save-blog-data', (req, res) => {
//     console.log(req.body);
// })

// app.listen(PORT, () => {
//     console.log(`Server started at : + ${PORT}`);
// })







const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static('./uploads'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())

// routers
const api = require('../src/routes/api')
app.use('/v1', api)

module.exports = app