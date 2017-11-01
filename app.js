const express = require('express')
const app     = express()
const bodyParser = require('body-parser');

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

//route index
var index = require ('./routers/index');
app.use('/', index);

//route results
var results = require ('./routers/results');
app.use('/results', results);

//voters
var voters = require ('./routers/voters');
app.use('/voters', voters);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})