const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/results/top5', function (req, res) {
  res.send('HALAMAN RESULT TOP 5')
})

app.get('/voters', function (req, res) {
  let queryVoters = `SELECT first_name FROM voters`
  db.all(queryVoters, function(err, rowVoters){
    res.render('voters',{rowVoters})
  })
})

app.get('/results/analyzed', function (req, res) {
    res.send('HALAMAN ANALYZED')
})

app.listen(3000, function() {
  console.log('Listen to 3000 !');
})
