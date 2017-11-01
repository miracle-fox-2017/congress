const db = require('../db/koneksi')

class Top5{
	constructor(data){
		this.politician_id = data['politician_id']
		this.name = data['name']
		this.vote_count = data['vote_count']
		this.voter_name = data['voter_name']
	}

	static findTop5(){
		let select = 

			`SELECT `+ 
					`v.politician_id, `+ 
					`r. name, r.vote_count, `+ 
					`GROUP_CONCAT(vr.first_name || " " || vr.last_name) as voter_name `+
			`FROM votes as v `+ 
				`INNER JOIN voters as vr ON v.voter_id = vr.id `+
				`INNER JOIN ( `+
					`SELECT `+ 
						`v.politician_id as id, `+
						`cm.name,`+
						`COUNT(v.politician_id) as vote_count `+	
					`FROM votes AS v `+ 
					`INNER JOIN congress_members AS cm ON v.politician_id = cm.id `+
					 `GROUP BY cm.id `+ 
					 `ORDER BY COUNT(v.politician_id) `+
					 `DESC `+ 
					 `LIMIT 5 `+
				`)as r ON v.politician_id = r.id `+
			`GROUP BY r.id `+
			`ORDER BY r.id;`


			return new Promise((resolve, reject) => {
				db.all(select, (err, rows) => {
					if(err){
						reject(err)
					}
					else{
						let top5 = rows.map(item => {
							return new Top5(item)
						})
						resolve(top5)
					}
				})
			})
	}
}

module.exports = Top5