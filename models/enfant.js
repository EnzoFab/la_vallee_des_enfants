let db = require('../config/db');
let helper = require('../helpers/helper');

let Enfant = {
    findOne: function (numContrat, callback) {
        db.query('SELECT * FROM public.enfant E, public.contrat C where C.id_enfant = E.id_enfant and C.id_contrat = $1',
            [numContrat],
            function (err, result) {
                retour = {
                    erreur: null,
                    enfant: null,
                    statut: null
                };
                let e = helper.handleError(err, result,'L\'Enfant n\'existe pas');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null) {
                    retour.enfant = {
                        id: result.rows[0].id_enfant,
                        nom: result.rows[0].nom_enfant,
                        prenom: result.rows[0].prenom_enfant,
                        dateNaiss: result.rows[0].date_naissance_enfant,
                        sexe: result.rows[0].sexe,
                        num_contrat: result.rows[0].id_contrat
                    }
                    retour.statut = 200
                }
                callback(retour);
            })
    },
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
                let e = helper.handleError(err, result,'Aucun enfants');
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
        db.query("INSERT INTO public.enfant (nom_enfant, prenom_enfant, date_naissance_enfant, sexe) VALUES ($1, $2, $3, $4) returning id_enfant",
            [enfant.nom, enfant.prenom, enfant.date_naissance, enfant.sexe],
            function (err, result) {
                let retour = {
                    statut: null,
                    erreur: null,
                    id_enfant: null
                };
                if (err) {
                    retour.statut = 500
                    retour.erreur = err.toString()
                    console.log('ici')
                } else {
                    retour.statut = 200
                    retour.id_enfant = result.rows[0].id_enfant
                }
                callback(retour);
            });
    }
};

module.exports = Enfant;