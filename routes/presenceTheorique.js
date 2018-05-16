var express = require('express');
var router = express.Router();
var modelPresenceTheorique = require('../models/presenceTheorique')

router.get('/all', function (req, res, next) {
    modelPresenceTheorique.getAll(function (retour) {
        res.send(retour);
    });
});

router.get('/:n/allchildren', function (req, res, next) {
    let day = req.params.n
    modelPresenceTheorique.getAllChildrenOfTheDay(day, function (retour) {
        res.send(retour);
    });
});

module.exports = router;