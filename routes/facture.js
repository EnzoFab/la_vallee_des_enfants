const express = require('express');
const router = express.Router();
const modelFacture = require('../models/facture');
const modelContrat = require('../models/contrat')
const schedule = require('node-schedule');
/* --------------------------------------- ROUTES GET ----------------------------------------------------------- */
router.get('/existe', function (req, res, next) {
    let numC = req.query.numcontrat
    let annee = req.query.annee
    let mois = req.query.mois
    modelFacture.existeFacture(numC, mois, annee, function (retour) {
        console.log(retour)
        res.send(retour);
    });
});

router.get('/all/:numC', function (req, res, next) {
    let numContrat = req.params.numC
    modelFacture.getAllByIdContrat(numContrat, function (retour) {
        console.log(retour)
        res.send(retour);
    });
});

router.get('/basics/:numC', function (req, res, next) {
    let numC = req.params.numC
    modelFacture.getBasicsInfosForFacture(numC, function (retour) {
        res.send(retour);
    });
});


router.get('/infos/:numC/:annee/:mois', function (req, res, next) {
    let numC = req.params.numC
    let annee = req.params.annee
    let mois = req.params.mois
    modelFacture.getInfosFacture(numC, mois, annee, function (retour) {
        res.send(retour);
    });
});


/* --------------------------------------- ROUTES POST --------------------------------------------------------- */

router.post('/create', function (req, res, next) {
    let mois = req.body.mois
    let annee = req.body.annee
    let id_contrat = req.body.id_contrat
    console.log(mois, annee)
    modelFacture.create(id_contrat, mois, annee, function (retour) {
        console.log(retour)
        res.send(retour);
    });
});

/**
 * Lance la création automatique des factures
 */
router.post('/initFacture', function (req, res) {
    let numContrat = req.body.numContrat
    // '0 0 1 * *'
    schedule.scheduleJob('0 0 1 * *', function(){ // tous les premiers du mois a minuit
        // TODO verifier que le contrat existe et qu'il n'est pas cloturé
        modelContrat.findOne(numContrat, function (retour) {
            if (retour.erreur == null && retour.contrat.date_fin == null) {
                let d = new Date()
                let facture = {
                    mois: d.getMonth(),
                    annee: d.getFullYear(),
                    id_contrat: numContrat
                }
                modelFacture.create(facture, function (retour) {
                    console.log(retour)
                })
            } else {
                this.cancel()
            }
        })

    });
    res.send('yeye')
});

/* ---------------------------------------- ROUTES PUT ---------------------------------- */

router.put('/updateinfos ', function (req, res) {
    let facture = req.body.facture
    modelFacture.updateInfosFacture(facture, function (retour) {
        res.send(retour)
    })
});

router.put('/updateheuresmaj ', function (req, res) {
    let facture = req.body.facture
    modelFacture.updatenbHeuresMajo(facture, function (retour) {
        res.send(retour)
    })
});


module.exports = router;