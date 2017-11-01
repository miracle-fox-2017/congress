const express = require('express')
const router = express.Router()
const Voters = require('../models/voters');

router.get('/', (req, res)=> {

  Voters.findAll()
    .then(hasilCari=>{
      res.render('voters', {hasilCari:hasilCari})
    })
      .catch(err=>{
        res.send(err)
      })
})
router.post('/',(req, res)=>{
  Voters.getValue(req.body)
    .then(hasilCari=>{
      console.log(hasilCari);
      res.render('voters',{hasilCari:hasilCari})
    })
      .catch(err=>{
        res.send(err)
      })
})

module.exports = router
