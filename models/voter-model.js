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
}

module.exports = VoterModel;