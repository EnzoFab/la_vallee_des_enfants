let db = require('../config/db');
let helper = require('../helpers/helper');

let Tuteur = {

    create: function (tuteur, callback) {
        db.query("INSERT INTO public.tuteur(nom_tuteur, prenom_tuteur, telephone, profession, telephone_pro, id_type_tuteur) VALUES ($1, $2, $3, $4, $5, $6)",
            [tuteur.nomUsage, tuteur.prenom, tuteur.telephone, tuteur.profession, tuteur.telephonePro, tuteur.typeDeTuteur],
            function (err, result) {
                let retour = {
                    erreur: null,
                    tuteur: null,
                    statut: null
                };
                let e = helper.handleError(err, result, 'Aucun tuteur');
                retour.erreur= e.erreur;
                retour.statut= e.statut;
                console.log(result)
                if (retour.erreur == null) {
                    retour.tuteur = {
                        nomUsage: result.rows[0].nom_tuteur,
                        prenom: result.rows[0].prenom_tuteur,
                        telephone: result.rows[0].telephone,
                        profession: result.rows[0].profession,
                        telephonePro: result.rows[0].telephone_pro,
                        typeDeTuteur: result.rows[0].id_type_tuteur
                    }
                    retour.statut = 200
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
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        console.log(1)
                        array.push({
                            nom_tuteur: rslt.rows[i].nom_tuteur,
                            prenom_tuteur: rslt.rows[i].prenom_tuteur,
                            telephone: rslt.rows[i].telephone,
                            profession: rslt.rows[i].profession,
                            telephone_pro: rslt.rows[i].telephone_pro,
                            nom_type_tuteur: rslt.rows[i].nom_type_tuteur
                        });
                        console.log('array', array)
                    }
                    retour.tuteurs = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },

    /*
    * -------------- TOUT CE QUI CONCERNE LE CONTRAT AJOUT/MODIFICATION PAR SECTION ET CREATION INITIALE --------------
     */

    // creation initiale du contrat
}

module.exports = Tuteur;