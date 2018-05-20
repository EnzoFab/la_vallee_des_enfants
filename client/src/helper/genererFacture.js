import FactureService from '../services/FactureService';
import PresenceService from '../services/PresenceService';
import TypeService from '../services/TypeService'
import ContratService from '../services/ContratService'


export default {
  data () {
    // Recupere toutes les informations générales
    const basic = FactureService.getInfosBasics(idContrat)
    let infosBasiques = basic.data

    const gouter = TypeService.gouter()
    let prixGouter = gouter.data.gouter

    const entretien = TypeService.indemnitesJour()
    let prixEntretien = entretien.data.entretien

    const presencesTheo = ContratService.getPresencesByContrat(idContrat)
    const presencesTheoriques = presencesTheo // tableau des presences theoriques de l'enfant trié par id type jour

    let nbJoursMois = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

      var facture = {
      /* -- Infos à afficher sur la facture -- */
      debutPeriode: null,
      finPeriode: null,
      nomEnfant: infosBasiques.nom_enfant,
      prenomEnfant: infosBasiques.prenom_enfant,
      nomEmployeur: infosBasiques.nom_usage_employeur,
      prenomEmployeur: infosBasiques.prenom_employeur,
      rueEmployeur: infosBasiques.rue_employeur,
      cpEmployeur: infosBasiques.cp_employeur,
      villeEmployeur: infosBasiques.ville_employeur,
      nomAssMat: infosBasiques.nom_usage_am,
      prenomAssMat: infosBasiques.prenom_am,
      rueAssMat: 'il faut ajouter a bd',
      cpAssMat: '12345',
      villeAssMat: 'idemAdresse',
      nombreJoursActivite: 0,
      nombreHeuresSupp: 0,
      nombreHeuresNormales: 0, // va etre initier à facture.nombre heure normales qui est le nb d heures supp choisies a taux normal
      nombreHeuresMajorees: 0,
      nombreJoursCongesPayes: 2.5,
      salaireHoraireNormal: infosBasiques.tarif,
      taux_majore: infosBasiques.taux_majore,
      dateLimitePaiement: infosBasiques.jour_paiement,
      nbJoursAbsJust: 0, // nb jours absences justifiée
      nbJoursAbsNonJust: 0, //nb jours absences non justifiée
      nbJoursAbsence: 0, //nb jours abs justifiées et non justifiées
      nbJoursFériés: 0,
      nbJoursPresenceExcept: 0, // nb de jours où l'enfant est venu exceptionnellement
      nbGoutersSupp: 0, // nombre de gouters
      nbGoutersADeduire: 0, // en attente repons leo**
      indemnitesMensuelles: 0, // cout des indemnites
      coutTotalGouterSupp: 0, // en attente reponse leo**
      coutGouterADeduire: 0, // en attente reponse leo**
      coutTotalIndemnitesAbs: 0, // cout total des indemnites a deduire pour absence
      coutTotalIndemnitesJoursFeries: 0, // cout total des indemnites a deduire pour feries
      coutTotalJoursExceptionnels: 0, // cout total des frais d'entretien a ajouter pour presences suplementaires
      salaireNet: 0,
      coutcongesPayes: 0, // 10% du salaire net
      totalDesIndemnites: 0,
      montantNetAPayer: 0,
      /* -- Infos permettant de faire les calculs pour infos à afficher -- */
      nbJoursPresenceTheo: 0,
      nbSemainesCongesAssMat: infosBasiques.nb_semaines_conges,
      nbSemainesCongesEmployeur: infosBasiques.nb_semaines_conges_parents,
      nbJourFeriesNonPayes: 0, // nombre de jours feries où l assmat ne doit pas etre payee (concerne le 1 er mai)
      nbHeuresAbsencesJust: 0,
      nbHeuresRetardsJustifies: 0, // nombre d'heures de retard à decompter car consideres comme justifies par l ass mat
      datesJoursFeries: [], // sera initialisé avec les jours feries du mois (uniquement les jours - pas mois/annee)
      dateDebAdaptation: infosBasiques.date_deb_periode_adaptation,
      dateFinAdaptation: infosBasiques.date_fin_periode_adaptation,
      dateFinContrat: infosBasiques.date_fin_contrat
    }
  },

  async GenererFacture (idContrat, numMois, annee) {


    try {


      // l'objet facture qui contient tous les éléments pour écrire la facture, il va être modifié tout au long de la page
      // de façon à contenir les informations correctes qui concernent le mois de la facture


    } catch (e) {
      console.log(e)
    }
  },

  //calcul du nombre de jours où l'enfant est theoriquement présent
  calcNombreJoursTheoriques(facture) {
    for (presTheo in presencesTheoriques) {
      if (presTheo.heure_arrivee != null) {
        this.facture.nbJoursPresenceTheo = facture.nbJoursPresenceTheo + 1
        console.log('calc nombre de jours theorique ' + facture.nbJoursPresenceTheo)
        return facture
      }
    }
  },
  // calcul du nombre de jours d'activites
  calcNbJoursActivite(facture) {
    facture.NombreJoursActivite = facture.nbJoursPresenceTheo*(52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) - facture.nbJoursAbsence + facture.nbJoursPresenceExcept
    console.log('calc nb de jours d\'activite ' + facture.NombreJoursActivite)
    return facture
  },

  // calcul du nombre d'heures normales du mois
  calcNbHeuresNormales(facture) {
    facture.nombreHeuresNormales = (52 - facture.nbSemainesCongesEmployeur - facture.nbSemainesCongesAssMat)/12 + facture.nombreHeuresNormales - facture.nbHeuresAbsencesJust - facture.nbHeuresRetardsJustifies
    console.log('calc nb heures normales ' + facture.nombreHeuresNormales)
    return facture
  },

  // calcul date limite de paiement -> voir si est à faire
  calcDateLimiteDePaiement (facture) {

  },

  // calcul du total des indemnites pour absence
  calcTotIndemnitesPourAbs (facture) {
    facture.coutTotalIndemnitesAbs = facture.nbJoursAbsence * prixEntretien
    console.log('calc total indemnites pour absences ' + facture.coutTotalIndemnitesAbs)
    return facture
  },

  // calcul du total des indemnites pour jours feries
  calcTotIndemnitesPourFeries (facture) {
    facture.coutTotalIndemnitesJoursFeries = (facture.nbJourFeriesNonPayes + facture.nbJoursFériés) * prixEntretien
    console.log('calc tot indemnites jours feries ' + facture.coutTotalIndemnitesJoursFeries)
    return facture
  },

  // calcul du total des indemnites à ajouter pour presence exceptionnelle
  calcTotCoutSuppPresencesExcept (facture) {
    facture.coutTotalJoursExceptionnels = facture.nbJoursPresenceExcept * prixEntretien
    console.log('calc tot cout supp presence exceptionnelle ' + facture.coutTotalJoursExceptionnels)
    return facture
  },

  // calcul indemnites entretien mensuelles --- A FAIRE EN FN DE COMMENT CA SE PASSE POUR LES GOUTERS
  calcTotIndemnitesMensuelles (facture) {
    facture.indemnitesMensuelles = prixEntretien * facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) / 12
    console.log('calc total indemnites mensuelles ' + facture.indemnitesMensuelles)
    return facture
  },

  // calcul du salaire net
  calcSalaireNet(facture) {
    facture.salaireNet = facture.nombreHeuresNormales * 3.25 + facture.nombreHeuresMajorees * 3.25 * (1 + ((facture.taux_majore) / 100))
    console.log('calc salaire net ' + facture.salaireNet)
    return facture
  },

  // calcul des conges payés
  calcPrixCongesPayes (facture) {
    facture.coutCongesPayes = facture.salaireNet * 0.1
    console.log('calc conges payes ' + facture.coutCongesPayes)
    return facture
  },

  // calcul du total des indemnites  --- SOUSTRAIRE EN PLUS LES GOUTERS SI BESOIN!!!!!
  calcTotalIndemnites (facture) {
    facture.coutTotalDesIndemnites = facture.indemnitesMensuelles - facture.coutTotalIndemnitesAbs - facture.coutTotalIndemnitesJoursFeries + facture.coutTotalJoursExceptionnels
    console.log('calc total indemnites ' + facture.coutTotalDesIndemnites)
    return facture
  },

  // calcul du montant net à payer
  calcTotalNetAPayer (facture) {
    facture.montantNetAPayer = facture.salaireNet + facture.coutcongesPayes + facture.totalDesIndemnites
    return facture
  },

  // recupere tous les jours d'un mois auxquels l'ass mat a doit garder l enfant
      //presencesTheoriques est le tableau des presences theoriques de l'enfant
  getAllDaySupposedToBeWorkedForChild(numMois, annee, presencesTheoriques) {
    var nbJours = 0  // nombre de jours dans le mois
    var joursTravailles = [] // tous les jours du mois où l'ass mat est supposée travailler pour l'enfant
    var idTypesJoursTheoriques = [] //tous les id des jours pendant lesquels l'ass mat est supposée travailler pour l'enfant


    // on commence par recuperer tous les id types jours auxquels l'ass mat doit travailler pour l'enfant
    for (presence in presencesTheoriques) {
      if(presence.heure_arrivee != null) {
        idTypesJoursTheoriques.push(presence.id_type_jour)
      }
    }

    // on recherche le nombre de jours du mois (cas particulier pour fevrier pris en compte)
    if(numMois == 2){
      if(annee % 4 == 0){
        nbJours = nbJoursMois[1][1]
      } else {
        nbJours = nbJoursMois[1][0]
      }
    } else {
      nbJours = nbJoursMois[numMois - 1]
    }

    // on récupère tous les jours du mois supposée être travaillés
    for (var i = 1; i < nbJours - 1; i++) {
      var date = new Date(i, numMois, annee)
      if (idTypesJoursTheoriques.includes(date.getDay())) {
        joursTravailles.push(date)
      }
    }

    return joursTravailles
  },

  // retourne la

  // on fait le traitement des jours, fonction des preseneces reelles et theoriques
  // Ici s'occupe du cas où on n'est pas en periode d'adaptation
    // presencesTheoDuMois est un tableau des jours du mois où l'enfant est supposé etre present (obtenu par getAllDaySupposedToBeWorkedForChild)
    // presencesReellessDuMois est un tableau des jours (triés par date croissante) du mois où l'enfant a ete present (et avec toutes les infos heure arrivee reelle etc)
    // presencesTheo est le tableau des presences theoriques de l'enfant correspond à presencesTheo (ecrit plus avant)
    // facture est la facture qu on traite et qui va etre modifiée au fur et à mesure du traitement
  traitementPresencesPourForfait (presencesTheoDuMois, presencesReellesDuMois, presencesTheo, facture) {

    var i = 0 // indice sur presencesTheoDuMois
    var j = 0 // indice sur presencesReellesDuMois
    var datereelle // contient la valeur sous forme de date de la date de la presence reelle
    var idJour // contient la valeur de l'id type jour
    var compHeureArrivee // contient la difference entre l'heure d'arrivee reelle et theorique
    var compHeureDepart // contient la difference entre l'heure de depart reelle et theorique

    while(i < presencesTheoDuMois.length && j < presencesReellesDuMois.length) {
      datereelle = new Date(presencesReellesDuMois[j].datepresencereelle)

      // si une presence reelle a bien ete enregistrée pour cette date
      if (datereelle.getDate() == presencesTheoDuMois[i].getDate()) {
        idJour = (presencesReellesDuMois[j].datepresencereelle).getDay()
        // regarde s'il s'agit d'une absence
        if (presencesReellesDuMois[j].absence_justifiee != null) {
          // regarde si est une absence justifiee ou non
          if (presencesReellesDuMois[j].absence_justifiee == true) {
            facture.nbJoursAbsJust = facture.nbJoursAbsJust + 1
            facture.nombreHeuresNormales = facture.nombreHeuresNormales - (presencesTheo[idJour - 1].heure_arrivee - presencesTheo[idJour - 1].heure_depart)
          } else {
            facture.nbJoursAbsNonJust = facture.nbJoursAbsNonJust + 1
          }
        } else { // cas d'une presence normale

          // traitement sur l'heure d arrivee
          if (presencesReellesDuMois[j].heure_arrivee_r != presencesTheo[idJour - 1].heure_arrivee) {
            compHeureArrivee = presencesReellesDuMois[j].heure_arrivee_r - presencesTheo[idJour - 1].heure_arrivee
            // si c'est un retard 'justifié'
            if (compHeureArrivee > 0) {
              facture.nombreHeuresNormales = facture.nombreHeuresNormales - compHeureArrivee
            // si arrive en avance
            } else if (compHeureArrivee < 0) {
              facture.nombreHeuresSupp = facture.nombreHeuresSupp + compHeureArrivee
            }
          }

          // traitement sur l'heure de depart
          if (presencesReellesDuMois[j].heure_depart_r != presencesTheo[idJour - 1].heure_depart) {
            // si est un départ anticipé justifié
            compHeureDepart = presencesReellesDuMois[j].heure_depart_r - presencesTheo[idJour - 1].heure_depart
            if (compHeureDepart < 0) {
              facture.nombreHeuresNormales = facture.nombreHeuresNormales - compHeureDepart
             // si part plus tard
            } else if (compHeureDepart > 0) {
              facture.nombreHeuresSupp = facture.nombreHeuresSupp + compHeureDepart
            }
          }
        }

        j = j + 1
        i = i + 1

      } else {
        // s'il n'y a pas d'enregistrement de presence reelle correspondant a la presence theorique dans le mois
        // i.e. c'est un jour férié ou un jour de conges
        if (datereelle.getDate() > presencesTheoDuMois[i].getDate()) {
          // si c'est un jour férié
          if (facture.datesJoursFeries.includes(presencesTheoDuMois[i].getDate())) {
            facture.nbJoursFériés = facture.nbJoursFériés + 1
          }

          i = i + 1

        // il y a une date reelle non renseignee dans les dates theoriques i.e. presence exceptionnelle
        } else {
          f ùfacture.nbJoursPresenceExcept = facture.nbJoursPresenceExcept + 1

          j = j + 1
        }
      }
    }
  },

  // VOIR SI UTILE dateDeb correspond a la date du mois à laquelle debute la periode d'adaptation (sera 1 si adaptation commencée le mois précédent)
  // VOIR SI UTILE dateFin correspond à la date du mois à laquelle termine la periode d'adaptation (sera le dernier du mois si celle-ci n'est pas terminée le mois courant)
  // presencesReellesDuMois correspond au tableau des presences reelles trié par dates croissantes
  traitementPresencesPourAdaptation(dateDeb, dateFin, presencesReellesDuMois, facture) {
    for (presence in presencesReellesDuMois) {
      facture.nombreHeuresNormales = facture.nombreHeuresNormales + (presence.heure_depart_r - presence.heure_arrivee_r)
    }
    return facture
  }

}

