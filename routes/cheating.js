const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('cheating')
})

module.exports = router;