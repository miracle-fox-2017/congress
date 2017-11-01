const express = require('express');
const router = express.Router();

const topFive = require('../models/topfive')

router.get('/results/top5', function(req, res){
  topFive.calculate(function(hasil){
    console.log(hasil);
    
    res.render('topfive', {hasil})
  })
})

router.get('/results/analyzed', function(req, res){
    res.render('analyzed')
})

module.exports = router