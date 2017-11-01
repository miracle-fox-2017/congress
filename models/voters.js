const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/congress_poll_results.db');


class Voters{
  static findAll(){
    return new Promise(function(resolve,reject){
      db.all(`select * from voters`, function(err,data_all_voters){
        if(!err){
          resolve(data_all_voters)
        }else{
          reject(err)
        }
      })
    })
  }
  static searchSelect(reqbody){
    console.log('<<<<<',reqbody.options);
    return new Promise(function(resolve,reject){
      let message = ''
      if(reqbody.options == 'select'){
        message = 'Please fill the blank'
      }
      resolve(message)
    })
  }

  static search_name(reqbody){
    return new Promise(function(resolve,reject){
      let query = `select * from voters where first_name like "${reqbody}%" or last_name like "${reqbody}%"`
      db.all(query,function(err,data_search_name){
        if(!err){
          resolve(data_search_name)
        }else{
          reject(err)
        }
      })
    })
  }

  static search_gender(reqbody){
    return new Promise(function(resolve,reject){
      let query = `select * from voters where gender = '${reqbody}'`
      db.all(query,function(err,data_gender){
        if(!err){
          resolve(data_gender)
        }else{
          reject(err)
        }
      })
    })
  }

  static search_age(min,max){
    return new Promise(function(resolve,reject){
      let query = `select * from voters where age >= '${min}' and age <= '${max}' order by age`
      db.all(query,function(err,data_age){
        if(!err){
          resolve(data_age)
        }else{
          reject(err)
        }
      })
    })
  }

  static validate(reqbody){
    // console.log(reqbody);
    return new Promise((resolve,reject)=>{
      if(reqbody.options == 'select'){
        // console.log(reqbody);
        this.searchSelect(reqbody).then(message=>{
          resolve(message)
        }).catch(err=>{
          reject(err)
        })
      }
      if(reqbody.searchName !== ''){
        this.search_name(reqbody.searchName).then(data_search_name=>{
          resolve(data_search_name)
        }).catch(err=>{
          reject(err)
        })
      }
      if(reqbody.searchGender !== ''){
        this.search_gender(reqbody.searchGender).then(data_gender=>{
          resolve(data_gender)
        }).catch(err=>{
          reject(err)
        })
      }
      if(reqbody.searchStartAge !== ''){
        this.search_age(+reqbody.searchStartAge,+reqbody.searchEndAge).then(data_age=>{
          resolve(data_age)
        }).catch(err=>{
          reject(err)
        })
      }
    })
  }



}

module.exports = Voters
