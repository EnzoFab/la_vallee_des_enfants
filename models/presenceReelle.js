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
                callback(retour)
            });
    },

    // mettre à jour l'heure d'arrivée d'une présence réelle
    updateHeureArrivee: function (presenceReelle, callback) {
        db.query('UPDATE public.presencereelle ' +
            'SET heure_arrivee_r = $1, absence_justifiee = $3 ' +
            'WHERE id_presence_reelle = $2',
            [presenceReelle.heure_arrivee, presenceReelle.id_presence_reelle, null],
            function (e) {
                let retour = {
                    erreur : null
                }
                if (e) {
                    console.log(e)
                    retour.erreur = e.toString()
                }
                callback(retour)
            });
    },

    // Toutes les presences reelle d'un mois(d'une annee) pour un contrat
    getAllPresencesDuMois: function (annee, mois, numContrat, callback) {
        let dateDebut = new Date(annee, mois, 1)
        let dateFin = new Date(annee, mois+1, 0)
        db.query(
            'SELECT pr.datepresencereelle, pr.heure_arrivee_r, pr.heure_depart_r, pr.prends_gouter_r, pr.absence_justifiee ' +
            'FROM public.presencereelle pr, public.presencetheorique pt ' +
            'WHERE pr.id_presence_theo = pt.id_presence_theorique AND pt.id_contrat = $1 ' +
                'AND pr.datepresencereelle >= $2 AND  pr.datepresencereelle <= $3 ' +
            'ORDER BY pr.datepresencereelle ASC',
            [numContrat, dateDebut, dateFin],
            function (err, rslt){
                retour = {
                    erreur: null,
                    statut: null
                };
                let e = helper.handleError(err, rslt,'Aucune presence ce mois ci');
                retour.erreur = e.erreur;
                retour.presencesreelles = null
                retour.statut = e.statut;
                if(retour.erreur == null){
                    let array = []
                    for(let i = 0; i < rslt.rows.length; i++){
                        let datepresencereelle = new Date(rslt.rows[i].datepresencereelle)
                        datepresencereelle.setDate(datepresencereelle.getDate()+1)
                        array.push({
                            datepresencereelle: rslt.rows[i].datepresencereelle,
                            heure_arrivee_r: rslt.rows[i].heure_arrivee_r,
                            heure_depart_r: rslt.rows[i].heure_depart_r,
                            prends_gouter_r: rslt.rows[i].prends_gouter_r,
                            absence_justifiee: rslt.rows[i].absence_justifiee
                        })
                        console.log(datepresencereelle)
                    }retour.presencesreelles = array;
                    retour.statut = 200
                }
                callback(retour);

            });

    },

    // mettre à jour l'heure de départ d'une présence réelle
    updateHeureDepart: function (presenceReelle, callback) {
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
                callback(retour)
            });
    },

    // mettre à jour le gouter d'une présence réelle
    updateGouter: function (presenceReelle, callback) {
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
                    console.log(e)
                    retour.erreur = e.toString()
                }
                callback(retour)
            });
    },

    getAllBefore (date, callback) {
        db.query('SELECT * FROM public.presencereelle PR, public.presencetheorique PT\n' +
            ' WHERE PR.datepresencereelle <= $1 ::date\n' +
            'AND PR.id_presence_theo = PT.id_presence_theorique',
            [date],
            function (er, res) {
                retour = {
                    erreur: null,
                    statut: null
                };
                let e = helper.handleError(er, res,'L\'enfant n\'a jamais était présent');
                retour.erreur = e.erreur;
                retour.resultats = null
                retour.statut = e.statut;
                if(retour.erreur == null){
                    let array = []
                    for (let i = 0; i<res.rows.length; i++) {
                        let datepresencereelle = new Date(res.rows[i].datepresencereelle)
                        datepresencereelle.setDate(datepresencereelle.getDate()+1)
                        array.push({
                            datepresencereelle:  res.rows[i].datepresencereelle,
                            heureArriveeReelle: res.rows[i].heure_arrivee_r,
                            heureDepartRelle: res.rows[i].heure_depart_r,
                            prendsGouterRelle: res.rows[i].prends_gouter_r,
                            absence_justifiee: res.rows[i].absence_justifiee,
                            id_presence_relle: res.rows[i].id_presence_relle,
                            heureArriveePrevue: res.rows[i].heure_arrivee,
                            heureDepartPrevue: res.rows[i].heure_depart,
                            prendsGouterPrevue: res.rows[i].prends_gouter,
                            arriveeRetard: res.rows[i].heure_arrivee_r > res.rows[i].heure_arrivee,
                            partieAvant: res.rows[i].heure_depart_r < res.rows[i].heure_depart
                        })
                    }
                    retour.resultats = array
                }
                callback(retour)
            })
    },

    getAllForContratbeofre (numContrat, date, callback) {
        db.query('SELECT * FROM public.presencereelle PR, public.presencetheorique PT\n' +
            ' WHERE PR.datepresencereelle <= $2 ::date\n' +
            'AND PR.id_presence_theo = PT.id_presence_theorique AND PT.id_contrat = $1',
            [numContrat, date],
            function (er, res) {
                retour = {
                    erreur: null,
                    statut: null
                };
                let e = helper.handleError(er, res,'L\'enfant n\'a jamais était présent');
                retour.erreur = e.erreur;
                retour.resultats = null
                retour.statut = e.statut;
                if(retour.erreur == null){
                    let array = []
                    for (let i = 0; i<res.rows.length; i++) {
                        let datepresencereelle = new Date(res.rows[i].datepresencereelle)
                        datepresencereelle.setDate(datepresencereelle.getDate()+1)
                        array.push({
                            datepresencereelle:  res.rows[i].datepresencereelle,
                            heureArriveeReelle: res.rows[i].heure_arrivee_r,
                            heureDepartReelle: res.rows[i].heure_depart_r,
                            prendsGouterReelle: res.rows[i].prends_gouter_r,
                            id_presence_reelle: res.rows[i].id_presence_reelle,
                            heureArriveePrevue: res.rows[i].heure_arrivee,
                            heureDepartPrevue: res.rows[i].heure_depart,
                            prendsGouterPrevue: res.rows[i].prends_gouter,
                            arriveeRetard: res.rows[i].heure_arrivee_r > res.rows[i].heure_arrivee,
                            partieAvant: res.rows[i].heure_depart_r < res.rows[i].heure_depart,
                            absence_justifiee: res.rows[i].absence_justifiee
                        })
                    }
                    retour.resultats = array
                    console.log(retour)
                }
                callback(retour)
            })
    }
}

module.exports = presenceReelle;