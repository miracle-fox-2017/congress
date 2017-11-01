const express = require('express')
const router = express.Router()
const Model = require('../models/voterModel')

router.get('/', (req, res)=>{
	let message = ""
	let voters  = ""
	res.render('voter', {message, voters})
})

router.post('/', (req, res)=>{
	let message = ""
	if(req.body.mySelect === 'select'){
		message = "Please fill the blank"
		let voters  = ""
		res.render('voter', {message, voters})
	}
		
	if(req.body.mySelect === 'name'){
		message = ""
		Model.getVoterByName(req.body.name).then(result=>{
			res.render('voter', {voters : result, message} )
		}).catch(err=>{
			console.log(err);
		})
	}

	if(req.body.mySelect === 'gender'){
		if(req.body.gender === 'gender'){
			message = "Please fill the blank"
			let voters  = ""
			res.render('voter', {message, voters})		
		}else{
			message = ""
			Model.getVoterByGender(req.body.gender).then(result=>{
				res.render('voter', {voters : result, message})
			}).catch(err=>{
				console.log(err);
			})
		}
	}

	if(req.body.mySelect === 'age'){
		if((req.body.minAge === "" && req.body.maxAge === "") || req.body.minAge === ""){
			message = "Please fill the blank"
			let voters  = ""
			res.render('voter', {message, voters})
		}else
			if(req.body.maxAge === ""){
				message = ""
				Model.getVoterByAge(req.body.minAge).then(result=>{
					res.render('voter', {voters : result, message})
				}).catch(err=>{
					console.log(err);
				})
			}else{
				message = ""
				Model.getVoterBySpesificAge(req.body.minAge, req.body.maxAge).then(result=>{
					res.render('voter', {voters : result, message})
				}).catch(err=>{
					console.log(err);
				})
			}
	}
})

module.exports = router
