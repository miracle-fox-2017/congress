const express = require('express')
const Voter = require('../models/voter')

const router = express.Router()

// define the voter page route
router.get('/', function (req, res) {
  res.render('voter', {error: '', dataVoter: ''})
})

router.post('/', function (req, res) {
  console.log(req.body);
  if(!req.body.searchBy && !req.body.searchName && !req.body.searchGender && !req.body.minAge && !req.body.maxAge) {
    // handle error jika field select kosong
    res.render('voter', {error: 'Please fill the blank', dataVoter: false})
  } else if(req.body.searchBy && !req.body.searchName && !req.body.searchGender && !req.body.minAge && !req.body.maxAge) {
    // handle error jika field gender kosong
    res.render('voter', {error: 'Please fill the blank', dataVoter: false})
  } else if(req.body.searchBy && !req.body.searchName && !req.body.searchGender && !req.body.minAge && req.body.maxAge) {
    // handle error jika field minAge kosong
    res.render('voter', {error: 'Range Start Age must be filled', dataVoter: false})
  } else {
    Voter.search(req.body).then(dataFilter => {
      res.render('voter', {error: '', dataVoter: dataFilter})
    }).catch(error => {
      res.render('voter', {error: 'Range Start Age must be filled', dataVoter: ''})
    })
  }
})

module.exports = router

/*
#Versi amburadul
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
*/
