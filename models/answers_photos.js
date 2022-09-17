const pool = require('../db')
exports.post = async (photo) => {
  const { url, answer_id } = photo
  const sql = `INSERT INTO answers_photos (answer_id, url) VALUE (?, ?)`
  const inserts = [answer_id, url]

  const result = await pool.execute(sql, inserts)
  return result[0].insertId
}