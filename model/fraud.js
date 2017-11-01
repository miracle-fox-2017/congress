var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./db/congress_poll_results.db");

class Kecurangan{
    static getFraud(){
        return new Promise((resolve,reject)=>{
            // const mainQuery=`create view fraud as
            //                 select count(voter_id) as hitung, voters.first_name ||" "|| voters.last_name as name, voters.gender, voters.age
            //                 from votes
            //                 inner join voters on votes.voter_id = voters.id
            //                 group by voter_id
            //                 having count(voter_id) > 1
            //                 order by voters.first_name asc, hitung asc`;
            const selectView=`select * from fraud`;
            // db.run(mainQuery,function(err){
            //     if(err){
            //         console.log(err);
            //     }
            // });
            db.all(selectView,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
}

module.exports=Kecurangan;
