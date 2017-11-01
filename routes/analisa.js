const express = require('express')
const router = express.Router()
const Analisa = require('../models/analisa.js')


router.get('/', function(req, res){
  Analisa.findAll().then(data =>{
    res.render('analisa', {data:data})
  })

})


module.exports = router;
