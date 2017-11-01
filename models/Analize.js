const db = require('../db/koneksi.js')


class Analize{
	static findCheating(){
		let create = `CREATE VIEW IF NOT EXISTS CHEATING AS 
						SELECT  vr.first_name || " " || vr.last_name as fullname, vr.gender, vr.age , COUNT(v.voter_id) AS count
						FROM 
							votes as v INNER JOIN voters as vr ON v.voter_id = vr.id  
						 GROUP BY v.voter_id HAVING COUNT(*) > 1`

		let search = 'SELECT * FROM CHEATING ORDER BY fullname ASC, count DESC'

		return new Promise((resolve, reject) => {
			db.run(create, (err)=> {
				if(err){
					reject(err)
				}
				else{

					db.all(search, function(err, rows) {
						if(err){
							reject(err)
						}
						else{
							
							resolve(rows)
						}
					})
				}
			})
		})
	}
}

module.exports = Analize