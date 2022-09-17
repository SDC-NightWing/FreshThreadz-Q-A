const express = require('express')
const ctrl = require('../controllers/answers')
const router = express.Router()

router.put('/:answer_id/helpful', ctrl.markHelpful)

router.put('/:answer_id/report', ctrl.report)

module.exports = router;