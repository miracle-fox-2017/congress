const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Results');
})

router.get('/top5', (req, res) => {
	res.send('Top 5');
})

router.get('/analyzed', (req, res) => {
	res.send('analyzed');
})

module.exports = router;