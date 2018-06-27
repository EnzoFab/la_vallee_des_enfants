const express = require('express');
const router = express.Router();
const fs = require('fs');
const pdf = require('html-pdf');

router.post('/create', function (req, res) {
    let pdfName = 'public/pdf/' + req.body.nom + '.pdf';
    pdf.create(req.body.html).toFile(pdfName, function (err, r) {
        res.send({erreur: err, resultat: r});
    })
});
module.exports = router;