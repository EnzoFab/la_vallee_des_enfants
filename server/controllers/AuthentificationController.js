const jwt = require('jsonwebtoken')
const conf = require('../config/db')
let client = require('../config/db')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const modelParent = require('../models/employeur');


function jwtSignParent(parent) {
    // Durée du token
    const ON_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(parent, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
}

function jwtSignAssMat(assmat) {
    // Durée du token
    const ON_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(assmat, process.env.JWT_SECRET, {expiresIn: ON_WEEK})
}


    loginAssMat(req, res) {
        var login = req.body.login
        var mdp = req.body.mdp
        console.log('OKKKKK')
        client.query('SELECT * FROM public."AssMat" WHERE login= $1', [login], (err, result) => {
            console.log('LE RESULTAAAAAT EST', result)
            const assMat = result
            if (err) {
                console.log('Erreur', err)
                res.status(403).send({
                    error: 'Les informations sont incorrectes'
                })
            } else {
                if (result.length != 0) {
                    if (result.rows[0].mot_de_passe_am == mdp) {
                        const assMatJson = JSON.stringify(assMat)
                        const assMatDef = JSON.parse(assMatJson) // Je met en objet car la fonction jwtSignParent n'accepte que des objets
                        res.send({
                            assMat: assMatJson,
                            // On assigne le token
                            token: jwtSignAssMat(assMatDef)
                        })
                    }
                    else {
                        res.status(204).send({
                            error: 'Le mail et le mot de passe ne corresponent pas'
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