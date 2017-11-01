const express = require('express')
const router = express.Router()
const Votes = require('../models/votes');
router.get('/top5', function (req, res) {
  Votes.getTop5withVoters()
    .then(dataTop5=>{
      res.render('top5', {dataTop5:dataTop5})
    })
      .catch(err=>{
        res.send(err)
      })
})

router.get('/analyzed', (req, res)=>{
  Votes.getAnalyzed()
    .then(dataAnalized=>{
      res.render('analyzed', {dataAnalized:dataAnalized})
    })
      .catch(err=>{
        res.send(err)
      })
})


module.exports = router
