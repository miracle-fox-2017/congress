const express = require('express')
const app = express()
const bodyParser =require('body-parser')

// require FILE router
const home = require('./routers/index')
const voter = require('./routers/voters')
const result = require('./routers/results')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views','./views')
app.set('view engine','ejs')


//HOME
app.use('/',home)
//Voter
app.use('/voters',voter)
//results
app.use('/results',result)






app.listen(3000)
