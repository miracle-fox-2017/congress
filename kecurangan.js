const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')


	let kecurangan = `CREATE VIEW Kecurangan AS
						  SELECT voters.first_name || ' ' || voters.last_name AS Name, voters.gender,  voters.age,   Count(politician_id) AS NumberofVotes
  						  FROM
				  		  votes
				  		  INNER JOIN 
				  		  voters
				  		  on votes.voter_id = voters.id 
				  		  GROUP BY voter_id
				  		  HAVING  NumberofVotes != 1
				  		  ORDER BY Name asc, NumberofVotes desc`

	db.run(kecurangan)