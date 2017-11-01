const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/congress_poll_results.db')

class Vote {

    static getDataKecurangan() {
        return new Promise((resolve, reject) => {
            let query = `select * from kecurangan where number >= 2 order by name asc, number desc`
            db.all(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })

        })
    }

    static getTopFive() {
        return new Promise((resolve, reject) => {
            let query = `SELECT t.name, t.total, GROUP_CONCAT((p.first_name || " " || p.last_name)) as name_voters
            FROM
            (SELECT c.name, v.politician_id, count(v.politician_id) AS total
            FROM votes v
            inner join congress_members c on c.id = v.politician_id
            GROUP BY v.politician_id 
            ORDER BY count(v.politician_id) DESC
            limit 5) AS t 
            INNER JOIN votes v ON v.politician_id = t.politician_id
            inner JOIN voters p ON v.voter_id = p.id
			GROUP BY v.politician_id
            order by v.politician_id`

            db.all(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    let hasil = []
                    rows.forEach(function (row) {

                        hasil.push({
                            name: row.name,
                            total: row.total,
                            name_voters: row.name_voters.split(",")
                        })
                    });
                    resolve(hasil)
                }
            })
        })
    }


}

module.exports = Vote