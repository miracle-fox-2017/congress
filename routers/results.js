const express = require ('express')
const router = express.Router()
// const ResultDB = require('../models/results')
// let result = new ResultDB("../db/congress_poll_results.db")
const Result = require('../models/results')

router.get('/top5',(req,res)=>{
    Result.top5(rows=>{
        // res.send('abcd')
        res.render('resultstop5',{rowsTop5:rows})
    })
})

module.exports = router;