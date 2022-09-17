const express = require('express')
const router = express.Router()

const questions = require('./questions')
const answers = require('./answers')

router.use('/questions', questions)
router.use('/answers', answers)

module.exports = router;