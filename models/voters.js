const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/congress_poll_results.db')
const db = new sqlite3.Database(dbPath);
class Voter{
    constructor(){
        
        
    }

   static findByName(req){
        let querry = `select voters.first_name from voters where voters.first_name = "Aiden"`
    }

}
module.exports = Voter