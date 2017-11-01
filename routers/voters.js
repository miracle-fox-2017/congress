const express = require('express');
const router = express.Router();
const Vote = require('../models/voters');

router.get('/voters', function (req, res) {
    let isEdit = { isEdit : false };
    let err = { err: null };
    res.render('voters', { isEdit, err });
});

router.post('/voters', function (req, res) {
    let set = {
        name: req.body.name
    }
    if (req.body.get == 1){
        if (set.name == ''){
            let isEdit = { isEdit: false };
            let err = { err: "data Kosong" };
            res.render('voters', { isEdit, err });
        }else{
            Vote.findName(set).then((dataName) => {
                // let set = { name : "name" };
                let isEdit = { isEdit: true };
                let err = { err: null };
                res.render('voters', { dataName, isEdit, err });
            }).catch((err) => {

            })
        }
        
    } else if (req.body.get == 2){
        if (set.name==0){
            let isEdit = { isEdit: false };
            let err = { err: "pilih datanya" };
            res.render('voters', { isEdit, err });
        } else if (set.name == 1){
            Vote.findGender(set).then((dataName) => {
                // let set = { name : "name" };
                let isEdit = { isEdit: true };
                let err = { err: null };
                res.render('voters', { dataName, isEdit, err });
            }).catch((err) => {

            })
        } else if (set.name == 2){
            Vote.findGender(set).then((dataName) => {
                // let set = { name : "name" };
                let isEdit = { isEdit: true };
                let err = { err: null };
                res.render('voters', { dataName, isEdit, err });
            }).catch((err) => {

            })
        }
    }
    
});

module.exports = router;