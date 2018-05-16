var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
var send = require('gmail-send')


/* nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "vallee.enfants@gmail.com", // generated ethereal user
        pass: "V41133enfants" // generated ethereal password
    }
}); */
   /* nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "vallee.enfants@gmail.com",
        pass: "V41133enfants"
    }
});*/

router.post('/send', function (req, res) {
    let destinataire = req.body.to
    let sujet = req.body.sujet
    let text = req.body.message
    let lien = req.body.link
    console.log(sujet, text, lien, destinataire)
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
        subject: text,
        text: lien,
        html: `<a href='${lien}'>Page de connection</a>`
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