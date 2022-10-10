const express = require('express')
const auth = require("../../middleware/auth");
const {
    userSignup,
    userSignin,
    validateToken
} = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/sign-up', userSignup)
authRouter.post('/sign-in', userSignin)
authRouter.get ('/validate-token', validateToken)

module.exports = authRouter