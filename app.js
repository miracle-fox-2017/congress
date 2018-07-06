const express = require('express')
const bodyParser = require('body-parser')


const app = express()
//load css
app.use(express.static(__dirname + '/views'))
//load ejs
app.set('view engine', 'ejs')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//require routers
let index = require('./routers/index')
let top5 = require('./routers/top5')
let voters = require('./routers/voters')
let analityc = require('./routers/analityc')

app.use('/', index)
app.use('/top5', top5)
app.use('/voters', voters)
app.use('/analityc', analityc)


app.listen(3000, err => {
  if(!err){
    console.log('server listen on port:3000');
  }
})
