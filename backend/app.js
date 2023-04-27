const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express.static('./src/routes/post/uploads'))
// app.use(bodyparser.json())
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 5000000}))

app.use(bodyparser.json())


var whitelist = [
    'https://blog.arabikabir.com',
    'http://localhost:3000'
];

// var corsOptions = {
//     origin: function(origin, callback){
//         var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//         callback(null, originIsWhitelisted);
//     },
//     credentials: true
// };
// app.use(cors(corsOptions));

app.options('*', cors())


// routers
const api = require('./src/routes/api')
app.use('/', api)

module.exports = app