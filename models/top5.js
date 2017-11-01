var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');
// const Vote = require('./votes.js');
// const Congress = require('./congress_members');

let query = `select DB.TotalVote, DB.Politician, group_concat(VS.first_name) as Voters from votes as VT inner join (select
  COUNT(V.politician_id) as TotalVote,
  C.name as Politician,
  C.id as id
  FROM votes V
  INNER JOIN congress_members C ON C.id = V.politician_id
  GROUP BY V.politician_id
  ORDER BY TotalVote desc
  LIMIT 5)
  as DB
  on VT.politician_id = DB.id
  inner join voters VS on VS.id = VT.voter_id
  group by DB.Politician ORDER BY TotalVote desc`;

  let topQuery = `select
  COUNT(V.politician_id) as TotalVote,
  C.name as Politician,
  C.id as id
  FROM votes V
  INNER JOIN congress_members C ON C.id = V.politician_id
  GROUP BY V.politician_id
  ORDER BY TotalVote desc, Politician
  LIMIT 5;`;

  class Top5 {

    static findTop() {
      return new Promise((resolve, reject) => {
        db.all(topQuery, (err, rows) => {
          if (!err) {
            resolve(rows);
          } else { reject(err); }
        });
      });
    }

    static topWithVoters() {
      return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
          if (!err) {
            resolve(rows);
          } else { reject(err); }
        });
      });
    }
  }

  module.exports = Top5;
