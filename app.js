const express = require('express')
const bodyParser = require('body-parser')
const results = require('./routers/results')
const index = require('./routers/index')
const voters = require('./routers/voters');
const app = express()

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/results', results)
app.use('/', index)
app.use('/voters', voters)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
