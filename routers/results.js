const express = require('express');
const router = express.Router();
const Vote = require('../models/results');

router.get('/results/top5', function (req, res) {
    Vote.findTop().then((getData)=>{
        
        let getTotal = [];
        let getName = []; 
        let getHasil = [];

        getData.forEach(function(element,index) {
            
            if (getName.indexOf(element.name) == -1){

                getTotal.push(element.Total);

                getName.push(element.name);

                getHasil.push([]);
            }
          
        });

        getName.forEach(function (element, index) {
            getData.forEach(function(el) {
                if (element == el.name){
                    getHasil[index].push(el.first_name);
                }
            });
        });

        // if (getData.length - 1 == index) {
        res.render('top', { getHasil, getName, getTotal});
        // }

    }).catch((err)=>{
        res.send(err);
    });
});

router.get('/results/analyzed', function (req, res) {
    Vote.findAnalisa().then((getData) => {
        res.render('analisa', { getData });
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router;