const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const index = require('./routes/index');
const voters = require('./routes/voters');
const results = require('./routes/results')

const app = express()
const db = new sqlite3.Database('./db/congress_poll_result.db')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', index)
app.use('/results', results)
app.use('/voters', voters)
app.use('/results', results)

app.listen(3000, function(){
  console.log('jalan di port 3000 bero');
})
