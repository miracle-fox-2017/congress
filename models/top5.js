const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db', err => {
  if (err) console.error(err);
});

class top5 {
  static findTop5() {
    const queryTop5 = `
      SELECT subquery.name candidate_name, subquery.total total_votes, voters.first_name || ' ' || voters.last_name full_name
      FROM
        (SELECT votes.politician_id, congress_members.name, COUNT(votes.politician_id) total
         FROM votes
         JOIN congress_members ON congress_members.id = votes.politician_id
         JOIN voters ON voters.id = votes.voter_id
         GROUP BY congress_members.name
         ORDER BY COUNT(votes.politician_id)
         DESC LIMIT 5
        ) subquery
      JOIN votes ON subquery.politician_id = votes.politician_id
      JOIN voters ON voters.id = votes.voter_id
      ORDER BY total_votes DESC, candidate_name DESC
    `;

    return new Promise((resolve, reject) => {
      db.all(queryTop5, (err, rows) => {
        if (err) reject(err);
        // const arrVotes = [];
        // const arrVoters =  [];

        // const uniqueName = [...new Set(rows.map(item => item.candidate_name))];
        // console.log(unique);

        // rows.forEach(value => {
        //   if (arrNotName.indexOf(value.current_name) === -1) {
        //     arrNotName.push(value.total_votes);
        //     arrVoters.push([]);
        //   }
        // });
        //{nama:a,total:32,pemilih:[b,a,c]},{nama}

        let temp=[]
        let j = 0
        for(let i =0,n= rows.length;i<n;i++){
          let tamp = rows[i]
          if(i==0){
            temp.push({name:tamp.candidate_name,totalVotes:tamp.total_votes,voter:[tamp.full_name]})
          }
          else{
            for(let x = j,y=temp.length;x<y;x++){
              let tamp2 = temp[x]
              if(tamp2.name !== tamp.candidate_name){
                temp.push({name:tamp.candidate_name,totalVotes:tamp.total_votes,voter:[tamp.full_name]})
                j++
                break;
              }
              else{
                tamp2.voter.push(tamp.full_name)
              }
            }
          }
        }
        console.log(temp);

        resolve(temp);
      });
    });
  }
}

module.exports = top5;