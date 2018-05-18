var express = require('express');
var router = express.Router();
var modelPresenceReelle = require('../models/presenceReelle');

router.post('/create', function (req, res, next) {
    let preelle = req.body.presence
    preelle.datepresencereelle = new Date(preelle.datepresencereelle)
    modelPresenceReelle.create(preelle, function (retour) {
        res.send(retour);
    });
});

router.post('/createPresExc', function (req, res, next) {
    let preelle = req.body.presence
    console.log('azertyuvhbgdtq     ' + preelle.id)
    preelle.datepresencereelle = new Date(preelle.datepresencereelle)
    modelPresenceReelle.createPresExc(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majHeureArrivee', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateHeureArrivee(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majHeureDepart', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateHeureDepart(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majGouter', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateGouter(preelle, function (retour) {
        res.send(retour);
    });
});

router.put('/majFactureAssociee', function (req, res, next) {
    let preelle = req.body.presence
    modelPresenceReelle.updateFactureAssociee(preelle, function (retour) {
        res.send(retour);
    });
});

router.get('/existe', function (req, res, next) {
    let date = new Date (req.query.date.substring(0,15))
    let enfant = parseInt(req.query.enfant)
    modelPresenceReelle.existePresenceReelle(date, enfant, function (retour) {
        res.send(retour);
    });
});

router.post('/createAbs', function (req, res, next) {
    let abs = req.body.absence
    abs.datepresencereelle = new Date(abs.datepresencereelle)
    modelPresenceReelle.createAbs(abs, function (retour) {
        res.send(retour);
    });
});

router.put('/majAbs', function (req, res, next) {
    let abs = req.body.absence
    console.log(abs)
    modelPresenceReelle.updateAbs(abs, function (retour) {
        res.send(retour);
    });
});

module.exports = router;