var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');
 
class Voters {
  constructor(){}
  
  static search(input){
    return new Promise((resolve, reject)=>{
      
      let result;
      let error;
      
      //searchBy = default => reject 'please fill the blank'
      if(input.searchBy == 'default'){
        error = 'please fill the blank';
        reject(error)
      }
      
      //searchName
      else if(input.searchBy == 'name'){
        let searchLike = `SELECT id, first_name, last_name, gender, age, 
                          CASE 
                             WHEN married = 0 THEN 'Single/Widow'
                             WHEN married = 1 THEN 'Married'
                          END as married,
                          children_count
                          FROM voters
                          WHERE first_name LIKE '%${input.searchName}%'
                          ORDER BY first_name ASC`
        db.all(searchLike, (err, rows)=>{
          if(err){
            reject(err)
          } else {
            // console.log(Object.keys(rows[0])[0]);
            // console.log(rows[0]);
            let header = new Key(
              Object.keys(rows[0])[0], 
              Object.keys(rows[0])[1], 
              Object.keys(rows[0])[2], 
              Object.keys(rows[0])[3], 
              Object.keys(rows[0])[4], 
              Object.keys(rows[0])[5], 
              Object.keys(rows[0])[6])
            rows.unshift(header)
            resolve(rows)
          }
        })
                          
      }
      
      //searchGender
      else if(input.searchBy == 'gender'){
        if(input.searchGender == 'default'){
          reject('please fill the blank')
        } else {
          //read db
          let searchGender = `SELECT id, first_name, last_name, gender, age, 
                            CASE 
                               WHEN married = 0 THEN 'Single/Widow'
                               WHEN married = 1 THEN 'Married'
                            END as married,
                            children_count
                            FROM voters
                            WHERE gender = '${input.searchGender}'
                            ORDER BY id ASC`
          db.all(searchGender, (err, rows)=>{
            // console.log(rows);
            if(err){
              reject(err)
            } else {
              // console.log(Object.keys(rows[0])[0]);
              // console.log(rows[0]);
              let header = new Key(
                Object.keys(rows[0])[0], 
                Object.keys(rows[0])[1], 
                Object.keys(rows[0])[2], 
                Object.keys(rows[0])[3], 
                Object.keys(rows[0])[4], 
                Object.keys(rows[0])[5], 
                Object.keys(rows[0])[6])
              rows.unshift(header)
              resolve(rows)
            }
          })
          
        }
        
        
      }
      
      //searchAge range
      else if(input.searchBy == 'age'){
        if(input.searchStartAge == ''){
          reject('Range Start Age must be filled')
        } else {
          if(input.searchEndAge == ''){
            //ini cuma startnya aja
            let querySearchAge = `SELECT id, first_name, last_name, gender, age, 
                              CASE 
                                 WHEN married = 0 THEN 'Single/Widow'
                                 WHEN married = 1 THEN 'Married'
                              END as married,
                              children_count
                              FROM voters
                              WHERE age = '${input.searchStartAge}'
                              ORDER BY id ASC`
            db.all(querySearchAge, (err, rows)=>{
              // console.log(rows);
              if(err){
                reject(err)
              } else {
                // console.log(Object.keys(rows[0])[0]);
                // console.log(rows[0]);
                let header = new Key(
                  Object.keys(rows[0])[0], 
                  Object.keys(rows[0])[1], 
                  Object.keys(rows[0])[2], 
                  Object.keys(rows[0])[3], 
                  Object.keys(rows[0])[4], 
                  Object.keys(rows[0])[5], 
                  Object.keys(rows[0])[6])
                rows.unshift(header)
                resolve(rows)
              }
            })
          } else {
            //ini 2 2nya
            let querySearchAge = `SELECT id, first_name, last_name, gender, age, 
                              CASE 
                                 WHEN married = 0 THEN 'Single/Widow'
                                 WHEN married = 1 THEN 'Married'
                              END as married,
                              children_count
                              FROM voters
                              WHERE age >= '${input.searchStartAge}' AND age <= '${input.searchEndAge}'
                              ORDER BY age ASC, id ASC`
            db.all(querySearchAge, (err, rows)=>{
              // console.log(rows);
              if(err){
                reject(err)
              } else {
                // console.log(Object.keys(rows[0])[0]);
                // console.log(rows[0]);
                let header = new Key(
                  Object.keys(rows[0])[0], 
                  Object.keys(rows[0])[1], 
                  Object.keys(rows[0])[2], 
                  Object.keys(rows[0])[3], 
                  Object.keys(rows[0])[4], 
                  Object.keys(rows[0])[5], 
                  Object.keys(rows[0])[6])
                rows.unshift(header)
                resolve(rows)
              }
            })
          }
          
          
          
        }
      }

    })
    
  }
}

class Key{
  constructor(id, first_name, last_name, gender, age, married, children_count){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.age = age;
    this.married = married;
    this.children_count = children_count;
  }
}

module.exports = Voters;