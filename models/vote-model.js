const tableName = 'votes';
const dbName = './db/congress_poll_results.db';
const sqlite3 = require('sqlite3').verbose()

class VoteModel {
	constructor(){}

	static findAll() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName)
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

	static findTop5() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `SELECT * FROM ${tableName} WHERE id = 2`;
			db.get(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			})
		});
	}
}

module.exports = VoteModel;