const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Voter {
  static searchName(data) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM voters WHERE first_name LIKE '%${data}%' OR last_name LIKE '%${data}%'`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static searchGender(data) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM voters WHERE gender = '${data}'`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static searchAge(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      if(data.maxAge) {
        db.all(`SELECT * FROM voters WHERE age BETWEEN ${data.minAge} AND ${data.maxAge} ORDER BY age`, (err, rows) => {
          if(err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      } else if(data.minAge){
        db.all(`SELECT * FROM voters WHERE age = ${data.minAge} ORDER BY age;`, (err, rows) => {
          if(err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      }
    })
  }
}

module.exports = Voter;
