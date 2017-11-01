const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const index  = require('./routes/index')
const result = require('./routes/result')
const voter  = require('./routes/voter')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/results', result)
app.use('/voters', voter)

app.listen(3000, ()=>{
	console.log('jalan guys');
})