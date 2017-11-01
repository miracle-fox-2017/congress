var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('.db/congress_poll_results.db');

const path = require('path');
const dbPath = path.resolve(__dirname, '../db/congress_poll_results.db')
// const dbPath = path.resolve(__dirname, 'congress_poll_results.db')
var db = new sqlite3.Database(dbPath);

class TopFive {

  static calculate(cb){
    db.all(`SELECT pantsu, sub.name, voters.first_name AS jenenge FROM (SELECT votes.politician_id, congress_members.name, COUNT(votes.politician_id) AS pantsu
    FROM votes JOIN congress_members ON votes.politician_id = congress_members.id
    JOIN voters ON votes.voter_id = voters.id
    GROUP BY politician_id
    ORDER BY COUNT(politician_id) DESC LIMIT 5) AS sub
    JOIN votes ON sub.politician_id = votes.politician_id
    JOIN voters ON votes.voter_id = voters.id`,
      function(err,hasil){
        if(!err){
          cb(hasil)
        }else{
          console.log(err);
        }
      })
  }
    
}

module.exports = TopFive