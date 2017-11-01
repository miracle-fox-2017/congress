const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

db.serialize(function() {
  db.run(`create view cheating as
    select voter_id, vs.first_name ||" "||vs.last_name as name, vs.gender, vs.age, count(voter_id) as jumVotes  from votes
    inner join voters as vs on votes.voter_id = vs.id
    group by voter_id
    having jumVotes > 1
    order by first_name`);

});

db.close();
