const express = require('express')
const router  = express.Router()

router.get('/', (req, res)=>{
	res.send('Ini Result')
})

module.exports = router