const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let index = require('./routes/index')
let voters = require('./routes/voter')
let results = require('./routes/result')

app.use('/', index)
app.use('/voters', voters)
app.use('/results', results)


app.listen(3000)