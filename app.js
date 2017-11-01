const express = require('express')
const bodyParser = require('body-parser')

const index = require('./routers/index')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ntl')

app.use('/', index)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
