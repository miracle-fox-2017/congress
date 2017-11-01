const express = require('express');
const router = express.Router();
const VoteModel = require('../models/vote-model');
const VoterModel = require('../models/voter-model');

router.get('/', (req, res) => {
	res.send('Results');
})

router.get('/top5', (req, res) => {
	VoteModel.createTop5View()
		.then((success) =>{
			
			VoteModel.findTop5()
				.then((allTop5) => {
					let politicianId = [];
					allTop5.forEach( function(politician, index) {
						politicianId.push(politician.id);
					});

					let uniquePoliticianId = Array.from(new Set(politicianId));
					let arrWinner = [];

					for (var i = 0; i < uniquePoliticianId.length; i++) {
						let obj = {
							id: uniquePoliticianId[i],
							name: '',
							voters: []
						};

						for (var j = 0; j < allTop5.length; j++) {
							if (uniquePoliticianId[i] == allTop5[j].id) {
								obj.name = allTop5[j].name;
								obj.jumlah_vote_individu = allTop5[j].jumlah_vote_individu;
								obj.voters.push(allTop5[j].first_name);
							}
						}

						arrWinner.push(obj);
					}

					res.render('top5', {top5: arrWinner});
				})
				.catch(err => res.send(err));

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