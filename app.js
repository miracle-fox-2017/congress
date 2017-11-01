const express=require('express')
const app=express()
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//router
const index = require('./routes/index');
const top5 = require('./routes/top5');
const voters = require('./routes/voters');



//use
app.use('/',index)
app.use('/',top5)
app.use('/',voters)





app.listen(3318, function () {
  console.log('Example app listening on port 3318')
})
