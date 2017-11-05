let express = require('express');
let app = express()
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/congress_poll_results.db');
let body = require('body-parser');

//Views Engine Setup
app.set('view engine','ejs')
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

// Routers
let index = require('./routers/index.js')
let results = require('./routers/results.js')
// let voters = require('./routers/voters.js')

// Index
app.use('/',index)
// Results
app.use('/results',results)
// Voters
// app.use('/',voters)

//Listening on which server
app.listen(3000,function(){
    console.log('Example app listening on port 3000!')
})
