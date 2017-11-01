const express = require('express')
const router = express.Router();
const Result = require('../models/result');

// console.log(Result);

router.get('/result/top5',(req,res)=>{
  // res.send('masuk ga?')
  Result.uniqeTop().then((rows)=>{

    // console.log(rows);
    let arr = [];
    let newArr = [];
    let temp = [];
    // console.log(rows);
    rows.forEach((element)=>{
      if(arr.indexOf(element.name) == -1){
        arr.push(element.name)
        newArr.push(element.total_vote);
        temp.push([])
      }
    })

    arr.forEach((element, index)=>{
      rows.forEach((cari)=>{
        if(element == cari.name){
          temp[index].push(cari.first_name)
        }
      })
    })
    console.log(temp);
    res.render('top5', {arr : arr, newArr: newArr, temp:temp})

  }).catch((err)=>{
    console.log(err);
  })
})

module.exports = router;
