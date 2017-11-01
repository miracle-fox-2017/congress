const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Voters {
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM voters`
      db.all(query, (err, data_voters)=>{
        if(!err){
          resolve(data_voters)
        } else {
          reject(err)
        }
      })
    });

  }
  static getById(id){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM voters WHERE id = ${id}`
      db.get(query, (err, data_voters)=>{
        if(!err){
          resolve(data_voters)
        } else {
          reject(err)
        }
      })
    });
  }

}
module.exports = Voters;
