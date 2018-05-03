/* let client = require('../config/db')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

class Parent {
    static findParent(email) {
        client.query('SELECT * FROM public."Parent" P, public."Disposer" D, public."Compte" C WHERE P.id_parent=D.id_parent AND D.id_compte=C.id_compte AND P.mail= $1', [email], (err, result) => {
            if (err) {
                console.log('Erreur', err)
                res.status(403).send({
                    error: 'Les informations sont incorrectes'
                })
            } else {
               console.log("Connexion réussie !", result)
                result
            }
        })
    }
}

module.exports = Parent
*/

let db = require('../config/db');
let helper = require('../helpers/helper');
const bcrypt = require('bcrypt');

let Employeurs = {

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

    /**
     *
     * @param employeur: un objet javascript
     * @param callback
     */
    create: function (employeur, callback) {
        db.query("INSERT INTO public.employeur(nom_naissance_employeur, nom_usage_employeur, prenom_employeur, rue_employeur, cp_employeur, ville_employeur, mail_employeur, telephone_employeur, identifiant_connexion, mot_de_passe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [],
            function () {
                
            })
    }
};

module.exports = Employeurs;