let db = require('../config/db');
let helper = require('../helpers/helper');

let presenceTheorique = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.presencetheorique',
            [],
            function (err, result){
                retour = {
                    erreur: null,
                    presencestheoriques: null,
                    statut: null
                };
                let e = helper.handleError(err, result,'Aucun types de contrat');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        console.log(1)
                        array.push({
                            id: result.rows[i].id_presence_theorique,
                            heureArrivee: result.rows[i].heure_arrivee,
                            heureDepart: result.rows[i].heure_depart,
                            prendsGouter: result.rows[i].prends_gouter
                        });
                        console.log('array', array)
                    }
                    retour.presencestheoriques = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    }
}

module.exports = presenceTheorique;