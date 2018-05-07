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

    create: function (contrat, callback) {
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