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
        service: 'gmail',//process.env.SERVICE_MAIL,
        auth: {
            user: 'vallee.enfants@gmail.com',// process.env.USER_MAIL,
            pass: 'V41133enfants' //process.env.USER_MAIL_PWD
        }
    });

    var mail = {
        from: "La vallée des enfants <from@gmail.com>",
        to: destinataire,
        subject: sujet,
        text: '',
        html: `<div style="margin: auto; text-align: center"><img src="cid:unique@kreata.ee"/><p>${text}</p></div>`,
        attachments: [{
            filename: 'image.png',
            path: 'public/image/logo.png',
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]
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