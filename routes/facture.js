var express = require('express');
var router = express.Router();
var modelFacture = require('../models/facture')



/* ---------------------------------------- ROUTES GET ---------------------------------- */
router.get('/basics/:numC', function (req, res, next) {
    let numC = req.params.numC
    modelFacture.getBasicsInfosForFacture(numC, function (retour) {
        res.send(retour);
    });
});

router.get('/existe/:numC/:annee/:mois', function (req, res, next) {
    let numC = req.params.numC
    let annee = req.params.annee
    let mois = req.params.mois
    modelFacture.existeFacture(numC, mois, annee, function (retour) {
        res.send(retour);
    });
});

router.get('/infos/:numC/:annee/:mois', function (req, res, next) {
    let numC = req.params.numC
    let annee = req.params.annee
    let mois = req.params.mois
    modelFacture.getInfosFacture(numC, mois, annee, function (retour) {
        res.send(retour);
    });
});

/* ---------------------------------------- ROUTES POST ---------------------------------- */

router.post('/create', function (req, res, next) {
    modelFacture.create(function (retour) {
        res.send(retour);
    });
});

/* ---------------------------------------- ROUTES PUT ---------------------------------- */

router.put('/updateinfos ', function (req, res) {
    let facture = req.body.facture
    modelFacture.updateInfosFacture(facture, function (retour) {
        res.send(retour)
    })
});

router.put('/updateheuresmaj ', function (req, res) {
    let facture = req.body.facture
    modelFacture.updatenbHeuresMajo(facture, function (retour) {
        res.send(retour)
    })
});


module.exports = router;