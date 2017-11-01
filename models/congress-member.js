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
}

module.exports = CongressMember;