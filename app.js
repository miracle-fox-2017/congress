const express = require('express')
const app = express()
const bodyParser = ('body-parser')

app.set('views', './views');
app.set('view engine', 'ejs');



const homeRouter = require('./router/home')
app.use('/', homeRouter)

const top5 = require ('./router/top5')
app.use('/', top5)

app.listen(3000, function () {
  console.log('are u okay?')
})
