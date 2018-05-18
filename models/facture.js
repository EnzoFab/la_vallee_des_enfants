let db = require('../config/db');
let helper = require('../helpers/helper');

let Facture = {

    // récupère toutes les infos necessaires pour ecrire la facture (autres que les presences theo et reelles)
    getBasicsInfosForFacture: function (id_contrat, callback) {
        db.query(
            'SELECT am.nom_usage_am, am.prenom_am, am.nb_semaines_conges, co.id_contrat, co.nb_semaines_conges_parents, ' +
            'co.tarif, co.nb_heures_semaine, co.taux_majore, co.date_deb_periode_adaptation, co.date_fin_periode_adaptation, co.jour_paiement, co.date_fin, ' +
            'em.nom_usage_employeur, em.prenom_employeur, em.rue_employeur, em.cp_employeur, em.ville_employeur, en.nom_enfant, en.prenom_enfant ' +
            'FROM public.assmat am, public.contrat co, public.employeur em, public.enfant en ' +
            'WHERE am.id_am = co.id_am AND em.id_employeur = co.id_employeur AND en.id_enfant = co.id_enfant AND co.id_contrat = $1',
            [id_contrat],
            function (err, rslt){
                retour = {
                    erreur: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucun contrats');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.nom_usage_am = rslt.rows[0].nom_usage_am
                    retour.prenom_am = rslt.rows[0].prenom_am
                    retour.nb_semaines_conges = rslt.rows[0].nb_semaines_conges
                    retour.id_contrat = rslt.rows[0].id_contrat
                    retour.nb_semaines_conges_parents = rslt.rows[0].nb_semaines_conges_parents
                    retour.tarif = rslt.rows[0].tarif
                    retour.nb_heures_semaine = rslt.rows[0].nb_heures_semaine
                    retour.taux_majore = rslt.rows[0].taux_majore
                    retour.date_deb_periode_adaptation = rslt.rows[0].date_deb_periode_adaptation
                    retour.date_fin_periode_adaptation = rslt.rows[0].date_fin_periode_adaptation
                    retour.jour_paiement = rslt.rows[0].jour_paiement
                    retour.date_fin_contrat = rslt.rows[0].date_fin
                    retour.nom_usage_employeur = rslt.rows[0].nom_usage_employeur
                    retour.prenom_employeur = rslt.rows[0].prenom_employeur
                    retour.rue_employeur = rslt.rows[0].rue_employeur
                    retour.cp_employeur = rslt.rows[0].cp_employeur
                    retour.ville_employeur = rslt.rows[0].ville_employeur
                    retour.nom_enfant = rslt.rows[0].nom_enfant
                    retour.prenom_enfant = rslt.rows[0].prenom_enfant

                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },
}

module.exports = Facture;