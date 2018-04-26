const Joi = require('joi')

module.exports = {
    login(req, res, next) {
        const schema = {
            // On va vérifier grâce au framework Joi que l'email est bien un email
            email: Joi.string().email(),
            // On va vérifier que le mdp ait les bons caractère (min de a à z, maj de A à Z et chiffre de 0 à 9) et la bonne longueur (8 à 32)
            mdp: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }

        const {error, value} = Joi.validate(req.body, schema)
        if (error) {
            switch(error.details[0].context.key) { // retourne la clé d'où provient l'erreur (email ou mdp)
                case 'email':
                    res.status(400).send({
                        error: 'Vous devez fournir une adresse email valide'
                    })
                    break
                case 'mdp':
                    res.status(400).send({
                        error: 'Le mot de passe fourni ne respecte pas les règles suivantes : ' +
                        '1. Il doit seulement contenir les caractères suivants : majuscule, minuscule, chiffres ' +
                        '2. Il doit faire au moins 8 caractères de longueur et ne doit pas être plus grand que 32 caractères'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Mauvaises informations de connexion'
                    })
            }
        } else {
            next()
        }

    }
}