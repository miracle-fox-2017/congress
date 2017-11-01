const express = require('express');
const router = express.Router();

const Voter = require('../models/voters');


router.get('/voters',function(req,res){

    res.render('voters')

})

//menerima input serta menampilkan semua data voter berdasarkan nama
router.post('/voters',function(req,res){
  Voter.findbyName(req.body,function(err,rowVoters){
    // console.log(rowVoters)
    res.render('voters',{rowVoters})
  })
})







module.exports = router
