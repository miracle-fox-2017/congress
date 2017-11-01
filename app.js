const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.get('/', function (req, res) {
  //res.send('Hello World!')
  res.render('index')
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




const top5 =  require ('./routes/top5.js')
app.use('/top5', top5)

const voter = require('./routes/voters.js')
app.use('/voters', voter)


const analisa = require('./routes/analisa.js')
app.use('/analisa', analisa)



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
