const express = require('express');
const router = express.Router();
const Voter = require('../models/voters');

function renderVoters(req,res,voters,err) {
  res.render('voters', {title:'Voters List', voters:voters,err:err})
}

router.get('/', (req,res) => {
  renderVoters(req,res,[])
})

router.post('/', (req,res) => {
  Voter.search(req.body, (voters, err) => {
    if(!err){
      renderVoters(req,res,voters)
    }else{
      renderVoters(req,res,[],err)
    }
  })
})

module.exports = router;
