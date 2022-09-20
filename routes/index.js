const express = require('express')
const router = express.Router()

const questions = require('./questions')
const answers = require('./answers')

router.use('/questions', questions)
router.use('/answers', answers)

router.get('/', (req, res) => {
  res.send('it works')
})

module.exports = router;