const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('top5');
});

module.exports = router;