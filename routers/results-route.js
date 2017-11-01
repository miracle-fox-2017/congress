const express = require('express');
const router = express.Router();
const VoteModel = require('../models/vote-model');

router.get('/', (req, res) => {
	res.send('Results');
})

router.get('/top5', (req, res) => {
	VoteModel.findTop5()
		.then((allTop5) => {
			console.log(allTop5)
			res.render('top5', {top5: allTop5});
		})
		.catch(err => res.send(err));
	
})

router.get('/analyzed', (req, res) => {
	res.render('result-analyzed');
})

module.exports = router;