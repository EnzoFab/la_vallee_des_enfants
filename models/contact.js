let db = require('../config/db');
let helper = require('../helpers/helper');

let contact = {
    insert (contact, callback) {
        db.query('', [],
            function (err, rslt) {
                retour = {
                    erreur: null,
                    contact: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Erreur impossible d\'inserer');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    retour.contact = rslt.rows[0].id_contact;
                    retour.statut = 200
                }
                callback(retour);
            })
    },

    selectAll (callback) {
        db.query('SELECT * FROM public.contact', [],
            function (err, rslt) {
            retour = {
                erreur: null,
                contact: null,
                statut: null
            };
            let e = helper.handleError(err, rslt,'Aucun contact');
            retour.erreur = e.erreur;
            retour.statut = e.statut;
            if(retour.erreur == null){
                retour.contact = rslt.rows;
                retour.statut = 200
            }
            callback(retour);
        })
    },

    delete (contact_id, callback) {
        db.query('DELETE public.contact WHERE contact_id = $1 returning contact_id', [contact_id],
            function (err, rslt) {
            retour = {
                erreur: null,
                factures: null,
                statut: null
            };
            let e = helper.handleError(err, rslt,'Impossible de supprimer');
            retour.erreur = e.erreur;
            retour.statut = e.statut;
            if(retour.erreur == null){
                retour.contact = rslt.rows;
                retour.contact = 200
            }
            callback(retour);
        })
    }
};


module.exports = contact;