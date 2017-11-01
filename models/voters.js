const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Voters{
    static findName(obj){
        let query = `SELECT * FROM voters 
                    WHERE first_name LIKE "%${obj.name}%"`;
        return new Promise((resolve, reject)=>{
        db.all(query,(err,dataTop)=>{
                if(!err){
                    resolve(dataTop);
                }else{
                    reject(err);
                }
            });
        });
    }

    static findGender(obj) {
        let gender = '';
        if (obj.name == 1){
            gender = "male";
        }else{
            gender = "female";
        }
        let query = `SELECT * FROM voters WHERE gender = "${gender}"`;
        return new Promise((resolve, reject) => {
            db.all(query, (err, dataTop) => {
                if (!err) {
                    resolve(dataTop);
                } else {
                    reject(err);
                }
            });
        });
    }

    // static findGender(obj) {
    //     let query = `SELECT * FROM voters WHERE gender = "${obj.gender}"`;
    //     return new Promise((resolve, reject) => {
    //         db.all(query, (err, dataTop) => {
    //             if (!err) {
    //                 resolve(dataTop);
    //             } else {
    //                 reject(err);
    //             }
    //         });
    //     });
    // }

}

module.exports = Voters; 