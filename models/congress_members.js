const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class CongressMembers {
    static findAll(){
      return new Promise(function(resolve, reject) {
        let query = `SELECT * FROM congress_members`
        db.all(query, (err, data_congres)=>{
          if(!err){
            resolve(data_congres)
          } else {
            reject(err)
          }
        })
      });

    }

}
module.exports = CongressMembers;
