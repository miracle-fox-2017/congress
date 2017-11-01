var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');
 
class Result {
  constructor(){}
  
  static topCongress(){
    return new Promise ((resolve, reject)=>{
      let q = `
      SELECT V.total as total, V.name as politician, voters.first_name as fullname
      FROM
      (SELECT R.total, R.name, R.id, votes.voter_id as vid
      FROM
      (SELECT COUNT(votes.politician_id) as total,
      			congress_members.name as name,
      			votes.politician_id as id
      FROM votes
      INNER JOIN congress_members ON congress_members.id = votes.politician_id
      GROUP BY votes.politician_id
      ORDER BY TOTAL desc
      LIMIT 5) AS R
      JOIN votes ON R.id = votes.politician_id) AS V
      INNER JOIN voters ON voters.id = V.vid
      ORDER BY V.total desc, V.name asc 
      `
      db.all(q, (err, rows)=>{
        if(err){
          reject(err)
        } else {
          // console.log(rows);
          //get only politician
          rows.push('end')
          let result = [];
          let resultVoters = [];
          let count = 0;
          result.push([]);
          // for(let i = 1; i<=35; i++){
          for(let i = 0; i<rows.length; i++){
            if(i==0){
              result[count].push(rows[i].fullname)
            }else{
                // console.log(rows[i-1].politician);
                if(rows[i].politician == rows[i-1].politician){
                  result[count].push(rows[i].fullname)
                } else {
                  result.push([]);
                  count += 1;
                  result[count].push(rows[i].fullname)
                  
                  //bikin obj baru
                  let temp = result[count-1];
                  resultVoters.push(new Voters(rows[i-1].total, rows[i-1].politician, temp))
                  
                }
              }
            }
          // console.log(resultVoters[4]);
          
          resolve(resultVoters)
        }
      })
    })
  }
  
  static analyzer(){
    return new Promise((resolve, reject)=>{
      let createViewVoters = `CREATE VIEW IF NOT EXISTS VoterCount AS
                              SELECT votes.voter_id, COUNT(*) as count
                              FROM votes
                              GROUP BY votes.voter_id`
      db.run(createViewVoters, [], ()=>{
        let queryCheated = `SELECT VoterCount.counts, VoterCount.voter_id,
                                   voters.first_name  || ' ' || voters.last_name AS fullname,
                                   voters.gender, voters.age
                            FROM VoterCount
                            JOIN voters ON VoterCount.voter_id = voters.id
                            WHERE VoterCount.counts > 1
                            ORDER BY fullname ASC, VoterCount.counts ASC`
        db.all(queryCheated, (err,rows)=>{
          if(err){
            reject(err)
          }else{
            resolve(rows)
          }
        })
      })

      
    })
  }
  
}

class Voters {
  constructor(total, politician, name){
    // console.log(name);
    this.total = total;
    this.politician = politician;
    this.name = name;
  }
  
}

module.exports = Result;