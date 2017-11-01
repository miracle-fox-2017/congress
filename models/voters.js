var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db')

class Voter {

  static findByName(name, callback) {
    db.all(`SELECT * FROM voters WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%'`, (err, data) => {
      callback(err, data)
    })
  }

  static findByGender(body, callback) {
    db.all(`SELECT * FROM voters WHERE gender = "${body.gender}"`, (err, data) => {
      callback(err, data)
    })
  }

  static findByAge(body, callback) {
    if(body.atas == "") {
      db.all(`SELECT * FROM voters WHERE age BETWEEN '${body.bawah}' AND '${body.bawah}'`, (err, data) => {
        callback(err, data)
      })
    }
    else {
      db.all(`SELECT * FROM voters WHERE age BETWEEN '${body.bawah}' AND '${body.atas}'`, (err, data) => {
        callback(err, data)
      })
    }
  }


}

module.exports = Voter
