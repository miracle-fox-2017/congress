const express = require('express');
const router = express.Router();
const VoteModel = require(`../models/voteModel`);

router.get(`/`, (req, res) =>
  {
    res.render(`voters`, {rows : null})
  }
);

router.post(`/`, (req, res) => {
  if (req.body.searchBy === 'age'){
    VoteModel.getAgeRange(req.body.minAge, req.body.maxAge).then((rows) => {
      res.render(`voters`, {rows});
    }).catch((err) => {
      res.send(err);
    })
  }
  else if (req.body.searchBy === 'name') {
    VoteModel.getByName(req.body.searchName).then((rows) => {
      res.render('voters', {rows});
    }).catch((err) => {
      res.send(err);
    })
  }
  else if (req.body.searchBy === 'gender') {
    VoteModel.getByGender(req.body.searchGender).then((rows) => {
      res.render(`voters`, {rows});
    }).catch((err) => {
      res.send(err);
    })
  }
});


module.exports = router;