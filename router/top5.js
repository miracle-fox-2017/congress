const express = require('express');
const router = express.Router();
const congress = require('../models/congress')

router.get('/results/top5',(req,res)=>{
  congress.TOP5().then((congressRows)=>{
    let votes = []
    let names = []
    let first = []
    congressRows.forEach((x)=>{
      if(names.indexOf(x.name)==-1){
        names.push(x.name)
        votes.push(x.totalcount)
        first.push([]);
      }
    })

    names.forEach((z,i)=>{
      congressRows.forEach((r)=>{
        if(names[i]==r.name){
          first[i].push(r.first_name);
        }
      })
    })
    console.log(first)
    res.render('top5',{first, votes, names})
  }).catch((err)=>{
    console.log(err)
  })
})
module.exports = router
