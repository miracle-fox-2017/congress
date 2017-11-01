const express = require('express');
const router = express.Router()
const congress = require('../models/congress');

router.get('/results/top5',function(req,res) {
  congress.top5().then((rows)=>{
    let votes = []
    let names = []
    let first = []
    rows.forEach((x)=>{
      if(names.indexOf(x.name)==-1){
        names.push(x.name)
        votes.push(x.Total)
        first.push([])
      }
    })

    names.forEach((z,i)=>{
      rows.forEach((r)=>{
        if(names[i]===r.name){
          first[i].push(r.first_name)
        }
      })
    })
    console.log(first);
    res.render('top5',{first,votes,names})
  }).catch((err)=>{
    console.log(err);
  })

})
module.exports = router;
