const express = require('express');
const router = express.Router();
const VoteModel = require('../models/vote-model');
const VoterModel = require('../models/voter-model');
const congressModel = require('../models/congress-member-model');

router.get('/', (req, res) => {
	res.send('Results');
})

router.get('/top5', (req, res) => {
	VoteModel.findTop5()
		.then((allTop5) => {
			res.render('top5', {top5: congressModel.splitWinnerVoter(allTop5)});
		})
		.catch(err => res.send(err));
	
})

router.get('/analyzed', (req, res) => {
	VoterModel.findAllElectionFraud()
	 .then((allFrauds) => {
	 	res.render('result-analyzed', {frauds: allFrauds});
	 })
	 .catch(err => res.send(err));
})

module.exports = router;