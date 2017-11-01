const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Congress{
  static TOP5(){
    let query = `SELECT totalCongress.totalcount,totalCongress.name,totalCongress.id,voters.first_name
    FROM (SELECT congress_members.name,congress_members.id,
      COUNT(votes.politician_id) AS totalcount
      FROM votes JOIN congress_members ON congress_members.id = votes.politician_id
      GROUP BY votes.politician_id
      ORDER BY totalcount DESC
      LIMIT 5)AS totalCongress
      JOIN votes ON votes.politician_id = totalCongress.id
      JOIN voters ON voters.id = votes.voter_id
      ORDER BY totalcount DESC`
    return new Promise((resolve,reject)=>{
      db.all(query,(err,congressRows)=>{
        if(!err){
          resolve(congressRows)
        }else{
          reject(err)
        }
      })
    })
  }
}
module.exports = Congress
