let express = require('express')
let router = express.Router()

let Result = require('../models/resultsMod')
let Voter = require('../models/votersMod')

router.get('/top5',function(req,res){
  Promise.all([Result.findTopFive(),Voter.findAll()]).then(function(rows){
    console.log(rows[0]);
    res.render('topFive',{dataJsonTopFive:rows[0],dataJsonVoters:rows[1]})
  }).catch(function(err){
    console.log(err);
  })
})

module.exports = router;
