const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Result{

  static findTop5(callback){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT getTotal.Total, getTotal.name, voters.first_name FROM (SELECT COUNT(votes.politician_id) AS Total, congress_members.name,congress_members.id FROM votes
              INNER JOIN congress_members ON congress_members.id = votes.politician_id
              GROUP BY votes.politician_id
              ORDER BY Total DESC
              LIMIT 5)  AS getTotal
              INNER JOIN votes ON votes.politician_id = getTotal.id
              INNER JOIN voters ON voters.id = votes.voter_id
              ORDER BY Total DESC,name ASC;`,(err,rows)=>{
                if (err){ reject(err) }
                else { resolve(rows) }
              })
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
