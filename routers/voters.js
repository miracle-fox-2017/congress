const router = require('express').Router();
const Voters = require('../models/voters');

router.get('/', (req, res) => {
  res.render('voters',{head : 0,rowsVoters:[],error : []})
})

router.post('/', (req,res) => {
  if (req.body.searchBy === 'default') {
    res.render('voters', { head: 0, rowsVoters: [], error: ['Please Fill The Blank'] });
  } else if (req.body.searchBy === 'name') {
    const head = {
      id : 'ID',
      name : 'First Name',
      lastname : 'Last Name',
      gender : 'Gender',
      age : 'Age',
      married :'Married',
      children : 'Children Count'
    };

    Voters.findbyName(req.body.searchName).then( data => {
      // console.log(req.body.searchName);
      res.render('voters', { head: head, rowsVoters: data, error: [] });
    }).catch(err => {
      console.error(err);
    });
  } else if (req.body.searchBy === 'gender') {
    if (req.body.searchGender === 'default') {
      res.render('voters', { head: 0, rowsVoters: [], error: ['Please Fill Blank'] });
    } else {
      const head = {
        id : 'ID',
        name : 'First Name',
        lastname : 'Last Name',
        gender : 'Gender',
        age : 'Age',
        married :'Married',
        children : 'Children Count'
      };
      //console.log(req.body.searchGender);

      Voters.findByGender(req.body.searchGender).then(data => {
       res.render('voters', { head: head, rowsVoters: data,error : [] });
      });
    }
  } else if (req.body.searchBy === 'age') {
    if (req.body.searchStartAge === '') {
      res.render('voters', { head: 0, rowsVoters: [], error: ['Range Start Age must be filled'] });
    } else {
      const head = {
        id : 'ID',
        name : 'First Name',
        lastname : 'Last Name',
        gender : 'Gender',
        age : 'Age',
        married :'Married',
        children : 'Children Count'
      };

      if (req.body.searchEndAge === ''){
        Voters.findByAge(req.body.searchStartAge, req.body.searchStartAge).then(data => {
          res.render('voters', { head: head, rowsVoters: data, error: [] });
        });
      } else {
        Voters.findByAge(req.body.searchStartAge, req.body.searchEndAge).then(data => {
          res.render('voters', { head: head, rowsVoters: data, error: [] });
        });
      }
    }
  }
})

module.exports = router;
