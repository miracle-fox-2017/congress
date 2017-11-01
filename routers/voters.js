const express = require('express')
const router = express.Router()
const Voter = require('../models/voters');

router.get('/', (req, res) => {
  res.render('voters', {data: ''})
})

router.post('/', (req, res) => {
  if(req.body.opsi == 1) {
    Voter.findByName(req.body.name, (err, voter) => {
      res.render('voters', {data: voter})
    })
  }
  else if(req.body.opsi == 2) {
    Voter.findByGender(req.body, (err, voter) => {
      res.render('voters', {data: voter})
    })
  }
  else if(req.body.opsi == 3) {
    console.log(req.body);
    Voter.findByAge(req.body, (err, voter) => {
      res.render('voters', {data: voter})
    })
  }
})

module.exports = router
