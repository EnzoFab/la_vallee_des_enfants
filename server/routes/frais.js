var express = require('express');
var router = express.Router();
var modelFrais = require('../models/frais')

router.get('/indemnites', function(req, res, next) {
    modelFrais.getIndemnites(function (retour) {
        res.send(retour)
    });
});

router.get('/gouter', function(req, res, next) {
    modelFrais.getGouter(function (retour) {
        res.send(retour)
    });
});

module.exports = router;