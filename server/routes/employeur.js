var express = require('express');
var router = express.Router();
const modelEmployeur = require('../models/employeur');
const jwt = require('jsonwebtoken')


function jwtSignEmployeur(employeur) {
    // Durée du token
    const ON_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(employeur, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
}

/* router.post('/login',
   // AuthentificationControllerPolicy.login,
    AuthentificationController.loginParent); */

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
        res.send(retour)
    })
});

module.exports = router;