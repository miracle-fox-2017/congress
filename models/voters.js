const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/congress_poll_results.db')

class Voter {
    static findDatabyName(name) {
        return new Promise((resolve, reject) => {
            let query = `select * from voters where first_name like "%${name}%" or last_name like  "%${name}%" `
            db.all(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static findDatabyGender(gender) {
        return new Promise((resolve, reject) => {
            let query = `select * from voters where gender = "${gender}" `
            db.all(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    static findDatabyAge(minAge, maxAge) {
        return new Promise((resolve, reject) => {
            let query = `select * from voters where age between ${minAge} and ${maxAge}`
            db.all(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }
}

module.exports = Voter