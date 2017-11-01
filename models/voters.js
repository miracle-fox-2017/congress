const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Voter{

  static findbyName(requestbody,callback){
    db.all(`SELECT *
      FROM voters WHERE voters.first_name
      LIKE "%${requestbody.first_name}%"`,function(err,rowVoters){
        if(err){
          callback(err,null);
        }else{
          callback(null,rowVoters)
        }
      })
  }
  // static findbyAge(){
  //
  // }
  // static findbyGender(){
  //
  // }




}

module.exports = Voter
