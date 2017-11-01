const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Congress {
	static findAll(){
		let findAllCongress  = `SELECT * FROM congress_members`;
		return new Promise((resolve,reject) => {
			db.all(findAllCongress, function(err,rowCongress){
				if(err){
					reject(err);
				}else{
					resolve(rowCongress);
				}
			})
		})
	}
}

module.exports = Congress