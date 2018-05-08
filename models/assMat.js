let db = require('../config/db');
let helper = require('../helpers/helper');
const bcrypt = require('bcrypt');


let AssMats = {
    create: function (assMat, callback) {
        bcrypt.hash(assMat.mdp, 8, function (e, hash) {
            // Store hash in the password DB
            let retour = {
                erreur: null,
                assmat: null,
                statut: null
            };
            if (e) {
                retour.erreur = {
                    texte: e.toString()
                }
            }
            else {
                db.query("INSERT INTO public.assmat(nom_naissance_am, nom_usage_am, prenom_am, tel_am, nb_semaines_conges, date_naissance_am, ville_naissance_am, numero_ss, date_agrement, reference_agrement, assurance_resp_civile, num_police, login, mot_de_passe_am) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
                    [assMat.nomNaissance, assMat.nomUsage, assMat.prenom, assMat.tel, assMat.nbConges, assMat.dateNaiss, assMat.villeNaiss, assMat.numSS, assMat.dateAgr, assMat.refAgr, assMat.assResp, assMat.numPolice, assMat.login, hash],
                    function (err, result) {
                        // let e = helper.handleError(err, result, 'Aucune assistante maternelle');
                        // retour.erreur = e.erreur;
                        // retour.statut = e.statut;
                        console.log(result)
                        if (retour.erreur == null) {
                            var array = []
                            for(var i = 0; i<result.rows.length; i++) {
                                array.push({
                                    nomNaissance: result.rows[i].nom_naissance_am,
                                    nomUsage: result.rows[i].nom_usage_am,
                                    prenom: result.rows[i].prenom_am,
                                    tel: result.rows[i].tel_am,
                                    nbConges: result.rows[i].nb_semaines_conges,
                                    dateNaiss: result.rows[i].date_naissance_am,
                                    villeNaiss: result.rows[i].ville_naissance_am,
                                    numSS: result.rows[i].numero_ss,
                                    dateAgr: result.rows[i].date_agrement,
                                    refAgr: result.rows[i].reference_agrement,
                                    assResp: result.rows[i].assurance_resp_civile,
                                    numPolice: result.rows[i].num_police,
                                    login: result.rows[i].login,
                                    mdp: result.rows[i].mot_de_passe_am
                                })
                            }
                            retour.assmat = array;
                            retour.statut = 200
                        }
                    });
            }
            callback(retour);
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
            'SELECT * FROM public.assmat A WHERE A.login=$1',
            [login],
            function (err, rst) {
                retour = {
                    erreur: null,
                    assmat: null,
                    statut: null
                };
                let e = helper.handleError(err, rst,'Identifiants de connexion non valides');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    // Load hash from your password DB.
                    bcrypt.compare(pwd, rst.rows[0].mot_de_passe_am, function(e, res) {
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
                            retour.assmat = {
                                id : rst.rows[0].id_assmat, // peut etre qu'il faut pas le renvoyer
                                nomNaissance: rst.rows[0].nom_naissance_am,
                                nomUsage: rst.rows[0].nom_usage_am,
                                prenom: rst.rows[0].prenom_am,
                                tel: rst.rows[0].tel_am,
                                nbConges: rst.rows[0].nb_semaines_conges,
                                dateNaiss: rst.rows[0].date_naissance_am,
                                villeNaiss: rst.rows[0].ville_naissance_am,
                                numSS: rst.rows[0].numero_ss,
                                dateAgr: rst.rows[0].date_agrement,
                                refAgr: rst.rows[0].reference_agrement,
                                assResp: rst.rows[0].assurance_resp_civile,
                                numPolice: rst.rows[0].num_police,
                                login: rst.rows[0].login,
                                mdp: rst.rows[0].mot_de_passe_am
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

    }


};

module.exports = AssMats;