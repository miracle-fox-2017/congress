const express = require('express')
const Vote = require('../models/vote')

const router = express.Router()

// define the result page route
router.get('/top5', function (req, res) {
  Vote.top5().then(dataTop5 => {
    res.render('top5', {dataTop5: dataTop5})
  }).catch(error => {
    res.send(error)
  })
})

router.get('/analyzed', function (req, res) {
  Vote.analyzed().then(dataAnalyzed => {
    res.render('analyzed', {dataAnalyzed: dataAnalyzed})
  }).catch(error => {
    res.send(error)
  })
})

module.exports = router
