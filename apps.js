const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine


const index = require('./routers/index.js');
const result = require('./routers/results.js');
const voters = require('./routers/voters.js');

app.use('/',index);
app.use('/results',result);
app.use('/voters',voters);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
