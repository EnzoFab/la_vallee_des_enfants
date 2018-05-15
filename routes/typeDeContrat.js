var express = require('express');
var router = express.Router();
var modelTypeContrat = require('../models/typeContrat')

/* ------------------------------------------ ROUTES GET ------------------------------------------------------ */

router.get('/all', function (req, res, next) {
    modelTypeContrat.getAll(function (retour) {
        res.send(retour);
    });
});

module.exports = router;