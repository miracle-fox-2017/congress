var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');

let queryFemale = `select id, first_name, last_name, gender, age, married, children_count from voters where gender = 'female';`;
let queryMale = `select id, first_name, last_name, gender, age, married, children_count from voters where gender = 'male';`;

class Voter {

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM voters', (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static findFemale() {
    return new Promise((resolve, reject) => {
      db.all(queryFemale, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static findMale() {
    return new Promise((resolve, reject) => {
      db.all(queryMale, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static findByName(name) {
    let searchName = `SELECT * FROM voters WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%' ORDER BY first_name`;
    return new Promise((resolve, reject) => {
      db.all(searchName, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static findByAge(min, max) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM voters WHERE age >= ${min} AND age <= ${max} ORDER BY age`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

}

module.exports = Voter;

// CREATE TABLE voters (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     first_name VARCHAR(64) NOT NULL,
//     last_name  VARCHAR(64) NOT NULL,
//     gender VARCHAR(64) NOT NULL,
//     party VARCHAR(64) NOT NULL,
//     party_duration INTEGER,
//     age INTEGER,
//     married INTEGER,
//     children_count INTEGER,
//     homeowner INTEGER,
//     employed INTEGER,
//     created_at DATETIME NOT NULL,
//     updated_at DATETIME NOT NULL
//   );
// CREATE TABLE votes (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     voter_id INTEGER,
//     politician_id INTEGER,
//     created_at DATETIME NOT NULL,
//     updated_at DATETIME NOT NULL,
//     FOREIGN KEY(voter_id) REFERENCES voters(id),
//     FOREIGN KEY(politician_id) REFERENCES congress_members(id)
//   );
