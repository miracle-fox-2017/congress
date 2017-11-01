const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set the view engine to ejs
app.set('views', './views');
app.set('view engine', 'ejs');

let index = require('./routers');
app.use('/', index);

let top5 = require('./routers/top5.js');
app.use('/', top5);

let analyzed = require('./routers/analyzed.js');
app.use('/', analyzed);

let voters = require('./routers/voters.js');
app.use('/', voters);

app.listen(3000, function () {
  console.log('App congress on port 3000!');
});
