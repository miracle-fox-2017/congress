// require library
const express = require('express')
const bodyParser = require('body-parser')

// require router
const index = require('./routers/index')
const result = require('./routers/result')
const voter = require('./routers/voter')

// invoke express
const app = express()

// set view engine ejs
app.set('view engine', 'ejs')

// use body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routing
app.use('/', index)
app.use('/results', result)
app.use('/voters', voter)

// port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
