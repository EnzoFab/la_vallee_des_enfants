var express = require('express');
var router = express.Router();
const fs = require('fs');

router.post('/image', function (req, res) {
    if( !req.files) {
        return res.status(400).send({erreur: 'Aucun fichier envoyé'});
    }else {
        fs.readdir('./public/images', (err, files) => {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            if (err) {
                res.statut(500).send({erreur: err, msg: 'damn'})
            } else {
                console.log(req.files)
                let img = req.files.image;
                let pathImg = 'images/' + files.length + img.name  // on rajoute l'image le numero d'image qu'il y avait avant elle
                // Use the mv() method to place the file somewhere on your server
               img.mv('./public/'+pathImg, function(err) {
                    if (err)
                        return res.status(500).send({erreur: err, msg: 'y a erreur'});

                    res.send({
                        erreur: null,
                        image: 'static/'+pathImg
                    });
                });
            }
        });
    }



})


module.exports = router;