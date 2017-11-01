const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');
const Voters = require('./voters');
class Vote {
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM votes`
      db.all(query, (err, data_votes)=>{
        if(!err){
          resolve(data_votes)
        } else {
          reject(err)
        }
      })
    });

  }
  static getById(id){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM votes WHERE id = ${id}`
      db.get(query, (err, data_votes)=>{
        if(!err){
          resolve(data_votes)
        } else {
          reject(err)
        }
      })
    });
  }
  static getTop5(){
    return new Promise(function(resolve, reject) {
      let subquery =
      `
     (SELECT
     COUNT(VS.politician_id) as totalvote,
     CM.name as politician,
     CM.id as id
        FROM votes VS
        INNER JOIN congress_members CM ON CM.id = VS.politician_id
        GROUP BY VS.politician_id
        ORDER BY politician)
      `
      let query = `
      SELECT
      HASIL.id,
    	HASIL.totalvote,
    	HASIL.politician
    	FROM ${subquery} AS HASIL
    	ORDER BY HASIL.totalvote DESC
    	LIMIT 5
      `
      db.all(query, (err, datatop)=>{
        if(!err){
          resolve(datatop)
        } else {
          reject(err)
        }
      })
    });
  }
    static getTop5withVoters(){
      return new Promise((resolve, reject)=> {
        Promise.all(
          [
              this.findAll(),
              this.getTop5(),
              Voters.findAll()
          ])
            .then(alldata =>{
              alldata[1].map(dataTops=>{
                dataTops.idVoters = []
                dataTops.nameVoters = []
                alldata[0].map(dataCon=>{
                  if(dataCon.politician_id === dataTops.id){
                    dataTops.idVoters.push(dataCon.voter_id)
                  }
                })
                dataTops.idVoters.map(id=>{
                  alldata[2].map(dataVoters=>{
                    if(dataVoters.id === id){
                      dataTops.nameVoters.push(dataVoters.first_name)
                    }
                  })
                })
              })
              // console.log(alldata[1]);
              resolve(alldata[1])
            })
              .catch(err=>{
                reject(err)
              })
      });
    }

    static getAnalyzed(){
      return new Promise(function(resolve, reject) {
        let query = `
        SELECT
        VR.first_name,
        VR.last_name,
        VR.gender,
        VR.age,
        V.voting
        FROM analized AS V
        LEFT JOIN voters AS VR
        ON VR.id = V.voter_id
        WHERE V.voting > 1 `
        db.all(query, (err, dataAnalized)=>{
          if(!err){
            resolve(dataAnalized)
          } else {
            reject(err)
          }
        })
      });
    }

}
module.exports = Vote;
