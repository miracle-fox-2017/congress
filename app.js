const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

const index = require('./routers/index');
const voters = require('./routers/voters');
const result = require('./routers/result');

app.use('/', index)
app.use('/voters', voters)
app.use('/result', result)

app.listen(3000, () => {
  console.log('listening on port 3000!!');
})
