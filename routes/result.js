const express = require('express')
const router = express.Router()
const Vote = require('./../models/votes')

router.get('/analyzed', function (req, res) {
    Vote.getDataKecurangan().then((rowsCurang) => {
        res.render('curang', { dataCurang: rowsCurang })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/top5', function (req, res) {
    Vote.getTopFive().then((rowsTopFive) => {
        res.render('top-five', { dataFive: rowsTopFive })
    }).catch((reason) => {
        res.send(reason)
    })
})

module.exports = router