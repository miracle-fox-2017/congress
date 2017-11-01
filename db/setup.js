const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('congress_poll_results.db')

function createKecurangan() {
    let query = `create view kecurangan as
    select (v.first_name || " " || v.last_name) as name, v.gender, v.age, count(c.voter_id) as number from votes c inner join voters v on c.voter_id = v.id group by v.id`

    db.run(query, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Successfully created")
        }
    })
}

createKecurangan()