var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');

db.serialize(function() {
  db.all(`SELECT (voters.first_name ||" " || voters.last_name) AS full_name, votes.voter_id, COUNT(votes.voter_id) AS number FROM votes
  INNER JOIN voters ON voters.id = votes.voter_id
  GROUP BY voters.id`, (err, data) => {
    console.log(data);
  })
})

db.close();
