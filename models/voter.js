const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Voter {
  static search(dataInput) {
    console.log(dataInput);
    return new Promise((resolve, reject) => {
      if(dataInput.searchName) {
        let data = dataInput.searchName
        db.all(`SELECT * FROM voters WHERE first_name LIKE '%${data}%' OR last_name LIKE '%${data}%'`, (err, rows) => {
          if(err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      } else if(dataInput.searchGender) {
        let data = dataInput.searchGender
        db.all(`SELECT * FROM voters WHERE gender = '${data}'`, (err, rows) => {
          if(err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      } else if(dataInput.maxAge || dataInput.minAge) {
        let minAge = dataInput.minAge
        let maxAge = dataInput.maxAge
        if(maxAge) {
          db.all(`SELECT * FROM voters WHERE age BETWEEN ${minAge} AND ${maxAge} ORDER BY age`, (err, rows) => {
            if(err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
        } else if(minAge){
          db.all(`SELECT * FROM voters WHERE age = ${minAge} ORDER BY age;`, (err, rows) => {
            if(err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
        }
      }
    })
  }
}

module.exports = Voter;
