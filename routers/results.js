var express = require('express')
var router  = express.Router()

var Result = require('../models/results')

router.get('/top5', function (req, res) {
  Result.topCongress()
  .then((topCongress)=>
    res.render('top5',{top5: topCongress})
  ).catch(err=>{
    console.log(err);
  })
})

router.get('/analyzed', function (req, res) {
  Result.analyzer()
  .then((data)=>
    res.render('analyze',{msg: `There are ${data.length} persons who voted more than one`, data: data})
  ).catch(err=>{
    res.render('analyze',{msg: err})
  })
})


module.exports = router;