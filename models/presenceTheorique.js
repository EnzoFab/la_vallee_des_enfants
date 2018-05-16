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
                let e = helper.handleError(err, result,'Aucune présence theorique');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id: result.rows[i].id_presence_theorique,
                            heureArrivee: result.rows[i].heure_arrivee,
                            heureDepart: result.rows[i].heure_depart,
                            prendsGouter: result.rows[i].prends_gouter
                        });
                    }
                    retour.presencestheoriques = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    getAllChildrenOfTheDay: function (numDay, callback) {
        console.log('numDuJour : ' + numDay)
        db.query(
            'SELECT * ' +
            'FROM public.presencetheorique pt, public.contrat co, public.enfant en ' +
            'WHERE pt.id_contrat = co.id_contrat AND co.id_enfant = en.id_enfant AND pt.id_type_jour = $1 ' +
            'ORDER BY pt.heure_arrivee',
            [numDay],
            function (err, result) {
                retour = {
                    erreur: null,
                    presencestheoriques: null,
                    statut: null
                };
                let e = helper.handleError(err, result, 'Pas de presence prévue')
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if (retour.erreur == null) {
                    var array = []
                    for (var i = 0; i < result.rows.length; i++) {
                        array.push({
                            id_contrat: result.rows[i].id_contrat,
                            id_enfant: result.rows[i].id_enfant,
                            id_presence_theo: result.rows[i].id_presence_theorique,
                            nom_enfant: result.rows[i].nom_enfant,
                            prenom_enfant: result.rows[i].prenom_enfant,
                            prend_gouter: result.rows[i].prends_gouter,
                            heure_arrivee: result.rows[i].heure_arrivee,
                            heure_depart: result.rows[i].heure_depart
                        });
                    }
                    retour.presencestheoriques = array
                    retour.statut = 200
                }

                callback(retour);
            }
        );
    }
}

module.exports = presenceTheorique;