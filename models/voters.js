var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');


class Voter {


  static findAll (){
    return new Promise ((resolve, reject) =>{
    db.all(`SELECT * FROM voters `, (err, rows) =>{
      if(err){
        reject(err)
      }else{
        resolve(rows)
      }
    })
  })
  }

  static searchName(keyword){

    return new Promise ((resolve, reject) =>{

      console.log(keyword);
      db.all(`SELECT * FROM voters Where first_name LIKE '${keyword}%'`, (err, rows) =>{
        if(err){
          reject(err)
        }else{
          resolve(rows)
        }
      })

  })

  }

  static searchGender(keyword){

    return new Promise ((resolve, reject) =>{
      db.all(`SELECT * FROM voters Where gender LIKE '${keyword}'`, (err, rows) =>{
        if(err){
          reject(err)
        }else{
          resolve(rows)
        }
      })
    })
  }

  static searchAge(req){
    let start = req.body.searchStartAge
    let end = req.body.searchEndAge
    let query = 'SELECT * FROM voters Where age between'

    return new Promise ((resolve, reject) =>{


      if(start !== '' && end !== ''){
      db.all(`${query} '${start}' and '${end}'`, (err, rows) =>{
        resolve(rows)
      })
    }else if(start !== '' && end == ''){
      db.all(`${query} '${start}' and '${start}' `, (err, rows) =>{
        resolve(rows)
      })
    }else {
      resolve(null)
    }

    })




  }

  static convert(data){
    return new Promise ((resolve, reject)=>{
      for(let i =0; i < data.length; i++){
        if(data[i].married == 0){
          data[i].married = 'singel'

          data[i].married = 'kawin'
        }
      }
        resolve(data)
    })

  }






  static validate(req){

    return new Promise((resolve, reject) =>{
      if (req.body.searchBy == 'age') {
        resolve(this.searchAge(req))
      }
      else if(req.body.searchName !== '' ){
        resolve(this.searchName(req.body.searchName))
      }

      else if(req.body.searchGender !== 'default'){
        resolve(this.searchGender(req.body.searchGender))
      }


    })

  }

  static error(){
    return new Promise ((resolve, reject) =>{
      let error ={
        msg: 'Please fill the Blank'
      }
      resolve(error)
    })
  }





















}

module.exports = Voter;
