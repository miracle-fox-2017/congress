const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db', err => {
  if (err) console.error(err);
});

class Analyze {
  static findDuplicateVote() {
    const query = `
      SELECT voters.first_name || ' ' || voters.last_name AS name, voters.gender, voters.age, COUNT(votes.voter_id) AS Number
      FROM votes
      INNER JOIN voters ON voters.id = votes.voter_id
      GROUP BY votes.voter_id
      HAVING COUNT(votes.voter_id) > 1
      ORDER BY name ASC
    `;

    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) reject(err);
        console.log(rows);
        resolve(rows);
      });
    })
  }
}

module.exports = Analyze;