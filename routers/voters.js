var express = require('express')
var router  = express.Router()

var Voters = require('../models/voters')


router.get('/', function (req, res) {
  res.render('voters', {msg: ''})
  // res.send('divoters')
})

router.post('/', function (req, res) {
  // console.log(req.body);
  Voters.search(req.body)
  .then(data=>{
    // console.log(data);
    res.render('voters_data', {data: data, msg: ""})
  }).catch(err=>{
    res.render('voters', {msg: err})
  })
  // console.log(req.body);
  // res.render('voters')
})

module.exports = router;