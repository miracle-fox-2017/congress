const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Results{
    static findTop(){
        let query = `SELECT getTotal.Total, getTotal.name, voters.first_name FROM 
        (SELECT COUNT(votes.politician_id) AS Total, congress_members.name,congress_members.id 
        FROM votes 
        INNER JOIN congress_members ON congress_members.id = votes.politician_id
        GROUP BY votes.politician_id
        ORDER BY Total DESC
        LIMIT 5)  AS getTotal
        INNER JOIN votes ON votes.politician_id = getTotal.id
        INNER JOIN voters ON voters.id = votes.voter_id
        ORDER BY getTotal.Total DESC, getTotal.name DESC`;
        return new Promise((resolve, reject)=>{
        db.all(query,(err,dataTop)=>{
                if(!err){
                    resolve(dataTop);
                }else{
                    reject(err);
                }
            });
        });
    }

    static findAnalisa() {
        let query = `SELECT voters.first_name ||' '|| voters.last_name AS name,voters.gender,voters.age,COUNT(votes.voter_id) AS Number  FROM votes 
                    INNER JOIN voters ON voters.id = votes.voter_id
                    GROUP BY votes.voter_id
                    HAVING COUNT(votes.voter_id) > 1
                    ORDER BY name ASC`;
        return new Promise((resolve, reject) => {
            db.all(query, (err, dataTop) => {
                if (!err) {
                    resolve(dataTop);
                } else {
                    reject(err);
                }
            });
        });
    }

}

module.exports = Results; 