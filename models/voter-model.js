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
		});
	}

	static findByName(name) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `SELECT * FROM voters WHERE first_name LIKE '%${name}%';`;

			db.run(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})
		});
	}
}

module.exports = VoterModel;