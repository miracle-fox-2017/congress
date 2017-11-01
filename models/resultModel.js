const sqlite3 = require('sqlite3').verbose()
const db      = new sqlite3.Database('./db/congress_poll_results.db')

class Result{

	static getTop5(){
		return new Promise((resolve, reject) => {
			db.all(`select v.name, v.nilai, (vr.first_name||' '||vr.last_name) as voterName from 
					(select c.name, vs.politician_id, count(vs.politician_id) as nilai from votes 
					vs inner join congress_members c on c.id = vs.politician_id group by vs.politician_id 
					order by count(vs.politician_id)desc limit 5) as v join votes vs on vs.politician_id 
					= v.politician_id join voters vr on vs.voter_id = vr.id order by v.nilai desc, v.name 
					desc;`, (err, result)=>{
				if(err){
					reject(err)
				}else{
					let politukus = []
					let a         = 0
					let objPoli = []

					result.forEach((poli, index)=>{
						objPoli = Object.keys(poli)
						// console.log(objPoli);
						if(index === 0){
							politukus[a]={}
							politukus[a].name  = poli.name
							politukus[a].nilai = poli.nilai
							politukus[a].voter = []
							politukus[a].voter.push(poli[objPoli[2]])
						}else
						if(poli.name != result[index-1].name){
							a++
							politukus[a]={}
							politukus[a].name  = poli.name
							politukus[a].nilai = poli.nilai
							politukus[a].voter = []
							politukus[a].voter.push(poli[objPoli[2]])
						}else
							if(poli.name === result[index-1].name){
								politukus[a].name  = poli.name
								politukus[a].nilai = poli.nilai
								politukus[a].voter.push(poli[objPoli[2]])
							}
					})
					resolve(politukus)
				}
			})	
		})
	}

	static getCheater(){
		return new Promise((resolve, reject) => {
			db.all(`select * from cheater where cheatCount > 1 order by fullname;`, (err, result)=>{
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		});
	}
}

module.exports = Result