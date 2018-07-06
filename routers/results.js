const express = require('express');
const router = express.Router();

const Congress = require('../model/congress_members.js') 
const Kecurangan = require('../model/kecurangan.js') 
const Top5 = require('../model/top5.js')

	router.get('/top5', function(req,res){
		Top5.findAll()
		.then(top5 =>{
			let arrTot = []
			let arrPol = []
			let arrVot = []
			for (let i = 0 ; i<top5.length ; i++){
				if(arrPol.indexOf(top5[i].Politician) == -1){
					arrPol.push(top5[i].Politician);
					arrTot.push(top5[i].Total)
				}
			}
			for(let i = 0 ; i< arrTot.length ; i++){
				let arr =[]
				for (let j = 0 ; j<top5.length; j++){
					if(top5[j].Politician == arrPol[i]){
						arr.push(top5[j].first_name)
					}
				}
				arrVot.push(arr)
			}
			// console.log(arrTot)
			// console.log(arrPol)
			// console.log(arrVot)
			res.render('top5', {total : arrTot , politician : arrPol, voter : arrVot});
		})
		.catch(err =>{
			res.send(err);
		})
	})

	router.get('/analyzed', function(req,res){
		Kecurangan.findAll()
		.then(kecurangan =>{
			res.render('kecurangan', {kecurangan});
		})
		.catch(err =>{
			res.send(err);
		})
	})

module.exports = router;