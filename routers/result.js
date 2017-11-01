const express = require('express')
const Vote = require('../models/vote')

const router = express.Router()

// define the result page route
router.get('/top5', function (req, res) {
  Vote.top5().then(dataTop5 => {
    // res.send(dataTop5[0].VoterName.split(','))
    res.render('resultTop5', {dataTop5: dataTop5})
  })
})

module.exports = router
