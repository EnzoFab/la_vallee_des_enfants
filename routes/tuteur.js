var express = require('express');
var router = express.Router();
var modelTuteur = require('../models/tuteur')

/* ------------------------------------------ ROUTES GET ------------------------------------------------------ */

router.get('/tuteursEnfants', function (req, res, next) {
    modelTuteur.getTuteursEnfants(function (retour) {
        console.log('============', retour)
        res.send(retour);
    });
});

router.get('/:n', function (req, res) {
    let numContrat = req.params.n;
    modelTuteur.getTuteursById(numContrat, function (retour) {
        res.send(retour)
    });
});
/* ------------------------------------------ ROUTES POST ------------------------------------------------------ */

router.post('/create', function (req, res, next) {
    var tuteur = req.body.tuteur
    console.log()
    modelTuteur.create(tuteur, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

// Ajout/Modification des données de la SECTION TUTEUR DE L'ENFANT
router.post('/lierEnfant', function (req, res) {
    let id_enfant = req.body.id_enfant
    let id_tuteur = req.body.id_tuteur
    modelTuteur.sectionEnfantTuteur(id_enfant, id_tuteur, function (retour) {
        res.send(retour)
    })
});

/* ------------------------------------------ ROUTES PUT ------------------------------------------------------ */

// Update du tuteur
router.put('/:n/update', function (req, res) {
    let num_tuteur = req.params.n
    let tuteur = req.body.tuteur
    modelTuteur.update(num_tuteur, tuteur, function (retour) {
        res.send(retour)
    })
});

// Modification des données d'un parent
router.put('/modifTuteur', function (req, res) {
    let tuteur = req.body.tuteur
    console.log(tuteur)
    modelTuteur.updateInfosTuteur(tuteur, function (retour) {
        res.send(retour)
    })
});

module.exports = router;