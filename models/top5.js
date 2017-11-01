const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/congress_poll_results.db');

class Top5{

  static findTop5(){
    return new Promise(function(resolve,reject){
      let query = `select count(votes.politician_id) as count_votes, votes.politician_id, congress_members.name, votes.voter_id from votes
                  inner join congress_members on congress_members.id = votes.politician_id
                  group by votes.politician_id
                  order by count(votes.politician_id) desc, congress_members.name
                  limit 5`
      db.all(query, function(err,data_top5){
        if(!err){
          resolve(data_top5)
        }else{
          reject(err)
        }
      })
    })
  }

  static findAllVoters(){
    return new Promise(function(resolve,reject){
      let query = `select congress.name, congress.count_votes, voters.first_name
                  from(select count(votes.politician_id) as count_votes, votes.politician_id, congress_members.name, votes.voter_id from votes
                  inner join congress_members on congress_members.id = votes.politician_id
                  group by votes.politician_id
                  order by count(votes.politician_id) desc
                  limit 5) as congress
                  join  votes on votes.politician_id = congress.politician_id
                  join voters on votes.voter_id = voters.id
                  order by congress.count_votes desc`
      db.all(query, function(err,data_voters){
        if(!err){
          resolve(data_voters)
        }else{
          reject(err)
        }
      })
    })
  }

  static findTop1(){
    return new Promise((resolve,reject)=>{
      this.findTop5().then(data_top5=>{
        this.findAllVoters().then(data_voters=>{
          let top1 = []
          for(let i=0; i<data_voters.length; i++){
            if(data_top5[0].name == data_voters[i].name){
              top1.push(data_voters[i].first_name)
            }
          }
          resolve(top1)
        })
      }).catch(err=>{
        reject(err)
      })

    })
  }

  static findTop2(){
    return new Promise((resolve,reject)=>{
      this.findTop5().then(data_top5=>{
        // console.log('>>>>',data_top5);
        this.findAllVoters().then(data_voters=>{
          // console.log('<<<<<',data_voters);
          let top2 = []
          for(let i=0; i<data_voters.length; i++){
            if(data_top5[1].name == data_voters[i].name){
              top2.push(data_voters[i].first_name)
            }
          }
          resolve(top2)
        })
      }).catch(err=>{
        reject(err)
      })

    })
  }

  static findTop3(){
    return new Promise((resolve,reject)=>{
      this.findTop5().then(data_top5=>{
        // console.log('>>>>',data_top5);
        this.findAllVoters().then(data_voters=>{
          // console.log('<<<<<',data_voters);
          let top3 = []
          for(let i=0; i<data_voters.length; i++){
            if(data_top5[2].name == data_voters[i].name){
              top3.push(data_voters[i].first_name)
            }
          }
          resolve(top3)
        })
      }).catch(err=>{
        reject(err)
      })

    })
  }

  static findTop4(){
    return new Promise((resolve,reject)=>{
      this.findTop5().then(data_top5=>{
        // console.log('>>>>',data_top5);
        this.findAllVoters().then(data_voters=>{
          // console.log('<<<<<',data_voters);
          let top4 = []
          for(let i=0; i<data_voters.length; i++){
            if(data_top5[3].name == data_voters[i].name){
              top4.push(data_voters[i].first_name)
            }
          }
          resolve(top4)
        })
      }).catch(err=>{
        reject(err)
      })
    })
  }

  static findTop5_1(){
    return new Promise((resolve,reject)=>{
      this.findTop5().then(data_top5=>{
        // console.log('>>>>',data_top5);
        this.findAllVoters().then(data_voters=>{
          // console.log('<<<<<',data_voters);
          let top5 = []
          for(let i=0; i<data_voters.length; i++){
            if(data_top5[4].name == data_voters[i].name){
              top5.push(data_voters[i].first_name)
            }
          }
          resolve(top5)
        })
      }).catch(err=>{
        reject(err)
      })

    })
  }



}

module.exports = Top5
