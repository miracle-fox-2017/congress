const express = require('express')
const router = express.Router()
const Voter = require('../models/voter') 

router.get('/', (req, res) => {
	res.render('voters/search', {isNull : true, error : false})
})

router.post('/', (req, res) => {
	Voter.search(req.body).then(hasil =>{
		res.render('voters/search', {nama : hasil.data, isNull:hasil.isNull, error:false})
	}).catch(error =>{
		res.render('voters/search', {isNull : true, error})
		})
})

module.exports = router
