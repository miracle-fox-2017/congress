const express = require('express')
const Voter = require('../models/voter')

const router = express.Router()

// define the voter page route
router.get('/', function (req, res) {
  res.render('voter', {error: false, dataVoter: false})
})

router.post('/', function (req, res) {
  if(!req.body.searchGender && !req.body.searchName && !req.body.minAge && !req.body.maxAge) {
    res.render('voter', {error: true, dataVoter: false})
  }

  if(req.body.searchName) {
    Voter.searchName(req.body.searchName).then(dataVoter => {
      res.render('voter', {error: false, dataVoter: dataVoter})
    })
  }

  if(req.body.searchGender) {
    Voter.searchGender(req.body.searchGender).then(dataVoter => {
      res.render('voter', {error: false, dataVoter: dataVoter})
    })
  }

  if(req.body.maxAge || req.body.minAge) {
    Voter.searchAge(req.body).then(dataVoter => {
      res.render('voter', {error: false, dataVoter: dataVoter})
    }).catch(error => {
      res.render('voter', {error: true, dataVoter: false})
    })
  }
})

module.exports = router
