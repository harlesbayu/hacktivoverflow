const router = require("express").Router()
const userRouter = require("./users")
const questionRouter = require("./questions")
const answerRouter = require("./answers")

router
    .use('/users', userRouter)
    .use('/questions', questionRouter)
    .use('/answers', answerRouter)

module.exports = router