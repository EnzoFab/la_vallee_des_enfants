var express = require('express');
var router = express.Router();
var modelFacture = require('../models/facture')

/* --------------------------------------- ROUTES GET ----------------------------------------------------------- */

router.get('/all/:numC', function (req, res, next) {
    let numContrat = req.params.numC
    modelFacture.getAllByIdContrat(numContrat, function (retour) {
        res.send(retour);
    });
});

router.get('/basics/:numC', function (req, res, next) {
    let numC = req.params.numC
    modelFacture.getBasicsInfosForFacture(numC, function (retour) {
        res.send(retour);
    });
});

/* --------------------------------------- ROUTES POST --------------------------------------------------------- */

router.post('/create', function (req, res, next) {
    modelFacture.create(function (retour) {
        res.send(retour);
    });
});

module.exports = router;