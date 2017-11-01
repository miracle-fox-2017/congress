const express = require('express');
const router = express.Router();

const Result = require('../models/results');

router.get('/top5', (req, res)=>{
  Result.findAll()
  .then(dataTop5=>{
    let votes = []
    let names = []
    let first = []
    dataTop5.forEach((newData)=>{
      if(names.indexOf(newData.name)==-1){
        names.push(newData.name)
        votes.push(newData.voting)
        first.push([]);
      }
    })
    names.forEach((a,b)=>{
      dataTop5.forEach((dataName)=>{
        if(names[b]==dataName.name){
          first[b].push(dataName.first_name);
        }
      })
    })

    // console.log(names+'-'+votes);
    // console.log('-------- '+first);

    let dataAll = {
      first : first,
      votes : votes,
      names : names
    }

    res.render('top5', dataAll)
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/analyzed', (req, res)=>{
  Result.showCheating()
  .then(dataCheat=>{
    let dataC= {
      rows : dataCheat
    }
    res.render('analyze', dataC)
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
