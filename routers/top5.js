const express = require('express')
const router  = express.Router()
const top5    = require('../models/top5')

router.get('/', function(req,res){
  Promise.all([
    top5.findTop5(),
    top5.findTop1(),
    top5.findTop2(),
    top5.findTop3(),
    top5.findTop4(),
    top5.findTop5_1()
  ]).then(alldata=>{
    // console.log(alldata[2]);
    res.render('top5',{data_top5:alldata[0],dataTop1:alldata[1],dataTop2:alldata[2],dataTop3:alldata[3],dataTop4:alldata[4],dataTop5_1:alldata[5]})
  }).catch(err=>{
    console.log(err,'promise all');
  })
})


module.exports = router
