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
    }
}

module.exports = Contrat;