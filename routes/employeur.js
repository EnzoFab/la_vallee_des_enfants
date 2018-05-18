var express = require('express');
var router = express.Router();
const modelEmployeur = require('../models/employeur');
const jwt = require('jsonwebtoken')


function jwtSignEmployeur(employeur) {
    // Durée du token
    const ON_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(employeur, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
}

/* ------------------------------------------ ROUTES GET ------------------------------------------------------ */

router.get('/employeursEnfants', function (req, res, next) {
    modelEmployeur.getEmployeursEnfants(function (retour) {
        console.log('============', retour)
        res.send(retour);
    });
});

/* ------------------------------------------ ROUTES POST ------------------------------------------------------ */

router.post('/login', function (req, res, next) {
    var login = req.body.login;
    var pwd =  req.body.mdp;
    modelEmployeur.match(login, pwd, function (retour) {
        if(retour.erreur == null){
            retour.token = jwtSignEmployeur(retour.employeur)
        }
        res.send(retour)
    })
});

router.post('/create', function (req, res, next) {
    var employeur = req.body.employeur
    modelEmployeur.create(employeur, function (retour) {
        console.log('=======', retour)
        res.send(retour)
    })
});

/* ------------------------------------------ ROUTES PUT ------------------------------------------------------ */

// Update de l'employeur
router.put('/:n/update', function (req, res) {
    let num_employeur = req.params.n
    let employeur = req.body.employeur
    modelEmployeur.update(num_employeur, employeur, function (retour) {
        res.send(retour)
    })
});

// Modification des données d'un employeur
router.put('/modifEmp', function (req, res) {
    let employeur = req.body.employeur
    modelEmployeur.updateInfosEmp(employeur, function (retour) {
        res.send(retour)
    })
});

// Update du mot de passe
router.put('/modifMdp', function (req, res) {
    let num_employeur = req.body.id_employeur
    let ancienMdp = req.body.ancienpwd
    let nouveauMdp = req.body.nouveaupwd
    let reecrireMdp = req.body.reecrirepwd
    modelEmployeur.updateMdp(num_employeur, ancienMdp, nouveauMdp, reecrireMdp, function (retour) {
        res.send(retour)
    })
});


module.exports = router;