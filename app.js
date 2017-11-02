const express = require ('express')
const voters = require('./routers/voters')
const bodyParser = require('body-parser')
const app = express()
const results = require('./routers/results')
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('home')
})

//results

app.use('/results', results)


// app.use('/results',(req,res)=>{
//     res.render('results')
// })

// app.use('/voters',(req,res)=>{
//     res.render('voters')
// })

//Voters Page

app.use('/voters',voters)




app.listen(3000,function(){
    console.log('===================masuk cuy==================')
  })