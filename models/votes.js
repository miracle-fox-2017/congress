const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Votes {
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM votes`
      db.all(query, (err, data_votes)=>{
        if(!err){
          resolve(data_votes)
        } else {
          reject(err)
        }
      })
    });

  }
  static getById(id){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM votes WHERE id = ${id}`
      db.get(query, (err, data_votes)=>{
        if(!err){
          resolve(data_votes)
        } else {
          reject(err)
        }
      })
    });
  }

}
module.exports = Votes;
