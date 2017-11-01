const express = require('express');
const router = express.Router();


router.get('/votes',(req,res)=>{
  res.render('votes')
})
module.exports = router

router.post('/votes',(req,res)=>{
  let state = req.body.votes
  console.log(a)

})
