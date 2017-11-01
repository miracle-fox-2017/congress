const express = require('express');
const app = express()
const bodyparser = require('body-parser')
const home = require('./router/home');
const analyze = require('./router/analyze');
const top5 = require('./router/top5');
const voters = require('./router/voters');

app.set('views','./views');
app.set('view engine','ejs')


app.use('/',home);
app.use('/',analyze);
app.use('/',top5);
app.use('/',voters);

app.listen(3000)
