const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Voters {
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM voters`
      db.all(query, (err, data_voters)=>{
        if(!err){
          resolve(data_voters)
        } else {
          reject(err)
        }
      })
    });
  }
  static getValue(data){
    // console.log(data.name);
    return new Promise((resolve, reject)=>{
     if(data.name !== '') {
        this.getRecordName(data.name)
          .then(data=>{
            console.log('masuk name')
            resolve(data)
          })
            .catch(err=>{
              reject(err)
            })
      } 
      if(data.gender !== '') {
        // console.log(data.gender);
        this.getRecordGender(data.gender)
          .then(data=>{
            console.log('---------------------------gender',data);
            resolve(data)
          })
            .catch(err=>{
              reject(err)
            })
      }
       if(data.min!==''){
        this.getRecordAge(+data.min, +data.max)
          .then(data=>{
            //console.log('=======================================',data);
            resolve(data)
          })
            .catch(err=>{
              reject(err)
            })

      }
    });
  }
  static getRecordName(name){
    return new Promise((resolve, reject)=> {
      let query = `SELECT * FROM voters WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%'`
      db.all(query, (err, dataNama)=>{
        if(!err){
          resolve(dataNama)
        } else {
          reject(err)
        }
      })
    });
  }

  static getRecordGender(gender){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM voters WHERE gender = '${gender}'`
      db.all(query, (err, dataVoters)=>{
        if(!err){
          resolve(dataVoters)
        } else {
          reject(err)
        }
      })
    });
  }
  static getRecordAge(min ,max){
    console.log('masuk');
    return new Promise((resolve, reject)=> {
      let queryMinMax = `SELECT * FROM voters WHERE age >= '${min}' AND age <= '${max}' ORDER BY age`
      let queryMin = `SELECT * FROM voters WHERE age >= '${min}' ORDER BY age`
      if(max === 0){
        // console.log('masuk');
        db.all(queryMin, (err, data)=>{
          if(!err){
            // console.log('----',data);
            resolve(data)
          } else {
            reject(err)
          }
        })
      } else {
        db.all(queryMinMax, (err, data)=>{
          if(!err){
            resolve(data)
          } else {
            reject(err)
          }
        })
      }
    });
  }

}
module.exports = Voters;
