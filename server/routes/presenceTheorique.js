var express = require('express');
var router = express.Router();
var modelPresenceTheorique = require('../models/typeContrat')

router.get('/all', function (req, res, next) {
    modelPresenceTheorique.getAll(function (retour) {
        res.send(retour);
    });
});

module.exports = router;