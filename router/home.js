const express = require('express')
const router = express.Router();
const Result = ('../models/result')

router.get('/', function (req, res) {
  res.render('home')
})
module.exports = router;
