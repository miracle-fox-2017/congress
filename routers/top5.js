const express = require('express');
const router = express.Router();
const Congress = require('../models/congress_members');
const Top5 = require('../models/top5');

router.get('/results/top5', (req, res)=> {
  Top5.topWithVoters(req.body).then((resultCongress) => {
    res.render('top5.ejs', { error: null, dataContacts: resultCongress });
  });
});

module.exports = router;
