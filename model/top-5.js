var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./db/congress_poll_results.db");

class Top5{
    static getData(){
        return new Promise((resolve,reject)=>{
            const query=`select tikus.sort, tikus.name, voters.first_name from
                        	(select count(votes.politician_id) as sort ,CM.id, CM.name from votes
                        	inner join congress_members as CM on votes.politician_id = CM.id
                        	group by votes.politician_id order by sort desc
                        	limit 5) as tikus
                        inner join votes on votes.politician_id = tikus.id
                        inner join voters on votes.voter_id = voters.id
                        order by sort desc`;
            db.all(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
}

module.exports=Top5;
