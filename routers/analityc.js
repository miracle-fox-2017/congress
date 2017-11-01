const express = require('express')
const router  = express.Router()
const analityc  = require('../models/analityc')

router.get('/',function(req,res){
  analityc.getAnalityc().then(data_analityc => {
    res.render('analityc',{data_analityc:data_analityc})
  }).catch(err=>{
    console.log(err);
  })
})

module.exports = router
