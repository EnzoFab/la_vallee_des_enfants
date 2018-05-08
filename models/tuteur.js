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
            });
        callback(retour);
    }
}

module.exports = Tuteur;