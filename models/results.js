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
 static getAnalyzed(){
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT voters.first_name || ' ' || voters.last_name AS name, voters.gender, voters.age, COUNT(votes.voter_id) AS Number
      FROM votes
      INNER JOIN voters ON voters.id = votes.voter_id
      GROUP BY votes.voter_id
      HAVING COUNT(votes.voter_id) > 1
      ORDER BY name ASC
    `, (err, rows) => {
      if (err) reject(err);
      console.log(rows);
      resolve(rows);
    });
  })
}

}



module.exports = Result
