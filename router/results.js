const express = require('express');
const router = express.Router();

const topFive = require('../models/topfive')
const analyzed = require('../models/analyzed')

router.get('/results/top5', function(req, res){
  topFive.calculate(function(hasil){
    // console.log(hasil);
    // let candidate = []
    // for(let i = 0; i < hasil.length; i++){
    //   if(candidate.indexOf(hasil[i].name) != -1){
    //     candidate.push(hasil[i].name)
    //   }
    // }
    // console.log(candidate);
    res.render('topfive', {hasil})
  })
})

router.get('/results/analyzed', function(req, res){
  analyzed.calculate(function(hasil){
    res.render('analyzed', {hasil})
  })
})

module.exports = router