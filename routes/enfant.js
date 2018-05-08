var express = require('express');
var router = express.Router();
var modelEnfant= require('../models/enfant')

router.get('/all', function (req, res, next) {
    modelEnfant.getAll(function (retour) {
        res.send(retour);
    });
});

router.post('/create', function (req, res, next) {
    var enfant = req.body.enfant
    modelEnfant.create(enfant, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

module.exports = router;