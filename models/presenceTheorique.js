let db = require('../config/db');
let helper = require('../helpers/helper');

let presenceTheorique = {
    getAll: function (callback) {
        db.query(
            'SELECT * FROM public.presencetheorique',
            [],
            function (err, result){
                retour = {
                    erreur: null,
                    presencestheoriques: null,
                    statut: null
                };
                let e = helper.handleError(err, result,'Aucune présence theorique');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id: result.rows[i].id_presence_theorique,
                            heureArrivee: result.rows[i].heure_arrivee,
                            heureDepart: result.rows[i].heure_depart,
                            prendsGouter: result.rows[i].prends_gouter
                        });
                    }
                    retour.presencestheoriques = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            }
        );
    },
    /**
     * Recupère tous les enfants qui doivent être présent aujourd'hui
     * @param numDay
     * @param callback
     */
    getAllChildrenOfTheDay: function (numDay, callback) {
        console.log('numDuJour : ' + numDay)
        db.query(
            'SELECT * ' +
            'FROM (( ' +
            // tous les enfants qui sont theoriquement présents le jour de type 'numDay'
                'SELECT * ' +
                'FROM public.presencetheorique pt, public.contrat co, public.enfant en ' +
                'WHERE pt.id_contrat = co.id_contrat AND co.id_enfant = en.id_enfant AND co.date_fin IS NULL AND pt.heure_arrivee IS NOT NULL AND pt.id_type_jour = $1 ' +
            ') UNION (' +
            // tous les enfants qui ne sont pas là theoriquement mais qui viennent exceptionnellement ce jour là
                'SELECT pt2.prends_gouter, pt2.id_contrat, pt2.id_type_jour, pt2.heure_depart, ' +
                    'pt2.id_presence_theorique, pt2.heure_arrivee, co2.id_contrat, co2.date_debut, co2.date_fin,  ' +
                    'co2.nb_semaines_conges_parents, co2.tarif, co2.nb_heures_semaine, co2.taux_majore, co2.date_deb_periode_adaptation, ' +
                    'co2.date_fin_periode_adaptation, co2.id_enfant, co2.id_mode_paiement, co2.id_am, co2.id_employeur, co2.jour_paiement, ' +
                    'co2.id_type_contrat, en2.id_enfant, en2.nom_enfant, en2.prenom_enfant, en2.date_naissance_enfant, en2.sexe ' +
                'FROM public.presencetheorique pt2, public.contrat co2, public.enfant en2, public.presencereelle pr2 ' +
                'WHERE pt2.id_contrat = co2.id_contrat AND co2.id_enfant = en2.id_enfant ' +
                    'AND pt2.id_presence_theorique = pr2.id_presence_theo ' +
                    'AND co2.date_fin IS NULL ' +
                    'AND pt2.heure_arrivee IS NULL ' +
                    'AND pr2.datepresencereelle = CURRENT_DATE ' +
                    'AND pt2.id_type_jour = $1 ' +
            ')) AS requete ' +
            'ORDER BY nom_enfant, prenom_enfant',
            [numDay],
            function (err, result) {
                retour = {
                    erreur: null,
                    presencestheoriques: null,
                    statut: null
                };
                let e = helper.handleError(err, result, 'Pas de presence prévue')
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if (retour.erreur == null) {
                    var array = []
                    for (var i = 0; i < result.rows.length; i++) {
                        array.push({
                            sexe: result.rows[i].sexe,
                            id_contrat: result.rows[i].id_contrat,
                            id_enfant: result.rows[i].id_enfant,
                            id_presence_theo: result.rows[i].id_presence_theorique,
                            nom_enfant: result.rows[i].nom_enfant,
                            prenom_enfant: result.rows[i].prenom_enfant,
                            prend_gouter: result.rows[i].prends_gouter,
                            heure_arrivee: result.rows[i].heure_arrivee,
                            heure_depart: result.rows[i].heure_depart
                        });
                    }
                    retour.presencestheoriques = array
                    console.log(retour.presencestheoriques)
                    retour.statut = 200
                }

                callback(retour);
            }
        );
    },

    // recupere toutes les presences theoriques d'un contrat
    getAllPresencesTheoriquesByIdContrat (idContrat, callback) {
        db.query(
            'SELECT * ' +
            'FROM public.presencetheorique ' +
            'WHERE id_contrat = $1 ',
            [idContrat],
            function (err, result){
                retour = {
                    erreur: null,
                    presencestheoriques: null,
                    statut: null
                };
                let e = helper.handleError(err, result,'Aucune présence theorique');
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if(retour.erreur == null){
                    var array = []
                    for(var i = 0; i < rslt.rows.length; i++){
                        array.push({
                            id: result.rows[i].id_presence_theorique,
                            heure_arrivee: result.rows[i].heure_arrivee,
                            heure_depart: result.rows[i].heure_depart,
                            prend_gouter: result.rows[i].prends_gouter,
                            id_type_jour: result.rows[i].id_type_jour
                        });
                    }
                    retour.presencestheoriques = array;
                    retour.statut = 200
                }
                callback(retour); // on passe en parametre l'objet retour
                // il faudra verifier si une erreur existe ou non
            })
    },

    getChildrenNonPresentsOfTheDay: function (numDay, callback) {
        console.log('coucou')
        console.log('numDuJour : ' + numDay)
        db.query(
            '(' +
                'SELECT * ' +
                'FROM public.presencetheorique pt, public.contrat co, public.enfant en ' +
                'WHERE co.id_enfant = en.id_enfant ' +
                    'AND co.id_contrat=pt.id_contrat ' +
                    'AND pt.id_type_jour = $1 ' +
                    'AND pt.heure_arrivee IS NULL ' +
                    'AND co.date_fin IS NULL ' +
            ') EXCEPT ( ' +
                'SELECT pt2.prends_gouter, pt2.id_contrat, pt2.id_type_jour, pt2.heure_depart, pt2.id_presence_theorique, pt2.heure_arrivee, co2.id_contrat, co2.date_debut,  co2.date_fin, ' +
                    'co2.nb_semaines_conges_parents, co2.tarif, co2.nb_heures_semaine, co2.taux_majore, co2.date_deb_periode_adaptation, ' +
                    'co2.date_fin_periode_adaptation, co2.id_enfant, co2.id_mode_paiement, co2.id_am, co2.id_employeur, co2.jour_paiement, ' +
                    'co2.id_type_contrat, en2.id_enfant, en2.nom_enfant, en2.prenom_enfant, en2.date_naissance_enfant, en2.sexe ' +
                'FROM public.contrat co2, public.enfant en2, public.presencetheorique pt2, public.presencereelle pr2 ' +
                'WHERE pt2.id_contrat = co2.id_contrat AND co2.id_enfant = en2.id_enfant ' +
                    'AND pt2.id_presence_theorique = pr2.id_presence_theo ' +
                    'AND co2.date_fin IS NULL ' +
                    'AND pt2.heure_arrivee IS NULL ' +
                    'AND pr2.datepresencereelle = CURRENT_DATE ' +
                    'AND pt2.id_type_jour = $1' +
            ')',
            [numDay],
            function (err, result) {
                retour = {
                    erreur: null,
                    nonpresencestheoriques: null,
                    statut: null
                };
                let e = helper.handleError(err, result, 'Pas de non presence trouvée')
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if (retour.erreur == null) {
                    var array = []
                    for (var i = 0; i < result.rows.length; i++) {
                        array.push({
                            sexe: result.rows[i].sexe,
                            id_contrat: result.rows[i].id_contrat,
                            id_enfant: result.rows[i].id_enfant,
                            id_presence_theo: null,
                            nom_enfant: result.rows[i].nom_enfant,
                            prenom_enfant: result.rows[i].prenom_enfant,
                            prend_gouter: null,
                            heure_arrivee: null,
                            heure_depart: null,
                        });
                    }
                    retour.absencestheoriques = array
                    retour.statut = 200
                }

                callback(retour);
            }
        );
    },

    recupIdTheoDuJour: function (numDay, numEnfant, callback) {
        db.query(
            'SELECT id_presence_theorique ' +
            'FROM public.contrat co, public.enfant en, public.presencetheorique pt ' +
            'WHERE co.id_contrat = pt.id_contrat AND en.id_enfant = co.id_enfant AND pt.id_type_jour = $1 AND en.id_enfant = $2',
            [numDay, numEnfant],
            function (err, result) {
                retour = {
                    erreur: null,
                    id: null,
                    statut: null
                };
                let e = helper.handleError(err, result, 'Pas de non presence trouvée')
                retour.erreur = e.erreur;
                retour.statut = e.statut;
                if (retour.erreur == null) {
                    retour.id = result.rows[0].id_presence_theorique
                    retour.statut = 200
                }
                console.log('ret' + retour.id)
                callback(retour);
            }
        );
    },

    create: function (presenceTheorique, callback) {
        db.query("INSERT INTO public.presencetheorique(heure_arrivee, heure_depart, prends_gouter, id_contrat, id_type_jour) VALUES ($1, $2, $3, $4, $5) returning id_presence_theorique",
            [presenceTheorique.heureArrivee, presenceTheorique.heureDepart, presenceTheorique.prendGouter, presenceTheorique.id_contrat, presenceTheorique.id_type_jour],
            function (err, result) {
                let retour = {
                    statut: null,
                    erreur: null,
                    id_presence_theorique: null
                };
                if (err) {
                    retour.statut = 500
                    retour.erreur = err.toString()
                } else {
                    retour.statut = 200
                    retour.id_presence_theorique = result.rows[0].id_presence_theorique
                }
                callback(retour);
            });
    },

    update: function (numPresence, presenceTheorique, callback) {
        db.query('UPDATE public.presencetheorique SET heure_arrivee = $1, heure_depart = $2, prends_gouter = $3, id_contrat = $4, id_type_jour = $5 WHERE id_presence_theorique = $6',
            [presenceTheorique.heureArrivee, presenceTheorique.heureDepart, presenceTheorique.prendGouter, presenceTheorique.id_contrat, presenceTheorique.id_type_jour, numPresence],
            function (e, result) {
                let retour = {
                    erreur : null,
                    statut: null
                };
                if (e) {
                    retour.statut = 500
                    retour.erreur = e.toString()
                }
                else {
                    retour.statut = 200
                }
                callback(retour)
            })
    },
}

module.exports = presenceTheorique;