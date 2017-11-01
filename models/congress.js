const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')


class Congress {
    static top5() {
        let subQuery = `select totalCongress.totalCount, totalcongress.name, totalCongress.id, voters.first_name from
        (select congress_members.name, congress_members.id, count(politician_id) as totalCount 
        from votes 
        JOIN congress_members ON votes.politician_id = congress_members.id
        group by votes.politician_id
        order by totalCount desc
        limit 5) as totalCongress
        Join votes ON votes.politician_id = totalCongress.id
        join voters ON voters.id = votes.voter_id
        order by totalCount DESC`
        
        return new Promise ((resolve, reject) => {
            db.all(subQuery, (err, data)=> {
                if(!err) {
                    resolve(data)
                } else {
                    reject (err);
                }
            })
        })
            
    }

    static analisaKecurangan() {
        let query = `SELECT voters.first_name ||' '|| voters.last_name AS name,voters.gender,voters.age,COUNT(votes.voter_id) AS Number  FROM votes 
                    INNER JOIN voters ON voters.id = votes.voter_id
                    GROUP BY votes.voter_id
                    HAVING COUNT(votes.voter_id) > 1
                    ORDER BY name ASC`;
        return new Promise((resolve, reject) => {
            db.all(query, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }

}


module.exports = Congress