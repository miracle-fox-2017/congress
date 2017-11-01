const express=require('express')
const router=express.Router()
const model=require('../models/top5')

router.get('/top5',(req,res)=>{
  model.findAll()
  .then(datavote=>{
    let jumlah = [];
    let name = [];
    let hasil = [];
    datavote.forEach(function(data){
      if (name.indexOf(data.name) == -1) {
        name.push(data.name)
        hasil.push(data.Total)
        jumlah.push([]);
      }
    })
    name.forEach(function(data,index){
      datavote.forEach(function(i){
        if(name[index]== i.name) {
          jumlah[index].push(i.first_name)
        }
      })
    })
    res.render('top5',{ name, jumlah, hasil})
    console.log(jumlah);
  })

  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;
