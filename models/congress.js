const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')


class Congress {
  static top5(){
    let query = `SELECT getTotal.Total, getTotal.name, voters.first_name FROM (SELECT COUNT(votes.politician_id) AS Total, congress_members.name,congress_members.id FROM votes
INNER JOIN congress_members ON congress_members.id = votes.politician_id
GROUP BY votes.politician_id
ORDER BY Total DESC
LIMIT 5)  AS getTotal
INNER JOIN votes ON votes.politician_id = getTotal.id
INNER JOIN voters ON voters.id = votes.voter_id
ORDER BY Total DESC`
  return new Promise((resolve,reject)=>{
    db.all(query,(err,rows)=>{
      if(!err){
        resolve(rows)
      }
      else {
        reject(err)
      }
    })
  })
  }
}
module.exports = Congress;
