const express = require('express')
const router = express.Router()
const Result = require('../models/result');

router.get('/top5', (req, res) => {
  Result.find5((err, data) => {
    res.render('top5', {data: data})
  })
})

router.get('/analyzed', (req, res) => {
  Result.analyzed((err, data) => {
    res.render('curang', {data: data})
  })
})

module.exports = router
