const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Votes
{
  static getByGender(gender)
  {
    db.all(`SELECT * FROM voters WHERE gender = "${gender}"`, (err, rows) =>
      {
        return new Promise((resolve, reject) =>
          {
            if (err)
            {
              reject(err);
            }
            else
            {
              resolve(rows);
            }
          }
        )
      }
    );
  }
  
  static getByName(name)
  {
    db.all(`SELECT * FROM voters WHERE first_name LIKE "%name%"`, (err, rows) =>
      {
        return new new Promise((resolve, reject) =>
          {
            if (err)
            {
              reject(err);
            }
            else
            {
              resolve(rows)
            }
          }
        );
      }
    );
  }
  
  static getAgeRange(minAge, maxAge = null)
  {
    if (maxAge === null)
    {
      db.all(`SELECT * FROM voters WHERE age = ${minAge}`, (err, rows) =>
        {
          return new new Promise(function(resolve, reject)
            {
              if (err)
              {
                reject(err);
              }
              else
              {
                resolve(rows);
              }
            }
          );
        }
      );
    }
    else
    {
      db.all(`SELECT * FROM voters WHERE age BETWEEN ${minAge} AND ${maxAge}`, (err, rows) =>
        {
          return new Promise(function(resolve, reject)
            {
              if (err)
              {
                reject(err);
              }
              else
              {
                resolve(rows);
              }
            }
          );
        }
      );
    }
  }
  
  static getTop5()
  {
    let query = `SELECT result1.numVotes, result1."candidate", voters.first_name AS name FROM
            (SELECT congress_members.name as "candidate", votes.politician_id, COUNT(votes.politician_id) AS numVotes FROM votes
            INNER JOIN voters on votes.voter_id = voters.id
            INNER JOIN congress_members on votes.politician_id = congress_members.id
            GROUP BY "candidate"
            ORDER BY numVotes desc
            LIMIT 5) AS result1
            INNER JOIN votes ON votes.politician_id = result1.politician_id
            INNER JOIN voters ON votes.voter_id = voters.id
            ORDER BY numVotes desc`
    return new Promise((resolve, reject) =>
      {
        db.all(query, (err, rows) =>
          {
            if (err)
            {
              reject(err);
            }
            else
            {
              resolve(rows);
            }
          }
        )
      }
    );
              
  }
  
}

module.exports = Votes;