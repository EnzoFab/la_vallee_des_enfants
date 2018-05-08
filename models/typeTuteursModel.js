let db = require('../config/db');
let helper = require('../helpers/helper');

let typeContrat = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.typetuteur',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    typesTuteur: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun type de tuteur');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        console.log(1)
                        array.push({
                            id: rslt.rows[i].id_type_tuteur,
                            libelle: rslt.rows[i].nom_type_tuteur
                        });
                        console.log('array', array)
                    }
                    retour.typesTuteur = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    }
}

module.exports = typeContrat;