const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/congress_poll_results.db');

class Analityc{

  static getAnalityc(){
    return new Promise(function(resolve,reject){
      db.all(`select * from cheating_analityc`, function(err,data_analityc){
        if(!err){
          resolve(data_analityc)
        }else{
          reject(err)
        }
      })
    })
  }
}

module.exports = Analityc
