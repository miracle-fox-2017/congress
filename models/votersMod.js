let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/congress_poll_results.db');

class Voter {
  constructor() {

  }

  static findAll(){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM voters`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

}

module.exports = Voter
