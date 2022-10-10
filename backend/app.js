const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express.static('./src/routes/post/uploads'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())


var whitelist = [
    'https://blog.arabikabir.com'
];

var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));


// routers
const api = require('./src/routes/api')
app.use('/', api)

module.exports = app