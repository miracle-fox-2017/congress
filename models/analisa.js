var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');


class Analisa {


  static findAll (){
    let query ='SELECT * FROM false_votes'
    return new Promise ((resolve, reject) =>{
        db.all(`${query}`, (err, rows) =>{
          resolve(rows)
        })
    })
  }
}

module.exports =  Analisa;
