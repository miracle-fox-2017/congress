const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Router
const index = require('./router/index')
const result = require('./router/results')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('views', './views')//renderer
app.set('view engine', 'ejs');

// Index
app.use(index)
app.use(result)

app.listen(3000, function () {
  console.log('Congress Online!')
})