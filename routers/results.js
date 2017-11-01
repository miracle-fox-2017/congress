const express = require('express');
const router = express.Router();

const Result = require('../models/results');


router.get('/top5',(req,res)=>{
  Result.findTop5().then(data =>{

// res.send(data)
    var array =[];
    let arr = [];
    data.push('end')
    for (var i = 0; i < data.length-1; i++) {

      if(data[i].name != data[i+1].name){
        let obj ={};
        obj['Total'] = data[i].Total;
        obj['Name'] = data[i].name;
        obj['first_name'] = []
        array.push(obj)
      }
    }
    let counter = 0
    for (var i = 0; i < data.length-1; i++) {
      if(data[i].name == data[i+1].name){
        array[counter].first_name.push(data[i].first_name)
      }
      else {
        counter++
      }
    }
res.render('top5',{top5 : array})
  //
  })

  // res.render('top5')
})

router.get('/analyzed', (req, res) => {
  Result.getAnalyzed()
  .then(rows => {
    res.render('analyzed', { cheating: rows });
  }).catch(err => {
    console.error(err);
  });
})


module.exports = router
