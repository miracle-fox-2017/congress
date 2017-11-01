const sqlite3 = require('sqlite3').verbose()
const db      = new sqlite3.Database('./db/congress_poll_results.db')

class Voter{

	static getVoterByName(data){
		return new Promise((resolve, reject) => {
			db.all(`select * from voters where first_name like "%${data}" or last_name like "%${data}"`, (err, voters)=>{
				if(err){
					reject(err)
				}else{
					resolve(voters)
				}
			})
		});
	}

	static getVoterByGender(data){
		return new Promise((resolve, reject) => {
			db.all(`select * from voters where gender = "${data}"`, (err, result)=>{
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		});
	}

	static getVoterByAge(data){
		return new Promise((resolve, reject) => {
			db.all(`select * from voters where age = ${data}`, (err, result)=>{
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		});
	}

	static getVoterBySpesificAge(datamin, datamax){
		return new Promise((resolve, reject) => {
			db.all(`select * from voters where age >= ${datamin} AND age <= ${datamax}`, (err, result)=>{
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		});
	}
}

module.exports = Voter