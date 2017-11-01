const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Vote {

  static getTop5() {
    return new Promise(function(resolve, reject) {
      db.all(`SELECT P.total_votes, P.politician_name, GROUP_CONCAT(Vt.first_name) AS voters FROM votes as V
              INNER JOIN
              (SELECT COUNT(V.politician_id) AS total_votes, C.name AS politician_name, C.id FROM votes AS V
              INNER JOIN congress_members AS C ON C.id = V.politician_id
              GROUP BY C.name
              ORDER BY total_votes DESC
              LIMIT 5) AS P
              ON V.politician_id = P.id
              INNER JOIN voters AS Vt ON Vt.id = V.voter_id
              GROUP BY P.id
              ORDER BY P.total_votes DESC`,
            (err, rows) => {
              if(!err){
                resolve(rows);
              }else{
                reject(err);
              }
            })

    });
  }

  static duplicateV() {
    return new Promise(function(resolve, reject) {
      db.all(`SELECT V.first_name || ' ' || V.last_name AS fullname, V.gender, V.age, D.count_votes
              FROM voters AS V
              INNER JOIN d_votes AS D ON V.id = D.voter_id
              ORDER BY V.first_name || ' ' || V.last_name`,
            (err,rows) => {
              if(!err){
                resolve(rows);
              }else{
                reject(err);
              }
            })
    });
  }
}

module.exports = Vote;
