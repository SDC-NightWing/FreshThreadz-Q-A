const express = require('express')

const app = express()
const router = require('./routes')

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use('/qa', router)

app.listen(PORT, () => {
  console.log(`App is listenming on port ${PORT}`)
})