let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/congress_poll_results.db');

class Result {
  constructor(){

  }

  static findTopFive(){
    return new Promise(function(resolve,reject){
      db.all(`SELECT count(*) AS voteCount,
      (
        SELECT name
        FROM congress_members
        WHERE id = politician_id
      ) AS memberName
      FROM votes
      GROUP BY politician_id
      ORDER BY count(*) desc
      LIMIT 5`,
      function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

}

module.exports = Result
