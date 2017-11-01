const express = require('express')
const router  = express.Router()
const voting = require ('../models/congress')

router.get('/results/top5', (req, res)=>{
	voting.top5().then((dataVoting) => {
		let jumlahTotal = [];
		let nama = [];
		let getHasil = [];

		dataVoting.forEach(function(data) {
			if (nama.indexOf(data.name) == -1 ) {
				nama.push(data.name)	
				jumlahTotal.push(data.totalCount)	
				getHasil.push([]);
			}
		})
		nama.forEach(function(data,i) {
			dataVoting.forEach(function(data) {
				if(nama[i] == data.name) {
					getHasil[i].push(data.first_name);
				}
			})
		})
		console.log(nama)
	res.render('top5', {jumlahTotal, nama, getHasil})	
	})
})

router.get('/results/analyzed', function (req, res) {
    voting.analisaKecurangan().then((getData) => {
        res.render('analisaKecurangan', { getData });
    }).catch((err) => {
        res.send(err);
    });
});


module.exports = router

