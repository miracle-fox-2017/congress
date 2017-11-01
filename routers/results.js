const express = require('express');
const router = express.Router();

const Result = require('../models/results');

router.get('/top5', (req, res)=>{
  Result.findAll()
  .then(dataTop5=>{
    let dataT5 = {
      rows : dataTop5
    };
    res.render('top5', dataT5)
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
