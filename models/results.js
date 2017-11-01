const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Result{

  static findTop5(callback){
    db.all(`SELECT subquery.C, subquery.name, voters.first_name
      FROM ( SELECT votes.politician_id, congress_members.name, COUNT ( votes.politician_id) C
      FROM votes
      JOIN voters ON votes.voter_id = voters.id
      JOIN congress_members ON congress_members.id = votes.politician_id
      GROUP BY congress_members.name
      ORDER BY COUNT ( votes.politician_id)
      DESC
      LIMIT 5
      ) subquery
      JOIN votes ON votes.politician_id = subquery.politician_id
      JOIN voters ON voters.id = votes.voter_id
      ORDER BY subquery.C DESC, subquery.name ;`,function(err,rows){
        // console.log(rows);
        if(err){
          callback(err,null)
        }else{
          callback(null,rows)
        }
      })
  }


}

module.exports = Result
