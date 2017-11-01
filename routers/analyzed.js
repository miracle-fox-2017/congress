const express = require('express');
const router = express.Router();
const Vote = require('../models/votes');

router.get('/results/analyzed', (req, res)=> {
  Promise.all([Vote.showFalse(), Vote.showQtyFalse()]).then(function (rows) {
    res.render('analyzed', { dataContacts: rows[0], dataQty: rows[1] });
  }).catch(function (err) {
    console.log(err);
  });
});

module.exports = router;
