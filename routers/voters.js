const express = require('express')
const router = express.Router()
const Voters = require('../models/voters');
router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router
