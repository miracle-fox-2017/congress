var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('.db/congress_poll_results.db');

const path = require('path');
const dbPath = path.resolve(__dirname, '../db/congress_poll_results.db')
// const dbPath = path.resolve(__dirname, 'congress_poll_results.db')
var db = new sqlite3.Database(dbPath);

class Analyzed {
  
  static calculate(cb){
    db.all(`SELECT voters.first_name||' '||voters.last_name AS Name, voters.gender, voters.age, COUNT(votes.voter_id) AS Number_of_votes FROM voters JOIN votes ON voters.id = votes.voter_id
    GROUP BY voter_id
    ORDER BY Name , Number_of_votes DESC `,       function(err,hasil){
            if(!err){
              cb(hasil)
            }else{
              console.log(err);
            }
          })
  }
  
}

module.exports = Analyzed