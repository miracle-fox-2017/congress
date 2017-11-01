const express = require('express');
const router = express.Router();

const VoterModel = require('../models/voter-model');

router.get('/', (req, res) => {
	VoterModel.findAll()
		.then((allVoters) => {
			res.render('voters', {foundByName: null, foundByGender: null, foundByAge: null});
		})
		.catch(err => res.send(err));
})

router.post('/', (req, res) => {

	if (req.body.searchBy === "name" && req.body.searchName != "") {
		VoterModel.findByName(req.body.searchName)
			.then((allFoundName) => {
				res.render('voters', { foundByName: allFoundName, foundByGender: null, foundByAge: null })
			})
			.catch(err => res.send(err));

	} else if (req.body.searchBy === "gender" && req.body.searchGender != "") {
		VoterModel.findByGender(req.body.searchGender)
			.then((allFoundNameByGender) => {
				res.render('voters', { foundByName: null, foundByGender: allFoundNameByGender, foundByAge: null })
			})
			.catch(err => res.send(err));
	} else if (req.body.searchBy === "age") {
		if (req.body.minAge == '') {
			res.render('voters', { error: 'Min age harus diisi' });
		} else {
			VoterModel.findByAgeRange(req.body.minAge, req.body.maxAge)
				.then((allFoundNameByAge) => {
					res.render('voters', { foundByName: null, foundByGender: null, foundByAge: allFoundNameByAge })
				})
				.catch(err => res.send(err));
		}
	} else {
		res.render('voters', { error: 'Pilih Search filter dengan benar' });
	}
})

module.exports = router;