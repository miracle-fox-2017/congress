const express = require('express');
const router = express.Router();
const Vote = require('../models/votes');

router.get('/top5', (req,res) => {
  Vote.getTop5().then(top5 => {
    // res.send(top5)
    res.render('top5', {title:'Top 5', votes:top5})
  }).catch(err => {
    res.send(err)
  })
})

router.get('/analyzed', (req,res) => {
  Vote.duplicateV().then(d_votes => {
    // res.send(d_votes)
    res.render('analyzed', {title:'Analisa Kecurangan', votes:d_votes})
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
