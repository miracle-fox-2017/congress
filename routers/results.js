const express = require('express');
const router = express.Router();

const Result = require('../models/results');


router.get('/top5',function(req,res){
  Result.findTop5(function(err,rows){
    // console.log(rows);
    res.render('top5',{rows})
  })
})

router.get('/analyzed',function(req,res){

})




module.exports = router
