const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Voter {

  static search(input,cb) {
    if(input.form_select == 1){
      Voter.searchName(input.name).then(name => {
        if(name.length == 0){
          cb(null, 'name not found!!')
        }else{
          cb(name)
        }
      })
    }
    if(input.form_select == 2){
      if(!input.gender){
        cb(null,'Please fill all required field!!')
      }else{
        Voter.searchGender(input.gender).then(gender => {
          cb(gender)
        })
      }
    }
    if(input.form_select == 3){
      if(!input.max_age && !input.min_age){
        cb(null,'Please fill all required field!!')
      }else{
        Voter.searchAge(input).then(age => {
          cb(age)
        }).catch(err => {
          cb(null, err)
        })
      }
    }
    if(input.form_select == 0){
      cb(null,'Please fill all required field!!')
    }
  }

  static searchName(input) {
    return new Promise(function(resolve, reject) {
      db.all(`SELECT V.*, CASE WHEN V.married = 0 THEN 'single' WHEN V.married = 1 THEN 'married' END AS married_stat FROM voters AS V WHERE first_name LIKE '%${input}%' OR last_name LIKE '%${input}%'`, (err, rows) => {
        if(!err){
          resolve(rows)
        }else{
          reject(err)
        }
      })
    });
  }

  static searchGender(input) {
    return new Promise(function(resolve, reject) {
      db.all(`SELECT V.*, CASE WHEN V.married = 0 THEN 'single' WHEN V.married = 1 THEN 'married' END AS married_stat FROM voters AS V WHERE gender='${input}'`, (err, rows) => {
        if(!err){
          resolve(rows)
        }else{
          reject(err)
        }
      })
    });
  }

  static searchAge(input) {
    return new Promise(function(resolve, reject) {
      if(input.min_age && input.max_age){
        db.all(`SELECT V.*, CASE WHEN V.married = 0 THEN 'single' WHEN V.married = 1 THEN 'married' END AS married_stat FROM voters AS V WHERE V.age >= ${input.min_age} AND V.age <= ${input.max_age}`, (err, rows) => {
          if(!err){
            resolve(rows)
          }else{
            reject(err)
          }
        })
      }else if(input.min_age){
        db.all(`SELECT V.*, CASE WHEN V.married = 0 THEN 'single' WHEN V.married = 1 THEN 'married' END AS married_stat FROM voters AS V WHERE V.age >= ${input.min_age} AND V.age <= ${input.min_age}`, (err, rows) => {
          if(!err){
            resolve(rows)
          }else{
            reject(err)
          }
        })
      }else{
        reject('Range start age must be filled!!')
      }
    });
  }
}

module.exports = Voter;
