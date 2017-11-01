const express = require('express');
const router = express.Router();
const Voter = require('../models/voters');

router.get('/voters', (req, res)=> {
  Voter.findAll(req.body).then((resultCongress) => {
    res.render('voters.ejs', { error: null, dataContacts: resultCongress });
  });
});

router.post('/voters', (req, res)=> {
  if (req.body.searchBy == 'default') {
    res.render('votersErr.ejs');
  }

  if (req.body.searchBy == 'gender') {
    if (req.body.searchGender == 'female') {
      Voter.findFemale(req.body).then((resultsFemale) => {
        res.render('voters.ejs', { error: null, dataContacts: resultsFemale });
      });
    } else if (req.body.searchGender == 'male') {
      Voter.findMale(req.body).then((resultsMale) => {
        res.render('voters.ejs', { error: null, dataContacts: resultsMale });
      });
    };
  }

  if (req.body.searchBy == 'name') {
    Voter.findByName(req.body.searchName).then((resultName) => {
      res.render('voters.ejs', { dataContacts: resultName });
    });
  }

  if (req.body.searchBy == 'age') {
    Voter.findByAge(req.body.searchStartAge, req.body.searchEndAge).then((resultAge) => {
      res.render('voters.ejs', { dataContacts: resultAge });
    });
  }
});

module.exports = router;
