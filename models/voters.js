const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/congress_poll_results.db')

class Voters {
  static gettable(name){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT *
              FROM voters WHERE first_name LIKE '%${name}%' ORDER BY first_name`,(err,rows)=>{
                if(err){reject(err)}
                else{resolve(rows)}
              })
    })
}
  static findByGender(fgender){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT * FROM voters WHERE gender = '${fgender}' ORDER BY id`,(err,rows)=>{
        if (err){reject(err)}
        else{resolve(rows)}
      })
    })
  }

  static findByAge(start,end){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT * FROM voters WHERE age BETWEEN ${start} AND ${end} ORDER BY age`,(err,rows)=>{
        if (err){reject(err)}
        else{resolve(rows)}
      })
    })
  }

  }








module.exports = Voters;
