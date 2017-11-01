var express = require('express')
var router  = express.Router()

var Result = require('../models/results')

router.get('/top5', function (req, res) {
  // res.send('Hello World!')
  Result.topCongress()
  .then((topCongress)=>
  // console.log(data)
  res.render('top5',{top5: topCongress})
  ).catch(err=>{
  console.log(err);
  })
  // res.render('index')
  // res.send('di top5')
})

module.exports = router;