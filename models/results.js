const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/congress_poll_results.db')
const db = new sqlite3.Database(dbPath);
class Votes{
    constructor(){
        
        
    }

    static top5(cb){
        let count = `select V.name,V.politician_id,V.total,votes.voter_id,voters.first_name from votes inner join
        (select congress_members.name, votes.politician_id,
        count(votes.politician_id) as total
        from votes
        join congress_members On congress_members.id = votes.politician_id
        group by votes.politician_id
        order by total desc
        limit 5) as V
        on V.politician_id = votes.politician_id
        inner join voters on voters.id = votes.voter_id
        order by V.name`
        db.all(count,(err,rowsTop5)=>{
            if(!err){
                console.log(rowsTop5)
                cb(rowsTop5)
            }
            
        })
     
    }

}
module.exports = Votes