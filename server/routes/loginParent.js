var express = require('express');
var router = express.Router();
let Parent = require('../models/parent')

router.post('/', (request, response, next) => {
    if(req.body.mdp && req.body.mail) {
        req.body.mdp = crypt.encrypt(request.body.mdp);//crypter le mot de passe avant de l'envoyer
        Parent.create(request.body, function() {
            request.flash('success', "Vous êtes bien connecté")
            response.redirect('/')
        })
    } else {
        res.status(422).send({
            status: 422,
            data: {},
            message: "Form invalids data"
        })
    }
})

module.exports = router;
