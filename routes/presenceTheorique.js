var express = require('express');
var router = express.Router();
var modelPresenceTheorique = require('../models/presenceTheorique')
const jour = ['Dimanche', 'Lundi','Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

/* ------------------------------------------ ROUTES GET ------------------------------------------------------ */
router.get('/enfantDuJour', function (req, res) {
    let dateDujour = new Date();
    modelPresenceTheorique.getEnfantsDuJour(/*jour[dateDujour.getDay()]*/ 'Mardi', function (retour) {
        console.log(retour)
        res.send(retour);
    })
});

router.get('/enfantNonPresentDuJour', function (req, res) {
    let dateDujour = new Date();
    modelPresenceTheorique.getEnfantsNonPresendDuJour(/*jour[dateDujour.getDay()]*/ 'Mardi', function (retour) {
        console.log(retour)
        res.send(retour);
    })
});

router.get('/all', function (req, res, next) {
    modelPresenceTheorique.getAll(function (retour) {
        res.send(retour);
    });
});

router.get('/all/:numC', function (req, res, next) {
    let numC = req.params.numC
    modelPresenceTheorique.getAllPresencesTheoriquesByIdContrat(numC, function (retour) {
        res.send(retour);
    });
});

router.get('/:n/allchildrennp', function (req, res, next) {
    let day = req.params.n
    modelPresenceTheorique.getChildrenNonPresentsOfTheDay(day, function (retour) {
        res.send(retour);
    });
});

router.get('/:n/allchildren', function (req, res, next) {
    let day = req.params.n
    modelPresenceTheorique.getAllChildrenOfTheDay(day, function (retour) {
        res.send(retour);
    });
});


router.get('/:e/:n', function (req, res, next) {
    let enfant = req.params.e
    let day = req.params.n
    modelPresenceTheorique.recupIdTheoDuJour(day, enfant, function (retour) {
        res.send(retour);
    });
});

/* ------------------------------------------ ROUTES POST ------------------------------------------------------ */

router.post('/create', function (req, res, next) {
    var presenceTheorique = req.body.presenceTheorique
    modelPresenceTheorique.create(presenceTheorique, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

/* ------------------------------------------ ROUTES PUT ------------------------------------------------------ */

// Update de la présence théorique
router.put('/:n/update', function (req, res) {
    let num_presence = req.params.n
    let presenceTheorique = req.body.presenceTheorique
    modelPresenceTheorique.update(num_presence, presenceTheorique, function (retour) {
        res.send(retour)
    })
});

module.exports = router;