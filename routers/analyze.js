const express = require('express')
const router = express.Router()
const Analize = require('../models/Analize') 

router.get('/', (req, res) => {
	Analize.findCheating().then(hasil => {
		res.render('analyzed/analyzed', {hasil})
	}).catch(error => {
		console.log(error)
	})
	
})


module.exports = router