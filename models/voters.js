const sqlite3= require ('sqlite3');
const db=new sqlite3.Database('./db/congress_poll_results.db')


class voters {
  static findAll(){
    let query = new Promise(function(resolve,reject){
      db.all(`SELECT FROM voters`,(err,datavoter)=>{
        if (!err) {
          resolve(datavoter)
        }else {
          reject(err)
        }
      })
    })
    return query
  }
}


module.exports = voters;
