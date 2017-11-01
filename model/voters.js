const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Voters {
	static findAll(){
		let findAllVoters  = `SELECT * FROM voters`;
		return new Promise((resolve,reject) => {
			db.all(findAllVoters, function(err,rowVoters){
				if(err){
					reject(err);
				}else{
					resolve(rowVoters);
				}
			})
		})
	}

	static searchVoter(word){

		let search = `SELECT * FROM voters WHERE first_name LIKE '%${word}%' `
		return new Promise((resolve,require) => {
			db.all(search, function(err,searchVoter){
				if(err){
					reject(err)
				}else{
					resolve(searchVoter);
				}
			})
		})
	}

	static searchGenderVoter(status){
		let search = `SELECT * FROM voters WHERE gender = "${status}"`
		return new Promise((resolve,require) => {
			db.all(search, function(err, searchGender){
				if(err){
					reject(err);
				}else{
					resolve(searchGender);
				}
			})
		})
	}

	static searchAgeVoter(minAge,maxAge){
		let search = `SELECT * FROM voters WHERE age BETWEEN ${minAge} AND ${maxAge}`
		return new Promise((resolve,reject)=> {
			db.all(search, function(err,searchAge){
				if(err){
					reject(err);
				}else{
					resolve(searchAge)
				}
			})
		})
	}

	static searchMinAge(minAge){
		let search = `SELECT * FROM voters WHERE age = ${minAge}`
		return new Promise((resolve,reject)=> {
			db.all(search, function(err,searchAge){
				if(err){
					reject(err);
				}else{
					resolve(searchAge)
				}
			})
		})
	}	

	static findKecurangan(){
		
	}
}

module.exports = Voters