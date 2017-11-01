const tableName = '';
const dbName = './db/congress_poll_results.db';
const sqlite3 = require('sqlite3').verbose();

class CongressMember {
	constructor() {}

	static findAll() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `SELECT * FROM ${tableName}`;

			db.run(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})
		});
	}

	static splitWinnerVoter(allTop5) {
		let politicianId = [];
		allTop5.forEach( function(politician, index) {
			politicianId.push(politician.id);
		});

		let uniquePoliticianId = Array.from(new Set(politicianId));
		let arrWinner = [];

		for (var i = 0; i < uniquePoliticianId.length; i++) {
			let obj = {
				id: uniquePoliticianId[i],
				name: '',
				voters: []
			};

			for (var j = 0; j < allTop5.length; j++) {
				if (uniquePoliticianId[i] == allTop5[j].id) {
					obj.name = allTop5[j].name;
					obj.jumlah_vote_individu = allTop5[j].jumlah_vote_individu;
					obj.voters.push(allTop5[j].first_name);
				}
			}

			arrWinner.push(obj);
		}
		
		return arrWinner;
	}
}

module.exports = CongressMember;