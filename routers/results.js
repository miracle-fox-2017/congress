const express = require('express');
const Results = require('../models/results');

const route = express.Router()

route.get('/',(req,res)=>{
  res.redirect('/')
})

route.get('/top5',(req,res)=>{
  Results.gettop5().then(data =>{

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

route.get('/analyzed',(req,res)=>{
  Results.getAnalyz().then(data=>{
    let count = 0;
    data.forEach((dt,index)=>{
      count++;
      // console.log(count);
      if(index == data.length-1){
        // console.log(count);
        res.render('analyzed',{count:count,rows : data})
      }
    })
    // res.send(data)
  })
})

module.exports = route;
