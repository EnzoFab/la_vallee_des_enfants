let db = require('../config/db');
let helper = require('../helpers/helper');

let Contrat = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.contrat',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        console.log(1)
                        array.push({
                            id: rslt.rows[i].id_contrat,
                            dateDebut: rslt.rows[i].date_debut,
                            nbSemainesCongesParent: rslt.rows[i].nb_semaines_conges_parents,
                            tarif: rslt.rows[i].tarif,
                            nbHeuresSemaine: rslt.rows[i].nb_heures_semaine,
                            taux: rslt.rows[i].taux_majore,
                            dateDebAdapt: rslt.rows[i].date_deb_periode_adaptation,
                            dateFinAdapt: rslt.rows[i].date_fin_periode_adaptation,
                            jourPaiement: rslt.rows[i].jour_paiement
                        });
                        console.log('array', array)
                    }
                    retour.contrats = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    getAllById: function (numeroContrat, callback) {
        db.query(
            'SELECT * ' +
            'FROM public.contrat as co, public.enfant as en, public.employeur as em, public.modedepaiement as mp,' +
            ' public.assmat as am, public.typecontrat as tc ' +
            'WHERE co.id_contrat = $1 AND co.id_enfant = en.id_enfant AND co.id_type_contrat = tc.id_type ' +
            'AND co.id_mode_paiement = mp.id_mode AND co.id_employeur = em.id_employeur AND co.id_am = am.id_am;',
            [numeroContrat],
            function (err, rslt){
                console.log('hello1')
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrat');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    console.log('hello2')
                    retour.type_contrat = rslt.rows[0].nom_type,
                    retour.date_deb_periode_adaptation = rslt.rows[0].date_deb_periode_adaptation,
                    retour.date_fin_periode_adaptation = rslt.rows[0].date_fin_periode_adaptation,
                    retour.modepaiements = rslt.rows[0].nom_mode,
                    retour.date_debut_contrat = rslt.rows[0].date_debut_contrat
                    retour.nom_enfant = rslt.rows[0].nom_enfant,
                    retour.prenom_enfant = rslt.rows[0].prenom_enfant,
                    retour.date_naissance_enfant = rslt.rows[0].date_naissance_enfant,
                    retour.sexe = rslt.rows[0].sexe,
                    retour.nom_usage_am = rslt.rows[0].nom_usage_am,
                    retour.prenom_am = rslt.rows[0].prenom_am,
                    retour.nom_naissance_am = rslt.rows[0].nom_naissance_am,
                    retour.date_naissance_am = rslt.rows[0].date_naissance_am,
                    retour.ville_naissance_am = rslt.rows[0].ville_naissance_am,
                    retour.tel_am = rslt.rows[0].tel_am,
                    retour.numero_ss = rslt.rows[0].numero_ss,
                    retour.date_agrement = rslt.rows[0].date_agrement,
                    retour.reference_agrement = rslt.rows[0].reference_agrement,
                    retour.assurance_resp_civile = rslt.rows[0].assurance_resp_civile,
                    retour.num_police = rslt.rows[0].num_police,
                    retour.nb_semaines_conges = rslt.rows[0].nb_semaines_conges,
                    retour.nom_usage_employeur = rslt.rows[0].nom_usage_employeur,
                    retour.prenom_employeur = rslt.rows[0].prenom_employeur,
                    retour.nom_naissance_employeur = rslt.rows[0].nom_naissance_employeur,
                    retour.rue_employeur = rslt.rows[0].rue_employeur,
                    retour.cp_employeur = rslt.rows[0].cp_employeur,
                    retour.ville_employeur = rslt.rows[0].ville_employeur,
                    retour.telephone_employeur = rslt.rows[0].telephone_employeur,
                    retour.mail_employeur = rslt.rows[0].mail_employeur,
                    retour.identifiant_connexion = rslt.rows[0].identifiant_connexion,
                    retour.nb_semaines_conges_parents = rslt.rows[0].nb_semaines_conges_parents,
                    retour.statut = 200;
                }
                console.log('coucou')
                console.log(retour.mail_employeur)
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },
    create: function (numContrat, numAssMat, callback) {
        db.query('INSERT INTO public.contrat(id_contrat, id_am) VALUES ($1, $2)',
            [numContrat, numAssMat],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // Ajout de l'enfant au contrat
    sectionEnfantCreate: function (numContrat, numEnfant, callback) {
        db.query('UPDATE public.contrat SET id_enfant = $1 WHERE id_contrat = $2',
            [numEnfant, numContrat],
            function (e) {
            let retour = {erreur : null}
                if (e) {
                    console.log(e.toString())
                    retour.erreur = e.toString()
                }
                callback(retour)
            }
        )
    },

    // Ajout de l'employeur au contrat
    sectionEmployeurCreate: function (numContrat, nombreSemainesCong, numEmployeur, callback) {
        db.query('UPDATE public.contrat ' +
            'SET id_employeur = $1, nb_semaines_conges_parents = $2 ' +
            'WHERE id_contrat = $3',
            [numEmployeur, nombreSemainesCong, numContrat],
            function () {
                console.log('c\'est inséré :)')
                let retour = 'l\'employeur et ses conges sont ajoutés au contrat'
                callback(retour)
            }
        )
    },

    // Ajout des informations générales
    sectionInfosGeneralesCreate: function (numContrat, numTypeContrat, numModeDePaiement, dateDebutContrat, dateDebAdapt, dateFinAdapt, jourDePaiement, callback) {
        db.query('UPDATE public.contrat ' +
            'SET id_type_contrat = $1, id_mode_paiement = $2, jour_paiement = $3, date_debut = $4, date_deb_periode_adaptation = $5, date_fin_periode_adaptation = $6 ' +
            'WHERE id_contrat = $5',
            [numTypeContrat, numModeDePaiement, jourDePaiement, dateDebut, dateDebAdapt, dateFinAdapt, numContrat],
            function () {
                console.log('c\'est inséré :)')
                let retour = 'les infos générales sont ajoutées au contrat'
                callback(retour)
            }
        )
    },

    // Ajout du nombre d'heures de presence hebdomadaire de l'enfant
    sectionHeuresHebdoCreate: function(numContrat, nbHeures, callback) {
        db.query('UPDATE public.contrat ' +
            'SET nb_heures_semaine = $1 ' +
            'WHERE id_contrat = $2',
            [nbHeures, numContrat],
            function () {
                console.log('c\'est inséré :)')
                let retour = 'le nb d\'heures hebdos est ajouté au contrat'
                callback(retour)
            })
    },

    // Ajout des tarifs de l'assmat au contrat
    sectionTarifscreate: function (numContrat, tarifHoraire, tauxMajoration, callback) {
        db.query('UPDATE public.contrat ' +
            'SET tarif = $1 , taux_majore = $2 ' +
            'WHERE id_contrat = $3',
            [tarifHoraire, tauxMajoration, numContrat],
            function () {
                console.log('c\'est inséré :)')
                let retour = 'les tarifs sont ajoutés au contrat'
                callback(retour)
            })
    },


    /* -------------------------------------------------------------------------------------------------------------- */
    create2: function (contrat, callback) {
        db.query("INSERT INTO public.contrat(id_contrat, date_debut, nb_semaines_conges_parents, tarif, nb_heures_semaine, taux_majore, date_deb_periode_adaptation, date_fin_periode_adaptation, jour_paiement) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [contrat.id, contrat.date, contrat.congesSupp, contrat.salaireNet, contrat.nbHeuresSemaine, contrat.majoration, contrat.dateDebAdapt, contrat.dateFinAdapt, contrat.jourPrelevement],
            function (err, result) {
                let retour = {
                    erreur: null,
                    contrat: null,
                    statut: null
                };
                let e = helper.handleError(err, result, 'Aucun contrat');
                retour.erreur= e.erreur;
                retour.statut= e.statut;
                console.log(result)
                if (retour.erreur == null) {
                    retour.contrat = {
                        id: result.rows[0].id_contrat,
                        date: result.rows[0].date_debut,
                        congesSupp: result.rows[0].nb_semaines_conges_parents,
                        salaireNet: result.rows[0].tarif,
                        nbHeuresSemaine: result.rows[0].nb_heures_semaine,
                        majoration: result.rows[0].taux_majore,
                        dateDebAdapt: result.rows[0].date_deb_periode_adaptation,
                        dateFinAdapt: result.rows[0].date_fin_periode_adaptation,
                        jourPrelevement: result.rows[0].jour_paiement
                    }
                    retour.statut = 200
                }
            });
        callback(retour);
    }
}

module.exports = Contrat;