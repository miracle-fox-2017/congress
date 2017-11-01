const express = require('express')
const app = express()

const index  = require('./routes/index')
const result = require('./routes/result')
const voter  = require('./routes/voter')

app.set('view engine', 'ejs')

app.use('/', index)
app.use('/result', result)
app.use('/voters', voter)

app.listen(3000, ()=>{
	console.log('jalan guys');
})