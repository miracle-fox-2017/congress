const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const index = require('./router/index');
const top5 = require('./router/top5')
const votes = require('./router/votes')
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/',index);
app.use('/',top5);
app.use('/',votes)



app.listen(3000,function(){
 })
