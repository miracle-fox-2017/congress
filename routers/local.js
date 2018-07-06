const express  = require('express')
const router   = express.Router();

const Congress = require('../model/congress_members.js')

	router.get('/', function(req, res){
		res.render('home.ejs');
	}) 

module.exports = router;