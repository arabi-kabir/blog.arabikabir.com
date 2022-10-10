const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static('./src/routes/post/uploads'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())

// app.use(cors({
//     origin: ['*']
// }));

// const corsOption = {
//     origin: ['http://blog.arabikabir.com'],
// }

// app.use(cors(corsOption));

// app.use(function (req, res, next) {
//     if (req.hostname.endsWith('arabikabir.com')) {
//         res.setHeader('Access-Control-Allow-Origin', 'http://' + req.hostname)
//         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//     }
//     next()
// })



// routers
const api = require('./src/routes/api')
app.use('/', api)

module.exports = app