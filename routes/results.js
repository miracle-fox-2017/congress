const express = require('express');
const router = express.Router();

router.get('/top5', function(req, res){
  res.render('top5')
})

router.get('/analyzed', function(req, res){
  res.render('curang')
})

module.exports = router
