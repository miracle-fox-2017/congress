var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');


class Top5 {


  static top (){
    let query = `SELECT  v.total_v, v.name, voters.first_name
                FROM
                  (SELECT COUNT (votes.politician_id) as total_v, congress_members.name, congress_members.id
                  FROM votes
                  INNER JOIN congress_members ON congress_members.id = votes.politician_id
                  GROUP BY congress_members.name, congress_members.id
                  ORDER BY COUNT(votes.politician_id) desc
                  limit 5)
                AS v
                INNER JOIN votes ON votes.politician_id = v.id
                INNER JOIN voters ON voters.id = votes.voter_id
                order by v.total_v desc, v.name asc`

    return new Promise ((resolve, reject) =>{
      db.all(query, (err, rows) =>{
          let arr = []
          arr.push(rows[0])
          for(let i =1; i < rows.length; i++){
            if(rows[i].name !== arr[arr.length-1].name){
              arr.push(rows[i])
            }
          }

          for(let i = 0; i < arr.length; i++){
            let arrNama = []
            rows.forEach(item =>{
              if(item.name == arr[i].name){
                arrNama.push(item.first_name)
              }
            })
            arr[i].first_name = arrNama
          }
          resolve(arr)
          })
    })
  }
}

module.exports =  Top5;
