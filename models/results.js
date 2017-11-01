const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./db/congress_poll_results.db");

class Result {
  static findAll(){
    return new Promise((resolve, reject)=>{
      let query = `select poll.*, voters.first_name from
                  (select count(cm.id) as voting, cm.name, cm.id from votes as v
                  inner join congress_members as cm on cm.id = v.politician_id
                  group by cm.id
                  order by voting desc
                  limit 5) as poll
                  inner join votes on votes.politician_id = poll.id
                  inner join voters on votes.voter_id = voters.id
                  order by voting desc`

      db.all(query, function(err ,rows) {
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  static showCheating(){
    return new Promise((resolve, reject)=>{
      let query = `SELECT * FROM cheating`
      db.all(query, function(err, rows) {
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }
}

module.exports = Result;
