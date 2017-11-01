const express = require('express')
const router = express.Router()
const Top5 = require('../models/top5')




router.get('/', function (req, res){
  Top5.top().then(rows =>{
    res.render('top5',{rows})
  })
})




module.exports = router;
