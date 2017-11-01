const express = require('express');
const router = express.Router();

const Congress   = require('../model/congress_members.js') 
const Voters     = require('../model/voters.js') 



	router.get('/', function(req,res){
		Voters.findAll()
		.then(rowVoters =>{
			res.render('voters', {rowvoters : rowVoters , message : undefined, search : undefined});
		})
		.catch(err =>{
			res.send(err);
		})
	})

	router.post('/', function(req,res){
		console.log(req.body)
		Voters.findAll()
		.then(rowVoters =>{

			if(req.body.gender == '----SELECT----' && req.body.searchName == '' && req.body.minAge == '' && req.body.maxAge == ''){
					let message = "FILL THE BLANK"
					res.render('voters', {rowvoters : rowVoters , message : message, search : undefined})		
			}

			if(req.body.searchName != ''){
				Voters.searchVoter(req.body.searchName)
				.then(searchVoter =>{
					res.render('voters', {rowvoters : rowVoters , message : undefined, search : searchVoter})	
				})
				.catch(err =>{
					res.send(err)
				})
			}

			if(req.body.gender != '' && req.body.gender != '----SELECT----'){
				Voters.searchGenderVoter(req.body.gender)
				.then(searchVoter =>{
					res.render('voters', {rowvoters : rowVoters , message : undefined, search : searchVoter})		
				})
				.catch(err =>{
					res.send(err)
				})
			}

			if(req.body.minAge != '' && req.body.maxAge != ''){
				Voters.searchAgeVoter(req.body.minAge, req.body.maxAge)
				.then(searchAge =>{
					res.render('voters', {rowvoters : rowVoters , message : undefined, search : searchAge})		
				})
				.catch(err =>{
					res.send(err)
				})
			}

			if(req.body.minAge != '' && req.body.maxAge == ''){
				Voters.searchMinAge(req.body.minAge)
				.then(searchMin =>{
					res.render('voters', {rowvoters : rowVoters , message : undefined, search : searchMin})		
				})
				.catch(err =>{
					res.send(err)
				})		
			}

			if(req.body.minAge == '' && req.body.maxAge != ''){
				let message = "ISI MIN AGE"
				res.render('voters', {rowvoters : rowVoters , message : message, search : undefined})
			}									
		})
	})

module.exports = router;