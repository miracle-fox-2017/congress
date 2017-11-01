const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
  res.render('index')
})

router.get('/voters', function (req, res){
  res.render('voters')
})

module.exports = router