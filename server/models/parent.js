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

function handleError(e, rst){
    if(e){
        return {
            staut: 500,
            texte: e.toString()
        }
    }else if(rst.rows == undefined  || rst.rows.length > 0){
        return {
            statut: 400, // bad
            texte: 'Erreur le parent demandé n\'exsite pas'
        }
    }else{
        return null
    }
}

let Parents = {

    /**
     *
     * @param email : Mail du parent
     * @param callback : doit prendre un unique parametre
     */
    findOne: function (email, callback) {
        db.query('SELECT * FROM public.Parent P WHERE P.mail=$1',
            [email],
            function (err, rst) {
                retour = {
                    erreur: null,
                    parent: null
                };
                retour.erreur = handleError(err, rst);
                if(retour.erreur == null){
                    retour.parent = {
                        id : rst.rows[0].id_parent, // peut etre qu'il faut pas le renvoyer
                        nom_naissance: rst.rows[0].nom_de_naissance,
                        nom_usage: rst.rows[0].nom_d_usage,
                        prenom: rst.rows[0].prenom,
                        num_tel: rst.rows[0].tel,
                        email: rst.rows[0].mail,
                        profession: rst.rows[0].profession
                    }
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
            'SELECT * FROM public.Parent, public.Disposer D, public.Compte C WHERE C.identifiant_connexion=$1 and D.id_compte=C.id_compte and P.id_parent=D.id_parent',
            [login],
            function (err, rst) {
                retour = {
                    erreur: null,
                    parent: null
                };
                retour.erreur = handleError(err, rst);
                if(retour.erreur == null){
                    // Load hash from your password DB.
                    bcrypt.compare(pwd, rst.rows[0].mot_de_passe, function(e, res) {
                        if(e){
                            retour.erreur = {
                                statut: 500,
                                texte: e.toString()
                            }
                        }else if(!res){
                            retour.erreur = {
                                statut: 500,
                                texte: 'Identifiants de connexion non valides'
                            }
                        }else{
                            retour.parent = {
                                id : rst.rows[0].id_parent, // peut etre qu'il faut pas le renvoyer
                                nom_naissance: rst.rows[0].nom_de_naissance,
                                nom_usage: rst.rows[0].nom_d_usage,
                                prenom: rst.rows[0].prenom,
                                num_tel: rst.rows[0].tel,
                                email: rst.rows[0].mail,
                                profession: rst.rows[0].profession
                            }
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
        db.query('SELECT * FROM public.Parent','', function (err, rslt) {
            retour = {
                erreur: null,
                parents: null
            };
            retour.erreur = handleError(err, rst);
            if(retour.erreur == null){
                var array = []
                for(var i; i < rslt.rows.length; i++){
                    array.push({
                        id : rst.rows[i].id_parent, // peut etre qu'il faut pas le renvoyer
                        nom_naissance: rst.rows[i].nom_de_naissance,
                        nom_usage: rst.rows[i].nom_d_usage,
                        prenom: rst.rows[i].prenom,
                        num_tel: rst.rows[i].tel,
                        email: rst.rows[i].mail,
                        profession: rst.rows[i].profession
                    })
                }
            }
            callback(retour); // on passe en parametre l'objet retour
            // il faudra verifier si une erreur existe ou non
        });
    },

    /**
     *
     * @param parent: un objet javascript
     * @param callback
     */
    create: function (parent, callback) {

    }
};

module.exports = Parents;