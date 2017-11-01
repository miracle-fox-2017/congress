const express = require('express')
const app     = express()

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

//route index
var index = require ('./routers/index');
app.use('/', index);

//route results
var results = require ('./routers/results');
app.use('/results', results);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})