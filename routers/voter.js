const express = require('express')
const Voter = require('../models/voter')

const router = express.Router()

// define the voter page route
router.get('/', function (req, res) {
  res.render('voter', {error: false, dataVoter: false})
})

router.post('/', function (req, res) {
  console.log(req.body);
  if(!req.body.searchGender && !req.body.minAge && !req.body.maxAge) {
    res.render('voter', {error: true, dataVoter: false})
  } else {
    // console.log('--> masuk query');
    Voter.search(req.body).then(dataVoter => {
      res.render('voter', {error: false, dataVoter: dataVoter})
    })
  }
})

module.exports = router
