const express = require('express');
const router = express.Router();
const Vote = require('../models/voters');

router.get('/voters', function (req, res) {
    let isEdit = { isEdit : false };
    res.render('voters', { isEdit });
});

router.post('/voters', function (req, res) {
    let set = {
        name: req.body.name
    }
    if (req.body.get == 1){
        if (set.name == ''){
            res.redirect('voters');
        }else{
            Vote.findName(set).then((dataName) => {
                // let set = { name : "name" };
                let isEdit = { isEdit: true };
                res.render('voters', { dataName, isEdit });
            }).catch((err) => {

            })
        }
        
    } else if (req.body.get == 2){
        if (set.name==0){
            res.redirect('voters');
        } else if (set.name == 1){
            Vote.findGender(set).then((dataName) => {
                // let set = { name : "name" };
                let isEdit = { isEdit: true };
                res.render('voters', { dataName, isEdit });
            }).catch((err) => {

            })
        } else if (set.name == 2){
            Vote.findGender(set).then((dataName) => {
                // let set = { name : "name" };
                let isEdit = { isEdit: true };
                res.render('voters', { dataName, isEdit });
            }).catch((err) => {

            })
        }
    }
    
});

module.exports = router;