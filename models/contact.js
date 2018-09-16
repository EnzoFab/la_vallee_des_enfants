let db = require('../config/db');
let helper = require('../helpers/helper');

let contact = {
    insert (contact, callback) {
        db.query(`INSERT INTO public.contact(mail, sujet, message, date_envoi, ouvert)
        VALUES ($1, $2, $3, $4, $5) returning id_contact;`,
            [contact.mail, contact.sujet, contact.message, contact.date_envoi, false],
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
                contacts: null,
                statut: null
            };
            let e = helper.handleError(err, rslt,'Aucun contact');
            retour.erreur = e.erreur;
            retour.statut = e.statut;
            if(retour.erreur == null){
                retour.contacts = rslt.rows;
                retour.statut = 200
            }
            console.log(retour)
            callback(retour);
        })
    },

    delete (id_contact, callback) {
        db.query('DELETE FROM public.contact WHERE id_contact = $1 returning id_contact', [id_contact],
            function (err, rslt) {
            retour = {
                erreur: null,
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
    },

    update (id_contact, callback) {
        db.query(`UPDATE public.contact
	    SET ouvert = $2
	    WHERE id_contact = $1 returning id_contact`, [id_contact, true],
            function (err, rslt) {
                retour = {
                    erreur: null,
                    factures: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Impossible de mettre a jour');
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