const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db', err => {
  if (err) console.error(err);
});

class Voters {
  static findbyName(name) {
    return new Promise ((resolve, reject) => {
      db.all(`SELECT * FROM voters WHERE first_name LIKE '%${name}%' ORDER BY first_name`, (err, rows) => {
        if(err) reject(err);
        resolve(rows);
      });
    });
  }

  static findByGender(gender){
    return new Promise ((resolve, reject) => {
      db.all(`SELECT * FROM voters WHERE gender = '${gender}' ORDER BY id`, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

 static findByAge(start, end) {
    return new Promise ((resolve, reject) => {
      db.all(`SELECT * FROM voters WHERE age BETWEEN ${start} AND ${end} ORDER BY age`, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = Voters;
