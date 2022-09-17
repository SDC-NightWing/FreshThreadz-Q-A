const answers = require('../models/answers')

exports.markHelpful = async (req, res) => {
  const {answer_id} = req.params
  await answers.updateHelpfulByOne(answer_id)
  res.status(204).end()
}

exports.report = async (req, res) => {
  const {answer_id} = req.params
  await answers.udpateReportedAsTrue(answer_id)
  res.status(204).end()
}