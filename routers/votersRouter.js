const express = require('express');
const router = express.Router();
const VoteModel = require(`../models/voteModel`);

router.get(`/`, (req, res) =>
  {
    res.render(`voters`)
  }
);

router.post(`/`, (req, res) => {
  console.log(req.body);
  if (req.body.searchBy === 'age')
  {
    VoteModel.getAgeRange(req.body.minAge, req.body.maxAge).then((rows) => {
      res.render(`voters`, {rows});
    })
  }
});


module.exports = router;