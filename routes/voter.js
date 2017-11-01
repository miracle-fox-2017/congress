const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
	res.send('Ini voter')
})

module.exports = router
