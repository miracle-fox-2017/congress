const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Results {
  static top5(callBack){
    db.all(`SELECT getTotal.Total, getTotal.name, voters.first_name FROM
       (SELECT COUNT(votes.politician_id) AS Total, congress_members.name,congress_members.id
       FROM votes
       INNER JOIN congress_members ON congress_members.id = votes.politician_id
       GROUP BY votes.politician_id
       ORDER BY Total DESC
       LIMIT 5)  AS getTotal
       INNER JOIN votes ON votes.politician_id = getTotal.id
       INNER JOIN voters ON voters.id = votes.voter_id
       ORDER BY getTotal.Total DESC, getTotal.name DESC`, function(err,rows{
         if(err){
           console.log(err);
         }
         else{

         }
       })
  }
}

module.exports = Result
