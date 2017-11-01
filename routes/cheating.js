const router = require('express').Router();
const Analyze = require('../models/cheating');

router.get('/', (req, res) => {
  Analyze.findDuplicateVote()
  .then(rows => {
    res.render('cheating', { cheating: rows });
  }).catch(err => {
    console.error(err);
  });
})

module.exports = router;