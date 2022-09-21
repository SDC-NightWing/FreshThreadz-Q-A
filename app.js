const express = require('express')
require('dotenv').config()
var cors = require('cors')
const path = require('path')

const app = express()
const router = require('./routes')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/qa', router)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})