const pool = require('../db')

exports.get = async (product_id, page, count) => {
  const offset = ((page - 1) * count).toString()
  const limit = count.toString()

  // turn the answers_photo table to id, []
  // get all the questions for the product

  const sql = `
  SELECT
  q.id AS question_id,
    q.body AS question_body,
      q.date_written AS question_date,
        q.asker_name,
        q.helpful AS question_helpfulness,
          q.reported,
          (SELECT
          JSON_OBJECTAGG(id, answer)
  FROM
    (SELECT
      a.id,
      JSON_OBJECT(
      "id", a.id,
      "body", a.body,
      "date", a.date_written,
      "answerer_name", a.answerer_name,
      "helpfulness", a.helpful,
      "photos", (SELECT
        JSON_ARRAYAGG(url) AS url
    FROM
        (SELECT
        answer_id, url
    FROM
        answers_photos p
    WHERE
        p.answer_id = a.id) AS tempPhotos)
      ) AS answer
          FROM
              answers a
          WHERE
              a.question_id = q.id AND a.reported = false) AS temp
              ) AS answers
  FROM
  questions q
  WHERE
  q.product_id = ? AND q.reported = false
  LIMIT ? OFFSET ?
  `
  const inserts = [product_id, limit, offset]

  //execute only accepts string values
  const [rows, fields] = await pool.execute(sql, inserts)
  return rows
}

exports.post = async (newQ) => {
  const { product_id, body, date_written, asker_name, asker_email } = newQ
  // const sql = `INSERT INTO questions SET ?`
  // const result = await pool.query(sql, newQ)
  const sql = `INSERT INTO questions (product_id, body, date_written, asker_name, asker_email) VALUES (?, ?, ?, ?, ?)`
  const inserts = [product_id, body, date_written, asker_name, asker_email]
  const result = await pool.execute(sql, inserts)
  return result[0].insertId
}

exports.updateHelpfulByOne = async (question_id) => {
  const sql = 'UPDATE questions SET helpful = helpful + 1 WHERE id = ?'
  const inserts = [question_id]
  const result = await pool.execute(sql, inserts)
  // console.log(result)
}

exports.udpateReportedAsTrue = async (question_id) => {
  const sql = 'UPDATE questions SET reported = ? WHERE id = ?'
  const inserts = [true, question_id]
  await pool.execute(sql, inserts)
}

/*

//use promisified connection
const mysql = require('mysql2/promise');
const db = require('../db')

exports.getAll = async (product_id, page, count) => {
  product_id = parseInt(product_id)
  page = parseInt(page)
  count = parseInt(count)
  const offset = (page - 1) * count
  const limit = count
  const connection = await db()
  //execute only accepts string values in array
  const [rows, fields] = await connection.execute(
    'SELECT * FROM `questions` WHERE `product_id` = ? LIMIT ? OFFSET ?',
    ['1', '1', '1']
  )
  return rows
}
*/