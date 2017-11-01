const express = require('express')
const router = express.Router()
const Voters = require('../models/voters');

router.get('/', (req, res)=> {
  let error;
  if(req.query.hasOwnProperty('error')){
    error = "Please fill the blank !!"
  }
  Voters.findAll()
    .then(hasilCari=>{
      res.render('voters', {error:error,hasilCari:hasilCari})
    })
      .catch(err=>{
        console.log(err);
        res.send(err)
      })
})
router.post('/',(req, res)=>{
  let a = req.body
  if(a.name== ''&& a.gender== ''&& a.min== ''&& a.max== ''){
    res.redirect('/voters/?error=true')
  } else {
    Voters.getValue(req.body)
      .then(hasilCari=>{
        res.render('voters',{hasilCari:hasilCari })
      })
        .catch(err=>{
          console.log('----',err);
          res.send(err)

        })
  }
})

module.exports = router
