const express = require('express')
const router = express.Router()

router.get('/top5', function (req, res) {
  res.render('index')
})


module.exports = router
