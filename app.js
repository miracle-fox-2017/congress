const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const index = require('./routers/index');
const voters = require('./routers/voters');
const results = require('./routers/results');
// CREATE TABLE congress_members (
//   id name party location grade_1996 grade_current years_in_congress dw1_score
// CREATE TABLE voters (
        //id first_name last_name gender party party_duration age married children_count homeowner employed
// CREATE TABLE votes (
//     id voter_id politician_id
//     FOREIGN KEY(voter_id) REFERENCES voters(id),
//     FOREIGN KEY(politician_id) REFERENCES congress_members(id)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
