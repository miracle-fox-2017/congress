const express = require('express')
const router = express.Router()
const Top5 = require('../models/top5')

router.get('/', (req, res) => {
	Top5.findTop5().then(hasil =>{
		hasil[0].voter_name.split()


		res.render('top5/list', {hasil})
	})
	
})


module.exports = router