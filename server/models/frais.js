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
                    indemniteJour: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt, 'Aucun montant trouvé pour les indemnites journalieres');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    array.push({
                        tarif: rslt.rows[0].tarif
                    });
                    console.log('array', array)

                    retour.indemniteJour = array;
                    retour.statut = 200
                }
                callback(retour);
            }
        );
    }
}

module.exports = indemnites;
