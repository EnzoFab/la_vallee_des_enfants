var express = require('express');
var router = express.Router();
var modelTypeTuteur = require('../models/typeTuteursModel')

/* ------------------------------------------ ROUTES GET ------------------------------------------------------ */

router.get('/all', function (req, res, next) {
    modelTypeTuteur.getAll(function (retour) {
        res.send(retour);
    });
});

module.exports = router;