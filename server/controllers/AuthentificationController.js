let Parent = require('../models/parent')
const jwt = require('jsonwebtoken')
const conf = require('../config/db')
let client = require('../config/db')

function jwtSignParent(parent) {
    // Durée du token
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(parent, conf.authentification.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    login(req, res) {
        var email = req.body.email
        var mdp = req.body.mdp
        client.query('SELECT * FROM public."Parent" P, public."Disposer" D, public."Compte" C WHERE P.id_parent=D.id_parent AND D.id_compte=C.id_compte AND P.mail= $1', [email], (err, result) => {
            console.log('LE RESULTAT ESSSSSST', result)
            if (err) {
                console.log('Erreur', err)
                res.status(403).send({
                    error: 'Les informations sont incorrectes'
                })
            } else {
                if (result != null) {
                    if ([0].mot_de_passe == mdp) {
                        const parentJson = parent.toJSON()
                        res.send({
                            parent: parentJson,
                            // On assigne le token
                            token: jwtSignParent(parentJson)
                        })
                    }
                    else {
                        res.status(204).send({
                            error: 'Email and mdp doenst match'
                        })
                    }
                }
                else {
                    res.status(500).send({
                        error: 'Une erreur est apparue lors du login'
                    })
                }
            }
        })
    }
}