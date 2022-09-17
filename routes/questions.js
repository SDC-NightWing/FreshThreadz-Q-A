const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/questions')

router.get('/', ctrl.listQuestions)
router.get('/:question_id/answers', ctrl.listAnswers)
router.post('/', ctrl.addQuestion)
router.post('/:question_id/answers', ctrl.addAnswer)
router.put('/:question_id/helpful', ctrl.markHelpful)
router.put('/:question_id/report', ctrl.report)

module.exports = router;