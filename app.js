const express = require('express')
var cors = require('cors')

const app = express()
const router = require('./routes')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use('/qa', router)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})