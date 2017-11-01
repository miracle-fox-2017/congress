const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('voters');
});

module.exports = router;