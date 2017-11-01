const express = require('express');
const router = express.Router();

const VoterModel = require('../models/voter-model');

router.get('/', (req, res) => {
	VoterModel.findAll()
		.then((allVoters) => {
			res.render('voters', { voters:allVoters  });
		})
		.catch(err => res.send(err));
})

module.exports = router;