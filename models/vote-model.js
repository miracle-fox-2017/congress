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

	static createTop5View() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbName);
			let sql = `CREATE VIEW IF NOT EXISTS election_winner AS
						select congress_members.id, congress_members.name, 
						(
							select count(politician_id) AS totalVote
							from votes where politician_id = congress_members.id
						) as jumlah_vote_individu
					from congress_members order by jumlah_vote_individu DESC LIMIT 5;`;

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
			let sqlWinner = `Select election_winner.id, election_winner.name, 
								election_winner.jumlah_vote_individu, votes.voter_id, voters.first_name
								From election_winner
								INNER JOIN votes ON election_winner.id = votes.politician_id
								INNER JOIN voters ON votes.voter_id = voters.id 
							ORDER BY election_winner.jumlah_vote_individu DESC, election_winner.name ASC; `;

			db.all(sqlWinner, (err, rows) => {
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