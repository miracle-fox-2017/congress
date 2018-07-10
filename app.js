const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

const index = require('./routers/index')
app.use('/', index)


const top5 = require('./routers/top5')
app.use('/result/top5', top5)

const voters = require('./routers/voters')
app.use('/voters', voters)

const analyzed = require('./routers/analyze')
app.use('/results/analyzed', analyzed)



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})