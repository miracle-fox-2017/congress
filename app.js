const express = require('express');
const app 	  = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs')


const Local     = require('./routers/local.js') 
const Result    = require('./routers/results.js')
const Voters    = require('./routers/voters.js')

app.use('/', Local);	
app.use('/results', Result);	
app.use('/voters', Voters);	


app.listen(3000, function(){
	console.log('Local host 3000')
})