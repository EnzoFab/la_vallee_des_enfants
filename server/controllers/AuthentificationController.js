let Parent = require('../models/parent')

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
                parent: parentJson
            })
        } catch(err) {
            res.status(500).send({
                error: 'Une erreur est apparue lors du login'
            })
        }
    }
}