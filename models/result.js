var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/congress_poll_results.db');

class Result {

  static analyzed(callback) {
    db.all(`SELECT * FROM coba WHERE number > 1`, (err, data) => {
      callback(err, data)
    })
  }

  static find5(callback) {
    db.all(`SELECT V.name, V.jumlah_vote, voters.first_name
            FROM
            (SELECT congress_members.name, votes.politician_id, count(votes.politician_id) AS jumlah_vote
            FROM votes
            inner join congress_members on congress_members.id = votes.politician_id
            GROUP BY votes.politician_id
            ORDER BY count(votes.politician_id) DESC
            limit 5) AS V
            JOIN votes ON votes.politician_id = V.politician_id
            JOIN voters ON votes.voter_id = voters.id
            order by V.jumlah_vote desc, V.name desc`, (err, data) => {
              var arr = []
              arr.push(data[0])

              for(var i = 1; i < data.length; i++) {
                if(data[i].name != arr[arr.length - 1].name) {
                  arr.push(data[i])
                }
              }

              for(var i = 0; i < arr.length; i++) {
                var tampung = []
                data.forEach((elemen) => {
                  if(elemen.name == arr[i].name) {
                    tampung.push(elemen.first_name)
                  }
                })
                arr[i].first_name = tampung
              }

              // arr[0].first_name.forEach((elemen) => {
              //   console.log(elemen);
              // })
              callback(err, arr)
            })
  }
}

module.exports = Result;
