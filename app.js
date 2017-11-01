const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser')

const indexRoute = require('./routers/index-route.js');
const voterRoute = require('./routers/voter-route.js');
const resultRoute = require('./routers/results-route.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use('/', indexRoute);
app.use('/results', resultRoute)
app.use('/voters', voterRoute)

app.listen(3002, function () {
  console.log('Example app listening on port 3000!')
})