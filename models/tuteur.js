let db = require('../config/db');
let helper = require('../helpers/helper');

let Tuteur = {

    create: function (tuteur, callback) {
        db.query("INSERT INTO public.tuteur(nom_tuteur, prenom_tuteur, telephone, profession, telephone_pro, id_type_tuteur) VALUES ($1, $2, $3, $4, $5, $6) returning id_tuteur",
            [tuteur.nomUsage, tuteur.prenom, tuteur.telephone, tuteur.profession, tuteur.telephonePro, tuteur.typeDeTuteur],
            function (err, result) {
                let retour = {
                    statut: null,
                    erreur: null,
                    id_tuteur: null
                };
                if (err) {
                    retour.statut = 500
                    retour.erreur = err.toString()
                } else {
                    retour.statut = 200
                    retour.id_tuteur = result.rows[0].id_tuteur
                }
                callback(retour);
            });
    },
    getTuteursById: function (numeroContrat, callback) {
        db.query(
            'SELECT tu.nom_tuteur, tu.prenom_tuteur, tu.telephone, tu.profession, tu.telephone_pro, nom_type_tuteur ' +
            'FROM public.contrat as co, public.enfant as en, public.tuteur as tu, public.apourtuteur as apt, public.typetuteur as tt ' +
            'WHERE co.id_contrat = $1 AND co.id_enfant = en.id_enfant AND apt.id_enfant = en.id_enfant AND apt.id_tuteur = tu.id_tuteur ' +
            'AND tt.id_type_tuteur = tu.id_type_tuteur;',
            [numeroContrat],
            function (err, rslt){
                console.log('hellobis')
                retour = {
                    erreur: null,
                    contrats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrat');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.tuteurs = {
                        nom_tuteur: rslt.rows[0].nom_tuteur,
                        prenom_tuteur: rslt.rows[0].prenom_tuteur,
                        telephone: rslt.rows[0].telephone,
                        profession: rslt.rows[0].profession,
                        telephone_pro: rslt.rows[0].telephone_pro,
                        nom_type_tuteur: rslt.rows[0].nom_type_tuteur
                    };
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    getTuteursEnfants: function (callback) {
        db.query(
            'SELECT E.nom_enfant, E.prenom_enfant, T.id_tuteur, T.nom_tuteur, T.prenom_tuteur FROM public.tuteur T, public.enfant E, public.apourtuteur A\n' +
            'WHERE T.id_tuteur = A.id_tuteur AND A.id_enfant = E.id_enfant\n' +
            'GROUP BY E.nom_enfant, E.prenom_enfant, T.id_tuteur, T.nom_tuteur, T.prenom_tuteur ORDER BY T.prenom_tuteur',
            [],
            function (err, rslt){
                retour = {
                    erreur: null,
                    resultats: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun tuteur et enfant');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id_tuteur: rslt.rows[i].id_tuteur,
                            prenom_enfant: rslt.rows[i].prenom_enfant,
                            nom_enfant: rslt.rows[i].nom_enfant,
                            nom_tuteur: rslt.rows[i].nom_tuteur,
                            prenom_tuteur: rslt.rows[i].prenom_tuteur,
                            nom_complet: rslt.rows[i].prenom_tuteur + ' '+ rslt.rows[i].nom_tuteur
                        });
                        console.log('array', array)
                    }
                    retour.resultats = array;
                    retour.statut = 200
                }
                callback(retour);
            }
        );
    },


    sectionEnfantTuteur: function (numEnfant, numTuteur, callback) {
        db.query('INSERT INTO public.apourtuteur(id_enfant, id_tuteur) VALUES ($1, $2)',
            [numEnfant, numTuteur],
            function (e, result) {
                let retour = {
                    erreur : null,
                    statut: null
                };
                if (e) {
                    retour.statut = 500
                    retour.erreur = e.toString()
                }
                else {
                    retour.statut = 200
                }
                callback(retour)
            });
    },

    update: function (numTuteur, tuteur, callback) {
        db.query('UPDATE public.tuteur SET nom_tuteur = $1, prenom_tuteur = $2, telephone = $3, profession = $4, telephone_pro = $5, id_type_tuteur = $6 WHERE id_tuteur = $7',
            [tuteur.nomUsage, tuteur.prenom, tuteur.telephone, tuteur.profession, tuteur.telephonePro, tuteur.typeDeTuteur, numTuteur],
            function (e, result) {
                let retour = {
                    erreur : null,
                    statut: null
                };
                if (e) {
                    retour.statut = 500
                    retour.erreur = e.toString()
                }
                else {
                    retour.statut = 200
                }
                callback(retour)
            })
    },

    updateInfosTuteur: function (tuteur, callback) {
        db.query('UPDATE public.tuteur SET telephone = $1, profession = $2, telephone_pro = $3 WHERE id_tuteur = $4',
            [tuteur.telParent, tuteur.profession, tuteur.telProParent, tuteur.id_tuteur],
            function (e, result) {
                let retour = {
                    erreur : null,
                    statut: null
                };
                if (e) {
                    retour.statut = 500
                    retour.erreur = e.toString()
                }
                else {
                    retour.statut = 200
                }
                callback(retour)
            })
    },
}

module.exports = Tuteur;