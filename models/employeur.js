let db = require('../config/db');
let helper = require('../helpers/helper');
const bcrypt = require('bcrypt');

let Employeur = {

    /**
     *
     * @param email : Mail de l'employeur
     * @param callback : doit prendre un unique parametre
     */
    findOne: function (email, callback) {
        db.query('SELECT * FROM public.employeur E WHERE E.mail_employeur=$1',
            [email],
            function (err, rst) {
                retour = {
                    erreur: null,
                    employeur: null,
                    statut: null
                };
               let e = helper.handleError(err, rst,"L'employeur demandé n\'existe pas");
                retour.erreur = e.erreur
                retour.statut = e.statut
                if(retour.erreur == null){
                    retour.employeur = {
                        id : rst.rows[0].id_employeur, // peut etre qu'il faut pas le renvoyer
                        nom_naissance: rst.rows[0].nom_naissance_employeur,
                        nom_usage: rst.rows[0].nom_usage_employeur,
                        prenom: rst.rows[0].prenom_employeur,
                        rue: rst.rows[0].rue_employeur,
                        cp: rst.rows[0].cp_employeur,
                        ville: rst.rows[0].ville_employeur,
                        mail: rst.rows[0].mail_employeur,
                        tel: rst.rows[0].telephone_employeur,
                        identifiant: rst.rows[0].identifiant_connexion,
                        mdp: rst.rows[0].mot_de_passe
                    }
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            });
    },

    /**
     *
     * @param login
     * @param pwd
     * @param callback
     */
    match: function(login, pwd, callback){
        db.query(
            'SELECT * FROM public.employeur E WHERE E.identifiant_connexion=$1',
            [login],
            function (err, rst) {
                retour = {
                    erreur: null,
                    employeur: null,
                    statut: null
                };
                let e = helper.handleError(err, rst,'Identifiants de connexion non valides');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    // Load hash from your password DB.
                    bcrypt.compare(pwd, rst.rows[0].mot_de_passe, function(e, res) {
                        if(e){
                            retour.erreur = {
                                texte: e.toString()
                            }
                            retour.statut = 500
                        }else if(!res){
                            retour.erreur = {
                                texte: 'Identifiants de connexion non valides'
                            }
                            retour.statut = 500
                        }else{
                            retour.employeur = {
                                id : rst.rows[0].id_employeur, // peut etre qu'il faut pas le renvoyer
                                nom_naissance: rst.rows[0].nom_naissance_employeur,
                                nom_usage: rst.rows[0].nom_usage_employeur,
                                prenom: rst.rows[0].prenom_employeur,
                                rue: rst.rows[0].rue_employeur,
                                cp: rst.rows[0].cp_employeur,
                                ville: rst.rows[0].ville_employeur,
                                mail: rst.rows[0].mail_employeur,
                                tel: rst.rows[0].telephone_employeur,
                                identifiant: rst.rows[0].identifiant_connexion,
                                mdp: rst.rows[0].mot_de_passe

                            }
                            retour.statut = 200
                        }
                        callback(retour);
                    });
                }else{
                    callback(retour); // on passe en parametre l'objet retour
                    // il faudra verifier si une erreur existe ou non
                }

            });

    },

    /**
     *
     * @param callback
     */
    getAll: function (callback) {
        db.query('SELECT * FROM public.employeur','', function (err, rslt) {
            retour = {
                erreur: null,
                employeurs: null,
                statut: null
            };
            let e = helper.handleError(err, rst,'Aucun parents');
            retour.erreur = e.erreur;
            retour.statut = e.statut;
            if(retour.erreur == null){
                var array = []
                for(var i = 0; i < rslt.rows.length; i++){
                    array.push({
                        id : rst.rows[0].id_employeur, // peut etre qu'il faut pas le renvoyer
                        nom_naissance: rst.rows[0].nom_naissance_employeur,
                        nom_usage: rst.rows[0].nom_usage_employeur,
                        prenom: rst.rows[0].prenom_employeur,
                        rue: rst.rows[0].rue_employeur,
                        cp: rst.rows[0].cp_employeur,
                        ville: rst.rows[0].ville_employeur,
                        mail: rst.rows[0].mail_employeur,
                        tel: rst.rows[0].telephone_employeur,
                        identifiant: rst.rows[0].identifiant_connexion,
                        mdp: rst.rows[0].mot_de_passe
                    })
                }
                retour.employeurs = array;
                retour.statut = 200
            }
            callback(retour); // on passe en parametre l'objet retour
            // il faudra verifier si une erreur existe ou non
        });
    },

    create: function (employeur, callback) {
        db.query("INSERT INTO public.employeur(nom_naissance_employeur, nom_usage_employeur, prenom_employeur, rue_employeur, cp_employeur, ville_employeur, mail_employeur, telephone_employeur, identifiant_connexion, mot_de_passe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [employeur.nomNaissance, employeur.nomUsage, employeur.prenom, employeur.rue, employeur.codePostal, employeur.ville, employeur.email, employeur.telephone1, employeur.identifiantConnexion, employeur.mdp ],
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
                callback(retour);
            });
    },

    update: function (numEmployeur, employeur, callback) {
        db.query('UPDATE public.employeur SET nom_naissance_employeur = $1, nom_usage_employeur = $2, prenom_employeur = $3, rue_employeur = $4, cp_employeur = $5, ville_employeur = $6, mail_employeur = $7, telephone_employeur = $8, identifiant_connexion = $9, mot_de_passe = $10 WHERE id_employeur = $11',
            [employeur.nomNaissance, employeur.nomUsage, employeur.prenom, employeur.rue, employeur.codePostal, employeur.ville, employeur.email, employeur.telephone1, employeur.identifiantConnexion, employeur.mdp, numEmployeur],
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
};

module.exports = Employeur;