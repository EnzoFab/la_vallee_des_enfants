var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
var send = require('gmail-send')

/* --------------------------------------- ROUTES POST ----------------------------------------------------------- */

router.post('/send', function (req, res) {
    let destinataire = req.body.to
    let sujet = req.body.sujet
    let text = req.body.message
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "vallee.enfants@gmail.com",
            pass: "V41133enfants"
        }
    });

    var mail = {
        from: "La vallée des enfants <from@gmail.com>",
        to: destinataire,
        subject: sujet,
        text: '',
        html: text
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            res.send({erreur: error});
        }else{
            res.send({erreur: null, message: 'Mail envoyé avec succes'})
        }
        smtpTransport.close();
    });
})

router.post('/sendMail', function (req, res) {
    let destinataire = req.body.to
    let sujet = req.body.sujet
    let text = req.body.message
    let lien = req.body.link
    send({ // Overriding default parameters
        user: 'vallee.enfants@gmail.com',
        // user: credentials.user,                  // Your GMail account used to send emails
        pass: 'V41133enfants',
        // pass: credentials.pass,                  // Application-specific password
        to:   destinataire,
        // to:   credentials.user,                  // Send to yourself

        subject: sujet,              // Override value set as defaul
        text: text
    }, function (err, rslt) {
        res.send('* [example 1.2] send() callback returned: err:', err, '; res:', rslt);
    });
})

module.exports = router;