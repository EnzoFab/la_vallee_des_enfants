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

// update enfants
router.put('/:n', function (req, res) {
    
});

router.delete('/:n', function (req ,res) {
    
})

module.exports = router;