const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Vote {
  static top5() {
    return new Promise((resolve, reject) => {
      // query with view (politician_voters)
      db.all(`SELECT COUNT(votes.politician_id) AS TotalVote, politician.name AS PoliticianName, politician_voters.VoterName
      FROM votes
      INNER JOIN congress_members AS politician ON politician.id = votes.politician_id
      INNER JOIN politician_voters ON politician_voters.politician_id = votes.politician_id
      GROUP BY politician.name
      ORDER BY TotalVote DESC
      LIMIT 5`, (err, rows) => {
        if(err) {
          reject(err)
        } else (
          resolve(rows)
        )
      })
    })
  }

  static analyzed() {
    return new Promise((resolve, reject) => {
      // query with subquery
      db.all(`SELECT voters.first_name || ' ' || voters.last_name AS Name, voters.gender, voters.age, VoterCount
      FROM voters
      INNER JOIN (SELECT COUNT(votes.voter_id) AS VoterCount, votes.voter_id
                  FROM votes
                  GROUP BY votes.voter_id
                  HAVING COUNT(votes.voter_id) > 1) AS Voting ON Voting.voter_id = voters.id
      ORDER BY Name, VoterCount DESC`, (err, rows) => {
        if(err) {
          reject(err)
        } else (
          resolve(rows)
        )
      })
    })
  }
}

module.exports = Vote;
