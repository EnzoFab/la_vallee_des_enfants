var express = require('express');
var router = express.Router();
var modelContrat = require('../models/contrat')

router.get('/all', function (req, res, next) {
    modelContrat.getAll(function (retour) {
        res.send(retour);
    });
});

router.post('/create', function (req, res, next) {
    var contrat = req.body.contrat
    modelContrat.create(contrat, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

module.exports = router;