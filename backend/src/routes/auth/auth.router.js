const express = require('express')
const auth = require("../../middleware/auth");
const {
    userSignup,
    userSignin,
    validateToken,
    userProfile
} = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/sign-up', userSignup)
authRouter.post('/sign-in', userSignin)
authRouter.get ('/validate-token', validateToken)
authRouter.get ('/user-profile', userProfile)

module.exports = authRouter