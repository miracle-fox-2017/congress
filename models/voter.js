const db = require('../db/koneksi.js')

class Voter{

	static search(search){
		console.log(search)
		let obj = {
			isNull : true
		}

		return new Promise((resolve, reject)=> {
			if(search.searchName[0] == 'default'){
				reject('Please fill the blank')
			}
			else if(search.searchName[0] == 'gender' && search.searchGender == 'default'){
				reject('Please fill the blank')
			}
			else if(search.searchName[0] == 'age' && search.searchAge[0] == ''){
				reject('Please fill the blank')
			}

			else if(search.searchGender != 'default'){
				this.findGender(search.searchGender).then(gender=> {
					if(gender.length != 0){
						obj.isNull = false
						obj.data = gender
						resolve(obj)
					}
					else{
						reject('data not found')
					}
				})
			}
			else if(search.searchAge[0].length != 0){
				this.findAge(search.searchAge).then(age =>{
					if(age.length != 0){
						obj.isNull = false
						obj.data = age
						resolve(obj)
					}
					else{
						reject('data not found')
					}
				})
			}
			
			else if(search.searchName[1] == '' || search.searchName[0].length >= 0 ){
				this.findName(search.searchName[1]).then(name => {
					if(name.length != 0){
						obj.isNull = false
						obj.data = name
						resolve(obj)
					}
					else{
						reject('data not found')
					}
				})
			}
			
		})
		
	}

	static findName(find){
		let search = `SELECT id, first_name, last_name, gender, age, married, children_count FROM voters WHERE first_name like '%${find}%' OR last_name like '%${find}%'`
		
		return new Promise((resolve, reject) => {
			db.all(search, (err, rows) =>{
				if(err){
					reject(err)
				}
				else{
					resolve(rows)
				}
			})
		})
	}

	static findGender(find){
		let search = `SELECT id, first_name, last_name, gender, age, married, children_count FROM voters WHERE gender = '${find}';`
		
		return new Promise((resolve, reject) => {
			db.all(search, (err, rows)=> {
				if(err){
					reject(err)
				}
				else{
					resolve(rows)
				}
			})
		})
	}

	static findAge(find){
		let search = ''

		if(find[1].length != 0){
			search = `SELECT id, first_name, last_name, gender, age, married, children_count FROM voters WHERE age BETWEEN ${find[0]} AND ${find[1]} order by age ASC;`
		}
		else{
			search = `SELECT id, first_name, last_name, gender, age, married, children_count FROM voters WHERE age >= ${find[0]} order by age ASC;`	
		}
		
		return new Promise((resolve, reject) => {
			db.all(search, (err, rows) => {
				if(err){
					reject(err)
				}
				else{
					resolve(rows)
				}
			})
		})
	}


}


module.exports = Voter