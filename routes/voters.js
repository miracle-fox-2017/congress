const express = require('express')
const router = express.Router()
const Voter = require('../models/voters.js')


router.get('/', function (req, res){

    res.render('voters.ejs',{dataVoters:null, err:null})

})

router.post('/', function(req, res){

  if(req.body.searchBy == 'default' ){
    Voter.error().then(err =>{
      res.render('voters', {err:err, dataVoters:null})
    })
  }else{
  Voter.validate(req).then(data =>{

    Voter.convert(data).then(dataVoters =>{

      if(dataVoters.length == null){
        Voter.error().then(err =>{
          res.render('voters', {dataVoters:null, err:err})
        })
      }else{
        res.render('voters',{dataVoters:dataVoters, err:null})
      }

    })
  })
  }
})




module.exports = router;
