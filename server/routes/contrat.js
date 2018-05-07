var express = require('express');
var router = express.Router();
var modelContrat = require('../models/contrat')

router.get('/all', function (req, res, next) {
    modelContrat.getAll(function (retour) {
        res.send(retour);
    });
});

module.exports = router;