let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/congress_poll_results.db');

class Result{
  static uniqeTop(){

    let query = `SELECT total.total_vote, total.name, voters.first_name FROM
                  (SELECT congress_members.name, congress_members.id,
                  COUNT(votes.politician_id) as total_vote
                  FROM votes
                  JOIN congress_members ON congress_members.id = votes.politician_id
                  WHERE votes.politician_id
                  GROUP BY votes.politician_id
                  order by total_vote desc
                  limit 5) AS total
                  JOIN votes ON total.id = votes.politician_id
                  JOIN voters ON voters.id = votes.voter_id
                  order by total.total_vote desc,total.name desc`
    return new Promise((resolve, reject)=>{
        db.all(query, (err,rows)=>{
          if(!err){
            resolve(rows)
          //   // console.log('=====', rows[0].first_name);
          //   // console.log(rows.length);
          //   let arr = [];
          //   let newArr = []
          //
          //   // rows.forEach(item => {
          //   //   if (item.total_vote === item.total_vote) {
          //   //     arr.push(item.first_name)
          //   //   } else {
          //   //     newArr.push(item.first_name)
          //   //   }
          //   // })
          //   //
          //   // console.log(arr, newArr);
          //   for(let i = 0; i < rows.length; i++){
          //     if(arr.indexOf(rows.name)== -1){
          //       arr.push(rows.name)
          //     }
          //
          //   }
          //   console.log(arr);
          }
          else{
            reject(err);
          }
        })
    })
  }


}

module.exports = Result;





















//
