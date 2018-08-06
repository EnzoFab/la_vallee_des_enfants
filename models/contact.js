let db = require('../config/db');
let helper = require('../helpers/helper');

let contact = {
    insert (contact, callback) {

    },

    selectAll (callback) {
        db.query('', function (err, rslt) {
            retour = {
                erreur: null,
                factures: null,
                statut: null
            };
            let e = helper.handleError(err, rslt,'Aucun contact');
            retour.erreur = e.erreur;
            retour.statut = e.statut;
            if(retour.erreur == null){
                retour.contact = rslt.rows;
                retour.contact = 200
            }
            callback(retour);
        })
    },

    delete (contact_id, callback) {

    }
};


module.exports = contact;