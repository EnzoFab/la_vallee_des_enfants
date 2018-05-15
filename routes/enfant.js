var express = require('express');
var router = express.Router();
var modelEnfant= require('../models/enfant')

/* ------------------------------------------ ROUTES GET ------------------------------------------------------ */

router.get('/all', function (req, res, next) {
    modelEnfant.getAll(function (retour) {
        res.send(retour);
    });
});

router.get('/', function (req, res) {
    let nom = req.query.nom;
    let prenom = req.query.prenom;
    let dateNaissance = req.query.date;
    let sexe = req.query.sexe;
});

router.get('/:n', function (req, res) {
    let numContrat = req.params.n // le numero du contrat
    modelEnfant.findOne(numContrat, function (retour) {
        console.log(retour);
        res.send(retour);
    })
});
/* ------------------------------------------ ROUTES POST ------------------------------------------------------ */

router.post('/create', function (req, res, next) {
    var enfant = req.body.enfant
    modelEnfant.create(enfant, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});


/* ------------------------------------------ ROUTES PUT ------------------------------------------------------ */

// Update de l'enfant
router.put('/:n/update', function (req, res) {
    let num_enfant = req.params.n
    let enfant = req.body.enfant
    modelEnfant.update(num_enfant, enfant, function (retour) {
        res.send(retour)
    })
});

module.exports = router;