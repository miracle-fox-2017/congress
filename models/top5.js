const sqlite3= require ('sqlite3');
const db=new sqlite3.Database('./db/congress_poll_results.db')

class top5 {

  static findAll(){


    let query = new Promise(function(resolve, reject){
      db.all(`SELECT getTotal.Total, getTotal.name, voters.first_name FROM
        (SELECT COUNT(votes.politician_id) AS Total, congress_members.name,congress_members.id
        FROM votes
        INNER JOIN congress_members ON congress_members.id = votes.politician_id
        GROUP BY votes.politician_id
        ORDER BY Total DESC
        LIMIT 5)  AS getTotal
        INNER JOIN votes ON votes.politician_id = getTotal.id
        INNER JOIN voters ON voters.id = votes.voter_id
        ORDER BY getTotal.Total DESC, getTotal.name DESC`,(err, datavote)=>{
        if (!err) {
          resolve(datavote)
        }
        else {
          reject(err)
        }
      })
    })

    return query


  }

  static finById(body){
    let query = new Promise((resolve,reject)=> {
      db.run(`INSERT INTO voter(A.voter_id, first_name)`)
    })

  }

  static(){
    let query = new Promise(function(resolve,reject){

    })
  }

}
module.exports = top5;
