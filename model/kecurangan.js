const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Kecurangan {
	static findAll(){
		let findAllKecurangan  = `SELECT * FROM Kecurangan`;
		return new Promise((resolve,reject) => {
			db.all(findAllKecurangan, function(err,rowKecurangan){
				if(err){
					reject(err);
				}else{
					resolve(rowKecurangan);
				}
			})
		})
	}
}

module.exports = Kecurangan


