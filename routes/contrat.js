var express = require('express');
var router = express.Router();
var modelContrat = require('../models/contrat')


/* --------------------------------------- ROUTES GET ----------------------------------------------------------- */
router.get('/all', function (req, res, next) {
    modelContrat.getAll(function (retour) {
        res.send(retour);
    });
});

router.get('/getAllById/:numC', function (req, res, next) {
    console.log('helloroute')
    console.log(req.params.numC)
    modelContrat.getAllById(req.params.numC, function (retour) {
        console.log(retour);
        res.send(retour)
    })
});

router.get('/getTuteursById/:numC', function (req, res, next) {
    console.log('helloroute')
    console.log(req.params.numC)
    modelContrat.getTuteursById(req.params.numC, function (retour) {
        console.log(retour);
        res.send(retour)
    })
});

/* --------------------------------------- ROUTES POST --------------------------------------------------------- */
/* router.post('/create2', function (req, res, next) {
    var contrat = req.body.contrat
    modelContrat.create2(contrat, function (retour) {
        console.log(retour)
        res.send(retour)
    })
}); */

// Création du contrat
router.post('/create', function (req, res, next) {
    //var contrat = req.body.contrat
    //console.log('drtyjb ' + contrat.numContrat)
    modelContrat.create(req.body.numContrat, req.body.numAssMat, function (retour) {
        console.log(retour)
        res.send(retour)
    })
});


/* ------------------------------------------ ROUTES PUT ------------------------------------------------------ */

// Ajout/Modification des données de la SECTION ENFANT
router.put('/enfant/:n', function (req, res) {
    let id_contrat = req.params.n
    let id_enfant = req.body.id_enfant
    modelContrat.sectionEnfantCreate(id_contrat, id_enfant, function (retour) {
        res.send(retour)
    })
});

// Ajout/Modification des données de la SECTION EMPLOYEUR
router.put('/employeur/:n', function (req, res) {
    let id_contrat = req.params.n
    let id_emp = req.body.id_employeur
    let nb_conges = req.body.nb_semaines_conges_parents
    modelContrat.sectionEmployeurCreate(id_contrat, nb_conges, id_emp, function (retour) {
        res.send(retour)
    })
});

// Ajout/Modification des données de la SECTION INFOS GENERALES
router.put('/infosGenerales/:n', function (req, res) {
    let id_contrat = req.params.n
    let id_type = req.body.id_type_contrat
    let id_modePaie = req.body.id_mode_de_paiement
    let dateDeb = req.body.date_debut
    let dateDebAdapt = req.body.date_deb_periode_adaptation
    let dateFinAdapt = req.body.date_fin_periode_adaptation
    let jourPaie = req.body.jour_paiement
    console.log('========== ', id_contrat, ' ', id_modePaie, ' ', dateDeb, ' ', dateDebAdapt, ' ', dateFinAdapt, ' ', jourPaie);
    modelContrat.sectionInfosGeneralesCreate(id_contrat, id_type, id_modePaie, dateDeb, dateDebAdapt, dateFinAdapt, jourPaie, function (retour) {
        res.send(retour)
    })
});

// Ajout/Modification des données de la SECTION PRESENCES
router.put('/presence/:n', function (req, res) {
    let id_contrat = req.params.n
    let nb_heures = req.body.nb_heures_semaine
    modelContrat.sectionHeuresHebdoCreate(id_contrat, nb_heures, function (retour) {
        res.send(retour)
    })
});

// Ajout/Modification des données de la SECTION TARIFS
router.put('/tarifs/:n', function (req, res) {
    let id_contrat = req.params.n
    let tarif = req.body.tarif
    let tauxmaj = req.body.taux_majore
    modelContrat.sectionTarifscreate(id_contrat, tarif, tauxmaj, function (retour) {
        res.send(retour)
    })
});

module.exports = router;