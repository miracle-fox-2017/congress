const express = require('express')
const router = express.Router()
const Voter = require('../models/voters');

router.get('/', (req, res) => {
  res.render('voters', {data: '', pesan: ''})
})

router.post('/', (req, res) => {
  if(req.body.opsi == 1) {
    Voter.findByName(req.body.name, (err, voter) => {
      res.render('voters', {data: voter, pesan: ""})
    })
  }
  else if(req.body.opsi == 2) {
    if(req.body.gender == "") {
      res.render('voters', {data: '', pesan: 'please fill the blank'})
    }
    else {
      Voter.findByGender(req.body, (err, voter) => {
        res.render('voters', {data: voter, pesan: ""})
      })
    }
  }

  else if(req.body.opsi == 3) {
    if(req.body.bawah == "" && req.body.atas != "") {
      res.render('voters', {data: '', pesan:"Range Start Age must be filled"})
    }
    else {
      Voter.findByAge(req.body, (err, voter) => {
        res.render('voters', {data: voter, pesan: ""})
      })
    }
  }
  else if(req.body.opsi == '') {
    res.render('voters', {data: '', pesan: "Please fill the blank"})
  }
})

module.exports = router
