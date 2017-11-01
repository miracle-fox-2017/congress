const express=require('express')
const router=express.Router()
const model=require('../models/top5')


// router.get('/voters',(req,res)=>{
//   res.render('voters', {data:''})
// })

router.get('/voters',(req,res)=>{
  model.findAll()
  .then(datavoter=>{
    console.log(datavoter);
    res.render('voters',{data:datavoter})
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;
