let db = require('../config/db');
let helper = require('../helpers/helper');

let Enfant = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.enfant',
            [],
            function (err, result){
                retour = {
                    erreur: null,
                    enfants: null,
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
                            id: result.rows[i].id_enfant,
                            nom: result.rows[i].nom_enfant,
                            prenom: result.rows[i].prenom_enfant,
                            dateNaiss: result.rows[i].date_naissance_enfant,
                            sexe: result.rows[i].sexe
                        });
                        console.log('array', array)
                    }
                    retour.enfants = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    create: function (enfant, callback) {
        db.query("INSERT INTO public.enfant(nom_enfant, prenom_enfant, date_naissance_enfant, sexe) VALUES ($1, $2, $3, $4)",
            [enfant.nom, enfant.prenom, enfant.date_naissance, enfant.sexe],
            function (err, result) {
                let retour = {
                    statut: null,
                    erreur: null
                };
                if (err) {
                    retour.statut = 500
                    retour.erreur = err.toString()
                } else {
                    retour.statut = 200
                }
            });
        callback(retour);
}

};

module.exports = Enfant;