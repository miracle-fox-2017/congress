const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('voters')
})

router.post('/', (req, res)=>{
  console.log(req.body.dataName);
})

module.exports = router;
