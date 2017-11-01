const express = require('express');
const router = express.Router();
const Voters = require('../models/voters');

router.get('/', function (req, res) {
  let dataAll = {
    srcName : null,
    srcGender : null,
    srcAge : null,
    msg : null
  }
  res.render('voters', dataAll)
})

router.post('/', (req, res)=>{

  if (req.body.pilihNama == 'name') {
    Voters.searchName(req.body)
    .then(dataSearch=>{
      let dataAll = {
        srcName : dataSearch,
        srcGender : null,
        srcAge : null,
        msg : null
      }
      res.render('voters', dataAll)
    })
    .catch(err=>{
      res.send(err)
    })
  }else if (req.body.pilihNama == 'gender') {
    if (req.body.dataGender == '') {
      let dataAll = {
        srcName : null,
        srcGender : null,
        srcAge : null,
        msg : "Please fill the blank"
      }
      res.render('voters', dataAll)
    }else {
      Voters.searchGender(req.body)
      .then(dataSearch=>{
        let dataAll = {
          srcName : null,
          srcGender : dataSearch,
          srcAge : null,
          msg : null
        }
        res.render('voters', dataAll)
      })
      .catch(err=>{
        res.send(err)
      })
    }
  }else if (req.body.pilihNama == 'age') {
    if (req.body.minAge == '') {
      let dataAll = {
        srcName : null,
        srcGender : null,
        srcAge : null,
        msg : "Range Start Age must be filled"
      }
      res.render('voters', dataAll)
    }else if (req.body.maxAge == '' ) {
      Voters.searchMinAge(req.body)
      .then(dataSearch=>{
        let dataAll = {
          srcName : null,
          srcGender : null,
          srcAge : dataSearch,
          msg : null
        }
        res.render('voters', dataAll)
      })
      .catch(err=>{
        res.send(err)
      })
    }else {
      Voters.searchAgeRange(req.body)
      .then(dataSearch=>{
        let dataAll = {
          srcName : null,
          srcGender : null,
          srcAge : dataSearch,
          msg : null
        }
        res.render('voters', dataAll)
      })
      .catch(err=>{
        res.send(err)
      })
    }
  }
})


module.exports = router;
