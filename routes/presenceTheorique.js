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
    console.log('jftvvevj ' + day)
    modelPresenceTheorique.getAllChildrenOfTheDay(day, function (retour) {
        res.send(retour);
    });
});

router.post('/create', function (req, res, next) {
    var presenceTheorique = req.body.presenceTheorique
    modelPresenceTheorique.create(presenceTheorique, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

// Update de la présence théorique
router.put('/:n/update', function (req, res) {
    let num_presence = req.params.n
    let presenceTheorique = req.body.presenceTheorique
    modelPresenceTheorique.update(num_presence, presenceTheorique, function (retour) {
        res.send(retour)
    })
});

module.exports = router;