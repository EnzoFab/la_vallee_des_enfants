let db = require('../config/db');
let helper = require('../helpers/helper');

let modePaiment = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.modedepaiement',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    modepaiements: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun mode de paiements');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        console.log(1)
                        array.push({
                            id: rslt.rows[i].id_mode,
                            libelle: rslt.rows[i].nom_mode
                        });
                        console.log('array', array)
                    }
                    retour.modepaiements = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
            );
    }
}

module.exports = modePaiment;