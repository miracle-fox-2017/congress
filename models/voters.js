const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./db/congress_poll_results.db");

class Voters {
  static searchName(dataInput){
    return new Promise((resolve, reject)=>{
      let search = dataInput.dataName;
      let query = `select *,
                  case
                     when married = 0 then 'Single/Widow'
                     when married = 1 then 'Married'
                  END as menikah
                  from voters
                  where first_name like '%${search}%'
                  order by first_name asc`
      db.all(query, function(err, rows) {
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  static searchGender(dataInput){
    return new Promise((resolve, reject)=>{
      let search = dataInput.dataGender;
      let query = `select *,
                  case
                     when married = 0 then 'Single/Widow'
                     when married = 1 then 'Married'
                  END as menikah
                  from voters
                  where gender = '${search}'
                  order by first_name asc`
      db.all(query, function(err, rows) {
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  static searchMinAge(dataInput){
    return new Promise((resolve, reject)=>{
      let search = dataInput.minAge;
      let query = `select *,
                  case
                     when married = 0 then 'Single/Widow'
                     when married = 1 then 'Married'
                  END as menikah
                  from voters
                  where age >= '${search}'
                  order by first_name asc`
      db.all(query, function(err, rows) {
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }

  static searchAgeRange(dataInput){
    return new Promise((resolve, reject)=>{
      let min = dataInput.minAge;
      let max = dataInput.maxAge;
      let query = `select *,
                  case
                     when married = 0 then 'Single/Widow'
                     when married = 1 then 'Married'
                  END as menikah
                  from voters
                  where age >= '${min}' and age <= '${max}'
                  order by first_name asc`
      db.all(query, function(err, rows) {
        if (!err) {
          resolve(rows)
        }else {
          reject(err)
        }
      })
    })
  }
}

module.exports = Voters;
