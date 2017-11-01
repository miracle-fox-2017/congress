const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./db/congress_poll_results.db");

class Voters {
  static searchName(dataInput){
    return new Promise((resolve, reject)=>{
      let search = dataInput.dataName;
      let query = `select * from voters
                  where first_name like '%ja%'
                  order by first_name asc`
      db.all(query, function(err, rows) {
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }
}
