const express = require('express')
const router = express.Router()
const Voter = require('./../models/voters')

router.get('/', function (req, res) {
    res.render('voter', { dataVoters: '', message: '' })
})

router.post('/', function (req, res) {
    if (req.body.choice == '') {
        res.render('voter', { dataVoters: '', message: "Please fill the blank" })
    } else if (req.body.choice == 'name') {
        Voter.findDatabyName(req.body.name).then((dataVoters) => {
            res.render('voter', { dataVoters: dataVoters, message: '' })
        }).catch((reason) => {
            res.send(reason)
        })
    } else if (req.body.choice == 'gender') {
        Voter.findDatabyGender(req.body.gender).then((dataVoters) => {
            res.render('voter', { dataVoters: dataVoters, message: '' })
        }).catch((reason) => {
            res.send(reason)
        })
    } else if (req.body.choice == 'age') {

        if (req.body.minAge == '') {
            res.render('voter', { dataVoters: '', message: 'Range Start Age must be filled' })
        } else if (req.body.maxAge == '') {
            Voter.findDatabyAge(req.body.minAge, req.body.minAge).then((dataVoters) => {
                res.render('voter', { dataVoters: dataVoters, message: '' })
            }).catch((reason) => {
                res.send(reason)
            })
        } else if (req.body.maxAge < req.body.minAge) {
            res.render('voter', { dataVoters: '', message: 'Maximum age must be more than minimum age' })
        } else {
            Voter.findDatabyAge(req.body.minAge, req.body.maxAge).then((dataVoters) => {
                res.render('voter', { dataVoters: dataVoters, message: '' })
            }).catch((reason) => {
                res.send(reason)
            })
        }

    }
})


module.exports = router