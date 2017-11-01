const express = require('express')
const router  = express.Router()
const Model   = require('../models/resultModel')

router.get('/top5', (req, res)=>{
	Model.getTop5().then(result=>{
		// res.send(result)
		res.render('top5', {poli : result})
	}).catch(err=>{
		console.log(err);
	})
})

router.get('/analyzed', (req, res)=>{
	Model.getCheater().then(result=>{
		let cheatCount = result.length
		// res.send(result)
		res.render('analyzed', {voters : result, cheatCount})
	})
})

module.exports = router