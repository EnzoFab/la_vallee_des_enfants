let db = require('../config/db');
let helper = require('../helpers/helper');

let indemnites = {
    getIndemnites: function (callback) {
        db.query(
            'SELECT * FROM public.frais WHERE public.frais.nom_frais=$1',
            ['entretien'],
            function(err, rslt){
                retour = {
                    erreur: null,
                    entretien: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt, 'Aucun montant trouvé pour les indemnites journalieres');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.entretien = rslt.rows[0].tarif;
                    retour.statut = 200
                }
                callback(retour);
            }
        );
    },
    getGouter: function (callback) {
        db.query(
            'SELECT * FROM public.frais WHERE public.frais.nom_frais=$1',
            ['gouter'],
            function(err, rslt){
                retour = {
                    erreur: null,
                    gouter: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt, 'Aucun montant trouvé pour le gouter');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.gouter = rslt.rows[0].tarif;
                    retour.statut = 200
                }
                callback(retour);
            }
        );
    }
};


module.exports = indemnites;
