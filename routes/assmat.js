var express = require('express');
var router = express.Router();
const modelAssMat = require('../models/assMat');
const jwt = require('jsonwebtoken')

function jwtSignAssMat(assmat) {
    // Durée du token
    const ON_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(assmat, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
}

/* --------------------------------------- ROUTES GET ----------------------------------------------------------- */

router.get('/all', function (req, res, next) {
    modelAssMat.getAll(function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

router.get('/:n', function (req, res) {
    modelAssMat.findOne(req.params.n, function (retour) {
        res.send(retour)
    })
})

/* --------------------------------------- ROUTES POST --------------------------------------------------------- */

router.post('/register', function (req, res, next) {
    var assMat = req.body.assMat
    modelAssMat.create(assMat, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});

router.post('/login', function (req, res, next) {
    var login = req.body.login;
    var pwd =  req.body.mdp;
    modelAssMat.match(login, pwd, function (retour) {
        if(retour.erreur == null){
            retour.token = jwtSignAssMat(retour.assmat)
        }
        console.log(retour)
        res.send(retour)
    })
});

/* ------------------------------------------ ROUTES PUT ------------------------------------------------------ */

// Update du mot de passe
router.put('/modifMdp', function (req, res) {
    let num_assmat = req.body.id_am
    let ancienMdp = req.body.ancienpwd
    let nouveauMdp = req.body.nouveaupwd
    let reecrireMdp = req.body.reecrirepwd
    modelAssMat.updateMdp(num_assmat, ancienMdp, nouveauMdp, reecrireMdp, function (retour) {
        res.send(retour)
    })
});

module.exports = router;