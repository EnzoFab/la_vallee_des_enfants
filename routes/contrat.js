var express = require('express');
var router = express.Router();
var modelContrat = require('../models/contrat')

router.get('/all', function (req, res, next) {
    modelContrat.getAll(function (retour) {
        res.send(retour);
    });
});

router.post('/create2', function (req, res, next) {
    var contrat = req.body.contrat
    modelContrat.create2(contrat, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

router.post('/create', function (req, res, next) {
    //var contrat = req.body.contrat
    //console.log('drtyjb ' + contrat.numContrat)
    modelContrat.create(req.body.numContrat, req.body.numAssMat, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

router.get('/getAllById/:numC', function (req, res, next) {
    console.log('helloroute')
    console.log(req.params.numC)
    modelContrat.getAllById(req.params.numC, function (retour) {
        console.log(retour);
        res.send(retour)
    })
});

router.get('/getTuteursById/:numC', function (req, res, next) {
    console.log('helloroute')
    console.log(req.params.numC)
    modelContrat.getTuteursById(req.params.numC, function (retour) {
        console.log(retour);
        res.send(retour)
    })
});

module.exports = router;