var express = require('express');
var router = express.Router();
var modelPaiement = require('../models/paiment')

router.get('/all', function (req, res, next) {
    modelPaiement.getAll(function (retour) {
        res.send(retour);
    });
});

module.exports = router;