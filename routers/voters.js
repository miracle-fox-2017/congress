const express = require('express')
const router  = express.Router()
const voters  = require('../models/voters')

router.get('/',function(req,res){
  voters.searchSelect(req.body).then(message => {
    // console.log(message);
    voters.findAll().then(data_all_voters =>{
      res.render('voters',{pesanError:message,data_all_voters:[]})
    })
  }).catch()
})

router.post('/', function(req,res){
 voters.searchSelect(req.body).then(message=>{
   voters.validate(req.body).then(data_all_voters=>{
     res.render('voters',{pesanError:message,data_all_voters:data_all_voters})
   }).catch()
 }).catch(err=>{
   console.log(err);
 })
      // res.render('voters',{pesanError:message,data_search_name:data_search_name})

})


module.exports = router
