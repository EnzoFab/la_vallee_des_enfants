var express = require('express');
var router = express.Router();
const modelParent = require('../models/parent');
const jwt = require('jsonwebtoken')

// Express middlewares
const AuthentificationController = require('../controllers/AuthentificationController')
const AuthentificationControllerPolicy = require('../policies/AuthentificationControllerPolicy')

function jwtSignParent(parent) {
    // Durée du token
    const ON_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(parent, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
}

/* router.post('/login',
   // AuthentificationControllerPolicy.login,
    AuthentificationController.loginParent); */

router.post('/login', function (req, res, next) {
    var login = req.body.login;
    var pwd =  req.body.mdp;
    console.log(req.body.login)
    modelParent.match(login, pwd, function (retour) {
        if(retour.erreur == null){
            retour.token = jwtSignParent(retour.parent)
        }
        res.send(retour)
    })
});

module.exports = router;