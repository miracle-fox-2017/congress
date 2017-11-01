var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');
let falseVotes = `CREATE VIEW false_votes AS select  (voters.first_name || " " || voters.last_name) AS FullName, voters.gender, voters.age, count(voter_id) AS number_of_votes FROM voters inner join votes as vo on vo.voter_id = voters.id GROUP BY voter_id HAVING COUNT(voter_id) >1`

class Vote {

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM votes', (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static showFalse() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM false_votes`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static showQtyFalse() {
    return new Promise((resolve, reject) => {
      db.all(`select count(*) from false_votes`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static falseVotes() {
    return new Promise((resolve, reject) => {
      db.all(falseVotes, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }
}

module.exports = Vote;

// CREATE TABLE congress_members (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name VARCHAR(64) NOT NULL,
//   party VARCHAR(64) NOT NULL,
//   location VARCHAR(64) NOT NULL,
//   grade_1996 REAL,
//   grade_current REAL,
//   years_in_congress INTEGER,
//   dw1_score REAL
// , created_at DATETIME, updated_at DATETIME);
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
