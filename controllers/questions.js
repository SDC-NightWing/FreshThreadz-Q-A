const questions = require('../models/questions')
const answers = require('../models/answers')
const answersPhotos = require('../models/answers_photos')

exports.listQuestions = async (req, res) => {
  const { product_id, page = 1, count = 5 } = req.query;
  const results = await questions.get(product_id, page, count)
  res.status(200).json({ product_id, results })
}

exports.listAnswers = async (req, res) => {
  const { question_id } = req.params
  const { page = 1, count = 5 } = req.query
  const results = await answers.get(question_id, page, count)
  res.status(200).json({ question: question_id, page, count, results })
}

exports.addQuestion = async (req, res) => {
  const { body, name: asker_name, email: asker_email, product_id } = req.body;
  const newQ = { product_id, body, asker_name, asker_email }
  newQ.date_written = new Date()
  const result = await questions.post(newQ)
  res.status(201).json('Created')
}

exports.addAnswer = async (req, res) => {
  const { question_id } = req.params
  const { body, name: answerer_name, email: answerer_email, photos } = req.body
  const newA = { question_id, body, answerer_name, answerer_email }
  newA.date_written = new Date()
  const answer_id = await answers.post(newA)

  const newPs = photos.map(url => ({ url, answer_id }))
  const promises = newPs.map(async (photo) => await answersPhotos.post(photo))
  const photo_ids = await Promise.all(promises)

  res.status(201).send('Created')
}

exports.markHelpful = async (req, res) => {
  const { question_id } = req.params
  await questions.updateHelpfulByOne(question_id)
  res.status(204).end()
}

exports.report = async (req, res) => {
  const { question_id } = req.params
  await questions.udpateReportedAsTrue(question_id)
  res.status(204).end()
}