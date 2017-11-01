const tableName = 'voters';
const dbName = './db/congress_poll_results.db';
const sqlite3 = require('sqlite3').verbose();

class VoterModel {
	constructor() {

	}

	static findAll() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `SELECT * FROM ${tableName}`;

			db.all(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})	

			db.close();
		});
	}

	static findByName(name) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `SELECT * FROM ${tableName} WHERE first_name LIKE '%${name}%' ORDER BY first_name ASC;`;

			db.all(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})

			db.close();
		});
	}

	
	static findByGender(gender) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `SELECT * FROM ${tableName} WHERE gender = '${gender}' ORDER BY first_name ASC`;
			console.log(sql);
			db.all(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})

			db.close();
		});
	}

	static findByAgeRange(minAge, maxAge) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName)
			let sql = `SELECT * FROM ${tableName} WHERE age >= ${minAge}  AND age <= ${maxAge} ORDER BY age ASC;`;

			if (maxAge == '') {
				sql = `SELECT * FROM ${tableName} WHERE age >= ${minAge}  AND age <= ${minAge} ORDER BY age ASC;`;
			}
			
			if (minAge == '') {
				reject('Min age harus diisi!');
			}

			db.all(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})

			db.close();
		});
	}

	static findAllElectionFraud() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql =  `CREATE VIEW IF NOT EXISTS fraud_people AS
							select voters.id, voters.gender, voters.age, voters.first_name || ' ' ||voters.last_name as full_name,
								(
									select count(voter_id) 
									from votes where voter_id = voters.id
								) as jumlahVote 
							from voters where jumlahVote > 1 order by jumlahVote ASC;`;

			db.run(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					db.all('SELECT * from fraud_people', (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					})
				}
			});
		});
	}

	static findFraud() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `Create View IF NOT EXISTS fraud_list AS
							select voters.id, voters.gender, voters.age, 
								voters.first_name || ' ' ||voters.last_name as full_name, votes.voter_id, votes.politician_id, 
								count(voter_id) as jumlahVote from votes 
									inner join voters on votes.voter_id = voters.id
									group by votes.voter_id
									having jumlahVote > 1
								order by jumlahVote DESC `;
			db.run(sql, (err, rows) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {

					db.all('select * from fraud_list', (err, rows) => {
						if (err) {
							reject({err: err, msg: 'EROR fraud'});
						} else {
							resolve(rows);
						}
					})
				}
			});
		});
	}
}

module.exports = VoterModel;