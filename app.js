const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./data/database.db');
const index = require('./routers/index');
const voters = require('./routers/voters');
const results = require('./routers/results');
// CREATE TABLE congress_members (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name VARCHAR(64) NOT NULL,
//   party VARCHAR(64) NOT NULL,
//   location VARCHAR(64) NOT NULL,
//   grade_1996 REAL,
//   grade_current REAL,
//   years_in_congress INTEGER,
//   dw1_score REAL
// , created_at DATETIME, updated_at DATETIME);
// CREATE TABLE voters (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     first_name VARCHAR(64) NOT NULL,
//     last_name  VARCHAR(64) NOT NULL,
//     gender VARCHAR(64) NOT NULL,
//     party VARCHAR(64) NOT NULL,
//     party_duration INTEGER,
//     age INTEGER,
//     married INTEGER,
//     children_count INTEGER,
//     homeowner INTEGER,
//     employed INTEGER,
//     created_at DATETIME NOT NULL,
//     updated_at DATETIME NOT NULL
//   );
// CREATE TABLE votes (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     voter_id INTEGER,
//     politician_id INTEGER,
//     created_at DATETIME NOT NULL,
//     updated_at DATETIME NOT NULL,
//     FOREIGN KEY(voter_id) REFERENCES voters(id),
//     FOREIGN KEY(politician_id) REFERENCES congress_members(id)
//   );

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.set('view engine', 'ejs');

//ROUTE
app.use('/', index);
app.use('/results', results);
app.use('/voters', voters);

app.listen(3000,(err)=>{
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
