var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./db/congress_poll_results.db");

class Voters{
    static searchByName(input){
        return new Promise((resolve,reject)=>{
            const query=`select id, first_name, last_name, gender, age, married, children_count from voters where first_name like "%${input}%" or last_name like "%${input}%"`;
            db.all(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static searchByGender(input){
        return new Promise((resolve,reject)=>{
            const query=`select id, first_name, last_name, gender, age, married, children_count from voters where gender = "${input}"`;
            db.all(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static searchByMinAge(input){
        return new Promise((resolve,reject)=>{
            const query=`select id, first_name, last_name, gender, age, married, children_count from voters where age = "${input}"`;
            db.all(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static searchBetweenAge(ageMin,ageMax){
        return  new Promise((resolve,reject)=>{
            const query=`select id, first_name, last_name, gender, age, married, children_count from voters where age between "${ageMin}" and "${ageMax}" order by age asc`;
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

module.exports=Voters;
