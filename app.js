
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser')

const index  = require('./router/index')
const result = require('./router/results')
const voter  = require('./router/voter')

app.set('view engine', 'ejs')

app.use('/', index)
app.use('/', result)
app.use('/voters', voter)

app.listen(3000, ()=>{
	console.log('tesss bro!');
})