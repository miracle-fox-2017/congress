const sqlite3 = require('sqlite3').verbose()
const db      = new sqlite3.Database('./db/congress_poll_results.db')

class Voter{}


module.exports = Voter