const pool = require('../db')

exports.get = async (question_id, page, count) => {
  const offset = ((page - 1) * count).toString()
  const limit = count.toString()

  const sql = `
  SELECT
    id AS answer_id,
    body,
    date_written AS 'date',
    answerer_name,
    helpful AS helpfulness,
    (SELECT
    JSON_ARRAYAGG(urls)
    FROM
      (SELECT
      JSON_OBJECT('id', id, 'url', url) AS urls
      FROM
        (SELECT
          id, url
        FROM
          answers_photos
        WHERE
          answer_id = a.id
        ) AS t_photos
      ) AS t_urls
    ) AS photos
  FROM
        answers a
  WHERE
  question_id = ? AND reported = false
  LIMIT ? OFFSET ?
  `

  const inserts = [question_id, limit, offset]

  const [results, fileds] = await pool.execute(sql, inserts)
  return results
}

exports.post = async (newA) => {
  const { question_id, body, answerer_name, answerer_email, date_written } = newA
  const sql = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email) VALUE (?,?,?,?,?)`
  const inserts = [question_id, body, date_written, answerer_name, answerer_email]
  const result = await pool.execute(sql, inserts)
  return result[0].insertId
}

exports.updateHelpfulByOne = async (answer_id) => {
  const sql = 'UPDATE answers SET helpful = helpful + 1 WHERE id = ?'
  const inserts = [answer_id]
  const result = await pool.execute(sql, inserts)
}

exports.udpateReportedAsTrue = async (answer_id) => {
  const sql = 'UPDATE answers SET reported = ? WHERE id = ?'
  const inserts = [true, answer_id]
  await pool.execute(sql, inserts)
}