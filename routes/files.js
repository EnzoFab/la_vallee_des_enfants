var express = require('express');
var router = express.Router();
const fs = require('fs');
var cloudinary = require('cloudinary'); // pour stocker des images en lignes
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

cloudinary.config({
    cloud_name: 'lavalleedesenfants',
    api_key: '337826874111464',
    api_secret: 'KUugFmibndrnnhONBLvCZddiwM8'
});




/* ------------------------------------------ ROUTES POST ------------------------------------------------------ */

router.post('/image', function (req, res) {
    if (req.files === undefined) {
        return res.status(400).send({erreur: 'Aucun fichier envoyé'});
    } else {
        console.log(req.files.image)
        let img = req.files.image;
        cloudinary.v2.uploader.upload_stream(
            {ressource_type: 'raw', width: 400, height: 400, crop: "imagga_scale" },
            function(err, result) {
            retour = {
                erreur: null,
            }
            if (err) {
                retour.erreur = err
            } else {
                retour.resultats = result
            }
            res.send(retour)
        }).end(img.data)

        /* let pathImg = 'images/' + img.name  // on rajoute l'image le numero d'image qu'il y avait avant elle
        // Use the mv() method to place the file somewhere on your server
        img.mv('.public/'+pathImg, function(err) {
            if (err)
                return res.send({erreur: err, msg: 'y a erreur'});

            res.send({
                erreur: null,
                image: 'static/'+pathImg
            });
        }); */
        /* fs.readdir('./public/images', (err, files) => {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            if (err) {
                res.statut(500).send({erreur: err, msg: 'damn'})
            } else {

            }
        }); */
    }

})


/* -----------------------------------------ROUTE DELETE -------------------------------------------------------- */
router.delete('/image/:publicId', function (req, res) {
    let publicId = req.params.publicId
    console.log("====Public:", publicId)
    cloudinary.v2.uploader.destroy(publicId, function(error, result){
        let retour = {erreur: null}
        if(error){
            console.log('ERREYR', error)
            retour.erreur = error
        } else {
            retour.resultats = result
        }
        res.send(retour)
    })
})

module.exports = router;