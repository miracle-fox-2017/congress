const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Top5{
	static findAll(){
		let query = `SELECT F.Total , F.Politician,  voters.first_name
					FROM
					(SELECT COUNT(votes.voter_id) as Total, congress_members.name as Politician,  votes.politician_id as id 
					FROM
					congress_members
					INNER JOIN
					votes
					on congress_members.id = votes.politician_id
					GROUP BY votes.politician_id
					ORDER BY Total desc
					LIMIT 5) AS F
					INNER JOIN
					votes
					on F.id = votes.politician_id
					INNER JOIN		
					voters
					on votes.voter_id = voters.id
					ORDER BY F.total desc`
		return new Promise((resolve,reject) =>{
			db.all(query, function(err ,top5){
				if(err){
					reject(err);
				}else{
					resolve(top5);
				}
			})
		})
	}
}

module.exports = Top5