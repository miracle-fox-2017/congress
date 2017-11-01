const express = require('express');
const router = express.Router()


router.get('/voters',function(req,res) {
  res.render('voters')
})
module.exports = router;
