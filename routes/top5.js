const router = require('express').Router();
const Top5 = require('../models/top5')

router.get('/', (req, res) => {
  Top5.findTop5()
    .then(rows => {
      // res.send(rows);
      res.render('top5', { top5: rows });
    }).catch(err => {
      console.error(err);
    });
});

module.exports = router;