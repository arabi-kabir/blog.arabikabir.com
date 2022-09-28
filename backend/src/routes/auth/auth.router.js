const express = require('express')
const auth = require("../../middleware/auth");
const {
    userSignup,
    userSignin
} = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/sign-up', userSignup)
authRouter.post('/sign-in', userSignin)

module.exports = authRouter