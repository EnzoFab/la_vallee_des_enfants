let db = require('../config/db');
let helper = require('../helpers/helper');

let presenceReelle = {
    // creer une presence reelle
    create: function (presenceReelle, callback) {
        db.query('INSERT INTO public.presencereelle (datepresencereelle, id_presence_theo, heure_arrivee_r, heure_depart_r, prends_gouter_r, id_facture, absence_justifiee) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [presenceReelle.datepresencereelle, presenceReelle.id_presence_theo, presenceReelle.heure_arrivee, null, null, null, null],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
               // console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // creer une presence reelle exceptionnelle
    createPresExc: function (presenceReelle, callback) {
        db.query('INSERT INTO public.presencereelle (datepresencereelle, id_presence_theo, heure_arrivee_r, heure_depart_r, prends_gouter_r, id_facture, absence_justifiee) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [presenceReelle.datepresencereelle, presenceReelle.id_presence_theo, null, null, null, null, null],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                // console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // creer une presence reelle
    createAbs: function (absence, callback) {
        db.query('INSERT INTO public.presencereelle (datepresencereelle, id_presence_theo, absence_justifiee, heure_arrivee_r, heure_depart_r, prends_gouter_r, id_facture) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [absence.datepresencereelle, absence.id_presence_theo, absence.absence_justifiee, null, null, null, null],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                // console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // mettre à jour l'heure d'arrivée d'une présence réelle
    updateHeureArrivee: function (presenceReelle, callback) {
        console.log('coucou toi')
        console.log(presenceReelle.id_presence_reelle)
        console.log(presenceReelle.heure_arrivee)
        db.query('UPDATE public.presencereelle ' +
            'SET heure_arrivee_r = $1, absence_justifiee = $3 ' +
            'WHERE id_presence_reelle = $2',
            [presenceReelle.heure_arrivee, presenceReelle.id_presence_reelle, null],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    console.log('erreur ' + e)
                    retour.erreur = e.toString()
                }
                console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // mettre à jour l'heure de départ d'une présence réelle
    updateHeureDepart: function (presenceReelle, callback) {
        console.log('coucou    ' + presenceReelle.heure_depart + '  ' + presenceReelle.id_presence_reelle)
        db.query('UPDATE public.presencereelle ' +
            'SET heure_depart_r = $1 ' +
            'WHERE id_presence_reelle = $2',
            [presenceReelle.heure_depart, presenceReelle.id_presence_reelle],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // mettre à jour le gouter d'une présence réelle
    updateGouter: function (presenceReelle, callback) {
        console.log(presenceReelle.a_pris_gouter)
        db.query('UPDATE public.presencereelle ' +
            'SET prends_gouter_r = $1 ' +
            'WHERE id_presence_reelle = $2',
            [presenceReelle.a_pris_gouter, presenceReelle.id_presence_reelle],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // mettre à jour la facture associiée à la présence réelle
    updateFactureAssociee: function (presenceReelle, callback) {
        db.query('UPDATE public.presencereelle ' +
            'SET (id_facture) VALUES ($1) ' +
            'WHERE id_presence_reelle = $2',
            [presenceReelle.id_facture, presenceReelle.id_presence_reelle],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    retour.erreur = e.toString()
                }
                console.log('c\'est inséré :)')
                callback(retour)
            });
    },

    // permet de savoir si une présence pour l'enfant à la date donnée existe
    existePresenceReelle: function (date, id_enfant, callback) {
        db.query('SELECT COUNT(id_presence_reelle), id_presence_reelle, prends_gouter_r, heure_arrivee_r, heure_depart_r, absence_justifiee ' +
            'FROM public.presencereelle pr, public.presencetheorique pt, public.contrat co ' +
            'WHERE pr.id_presence_theo = pt.id_presence_theorique AND pt.id_contrat = co.id_contrat AND co.id_enfant = $2 AND datepresencereelle = $1 ' +
            'GROUP BY id_presence_reelle',
            [date, id_enfant],
            function (err, rslt) {
                retour = {
                    erreur: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt, 'Aucune presence reelle');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if (retour.erreur == null && rslt.rows[0].count > 0) {
                    retour.existe = true
                    retour.statut = 200
                    retour.a_pris_gouter = rslt.rows[0].prends_gouter_r
                    retour.id_presence = rslt.rows[0].id_presence_reelle
                    retour.heure_arrivee_r = rslt.rows[0].heure_arrivee_r
                    retour.heure_depart_r = rslt.rows[0].heure_depart_r
                    retour.absence_justifiee = rslt.rows[0].absence_justifiee

                } else {
                    retour.existe = false
                    retour.id_presence = null
                    retour.a_pris_gouter = false
                    retour.heure_arrivee_r = null
                    retour.heure_depart_r = null
                    retour.absence_justifiee = null
                }
                callback(retour);
            })
    },

    // mettre à jour l'heure d'arrivée d'une présence réelle
    updateAbs: function (absence, callback) {
        db.query('UPDATE public.presencereelle ' +
            'SET absence_justifiee = $1, heure_arrivee_r = $3, heure_depart_r = $4, prends_gouter_r = $5 ' +
            'WHERE id_presence_reelle = $2',
            [absence.absence_justifiee, absence.id_presence_reelle, null, null, null],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    console.log('erreur ' + e)
                    retour.erreur = e.toString()
                }
                console.log('c\'est inséré :)')
                callback(retour)
            });
    },
}

module.exports = presenceReelle;