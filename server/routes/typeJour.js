var express = require('express');
var router = express.Router();
var modelTypeJour = require('../models/typeJour')

router.get('/all', function (req, res, next) {
    modelTypeJour.getAll(function (retour) {
        res.send(retour);
    });
});

module.exports = router;