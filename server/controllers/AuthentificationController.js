let Parent = require('../models/parent')
const jwt = require('jsonwebtoken')
const conf = require('../config/db')

function jwtSignParent(parent) {
    // Durée du token
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(parent, conf.authentification.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async login (req, res) {
        try {
            const {email, mdp} = req.body
            const parent = await Parent.findOne({
                where: {
                    email: email
                }
            })
            if(!parent) {
                res.status(403).send({
                    error: 'Les informations sont incorrectes'
                })
            }
            const isMdpValide = mdp === parent.mot_de_passe
            if(!isMdpValide) {
                return res.status(403).send({
                    error: 'Les informations sont incorrectes'
                })
            }
            const parentJson = parent.toJSON()
            res.send({
                parent: parentJson,
                // On assigne le token
                token: jwtSignParent(parentJson)
            })
        } catch(err) {
            res.status(500).send({
                error: 'Une erreur est apparue lors du login'
            })
        }
    }
}