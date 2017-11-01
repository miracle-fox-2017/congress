const express = require('express');
const router = express.Router()


router.get('/result/analyzed',function(req,res) {
  res.render('analyze')
})
module.exports = router;
