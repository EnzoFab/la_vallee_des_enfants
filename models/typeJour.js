let db = require('../config/db');
let helper = require('../helpers/helper');

let typeJour = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.typejour',
            [],
            function (err, result){
                retour = {
                    erreur: null,
                    typesjour: null,
                    statut: null
                };
                let e = helper.handleError(err, result,'Aucun types de contrat');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < result.rows.length; i++){
                        console.log(1)
                        array.push({
                            id: result.rows[i].id_type,
                            libelle: result.rows[i].libelle
                        });
                        console.log('array', array)
                    }
                    retour.typesjour = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    }
}

module.exports = typeJour;