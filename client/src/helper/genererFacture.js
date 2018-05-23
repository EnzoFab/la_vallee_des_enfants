import FactureService from '../services/FactureService'
import PresenceService from '../services/PresenceService'
import FonctionMath from './FonctionMath'
import moment from 'moment'
import 'moment/locale/fr'

import TypeService from '../services/TypeService'
// import ContratService from '../services/ContratService'

export default {
  async generationFacture (factureParam) {
    /* ------------------------ INITIALISATION VARIABLES ET CONSTANTES ------------------------- */

    try {
      var facture = factureParam // la facture qui va subir toutes les transformations nécessaires et qui sera renvoyée

      /* ~~~~ Recupere toutes les informations générales, perennes ~~~~ */
      const basic = await FactureService.getInfosBasics(facture.idContrat)
      let infosBasiques = basic.data

      /* ~~~~ recuperation de tous les feries du mois ~~~~ */
      let feries = this.JoursFeries(2018)
      console.log('LES JOURS FERIES SONT :::    ' + feries)

      for (var i = 0; i < feries.length; i++) {
        if (feries[i].getMonth() === facture.mois - 1) {
          facture.datesJoursFeries.push(feries[i])
        }
      }

      /* ~~~~ récupération des présences ~~~~ */
      const presencesTheo = await PresenceService.getAllPresencesTheoriquesByContrat(facture.idContrat)
      let presencesTheoriques = presencesTheo.data // tableau des presences theoriques de l'enfant : ajouter .presencestheoriques

      const presencesReelles = await PresenceService.getAllPresencesReellesMoisByContrat(facture.idContrat, facture.mois, facture.annee)
      let presencesreelles = presencesReelles.data // tableau des presences reelles de l'enfant : ajouter .presences

      /* ~~~~ récupération des frais (entretien + gouter ~~~~ */
      /* const gouter = TypeService.gouter()
       let prixGouter = gouter.data.gouter */

      const ent = await TypeService.indemnitesJour()
      let prixEntretien = ent.data.entretien

      /* -------------------------- CORPS DE LA FONCTION / TRAITEMENT ----------------------------- */

      /* ~~~~ traitements préparatifs ~~~~ */
      // initialisation des parametres de base de la facture
      facture = await this.initDonneesBasics(facture, infosBasiques)

      // initialisation des jours
      facture = await this.calcNombreJoursTheoriques(facture, presencesTheoriques)

      // jours theoriques supposes etre travaillés
      let daySupposedToBeWorked = await this.getAllDaySupposedToBeWorkedForChild(4, 2018, presencesTheoriques)

      /* ~~~~ coeur du traitement ~~~~ */
      // calculs des variables pour facture (ou partie de facture au forfait
      facture = await this.traitementPresencesPourForfait(daySupposedToBeWorked, presencesreelles, presencesTheoriques, facture)

      // Tous les "petits" calculs
      facture = this.calcNbJoursActivite(facture)
      facture = this.calcNbHeuresNormales(facture)
      facture = this.calcDateLimiteDePaiement(facture)
      facture = this.calcTotIndemnitesPourAbs(facture, prixEntretien)
      facture = this.calcTotIndemnitesPourFeries(facture, prixEntretien)
      facture = this.calcTotCoutSuppPresencesExcept(facture, prixEntretien)
      facture = this.calcTotIndemnitesMensuelles(facture, prixEntretien)
      facture = this.calcSalaireNet(facture)
      facture = this.calcPrixCongesPayes(facture)
      facture = this.calcTotalIndemnites(facture)
      facture = this.calcTotalNetAPayer(facture)

      return facture
    } catch (e) {
      console.log(e)
    }
  },

  // donne à la facture les parametres de base
  async initDonneesBasics (facture, infosBasiques) {
    facture.nomEnfant = infosBasiques.nom_enfant
    facture.prenomEnfant = infosBasiques.prenom_enfant
    facture.nomEmployeur = infosBasiques.nom_usage_employeur
    facture.prenomEmployeur = infosBasiques.prenom_employeur
    facture.rueEmployeur = infosBasiques.rue_employeur
    facture.cpEmployeur = infosBasiques.cp_employeur
    facture.villeEmployeur = infosBasiques.ville_employeur
    facture.nomAssMat = infosBasiques.nom_usage_am
    facture.prenomAssMat = infosBasiques.prenom_am
    facture.rueAssMat = infosBasiques.rue_am
    facture.cpAssMat = infosBasiques.cp_am
    facture.villeAssMat = infosBasiques.ville_am
    facture.salaireHoraireNormal = infosBasiques.tarif
    facture.taux_majore = infosBasiques.taux_majore
    facture.dateLimitePaiement = infosBasiques.jour_paiement
    facture.nbSemainesCongesAssMat = infosBasiques.nb_semaines_conges
    facture.nbSemainesCongesEmployeur = infosBasiques.nb_semaines_conges_parents
    facture.dateDebAdaptation = infosBasiques.date_deb_periode_adaptation
    facture.dateFinAdaptation = infosBasiques.date_fin_periode_adaptation
    facture.dateFinContrat = infosBasiques.date_fin_contrat
    facture.nbHeureSemaine = infosBasiques.nb_heures_semaine
    return facture
  },

  async genererFacture (idContrat, numMois, annee) {
    try {

      // l'objet facture qui contient tous les éléments pour écrire la facture, il va être modifié tout au long de la page
      // de façon à contenir les informations correctes qui concernent le mois de la facture

    } catch (e) {
      console.log(e)
    }
  },

  // calcul du nombre de jours où l'enfant est theoriquement présent
  async calcNombreJoursTheoriques (facture, presencesTheoriques) {
    var presTheo
    for (var i = 0; i < presencesTheoriques.presencestheoriques.length; i++) {
      presTheo = presencesTheoriques.presencestheoriques[i]
      if (presTheo.heure_arrivee != null) {
        facture.nbJoursPresenceTheo = facture.nbJoursPresenceTheo + 1
      }
    }
    return facture
  },
  // calcul du nombre de jours d'activites
  calcNbJoursActivite (facture) {
    facture.nombreJoursActivite = facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) / 12 - facture.nbJoursAbsence + facture.nbJoursPresenceExcept
    console.log('calc nb de jours d\'activite ' + facture.nombreJoursActivite)
    return facture
  },

  // calcul du nombre d'heures normales du mois
  calcNbHeuresNormales (facture) {
    facture.nombreHeuresNormales = ((52 - facture.nbSemainesCongesEmployeur - facture.nbSemainesCongesAssMat) / 12) * facture.nbHeureSemaine - facture.nbHeuresAbsencesJust - facture.nbHeuresRetardsJustifies
    console.log('calc nb heures normales ' + facture.nombreHeuresNormales)
    return facture
  },

  // calcul date limite de paiement -> voir si est à faire
  calcDateLimiteDePaiement (facture) {
    let date = new Date(facture.annee, facture.mois, (facture.dateLimitePaiement + 5))
    facture.dateLimitePaiement = moment(date).format('L')
    console.log(date)
    return facture
  },

  // calcul du total des indemnites pour absence
  calcTotIndemnitesPourAbs (facture, prixEntretien) {
    facture.coutTotalIndemnitesAbs = facture.nbJoursAbsence * prixEntretien
    console.log('calc total indemnites pour absences ' + facture.coutTotalIndemnitesAbs)
    return facture
  },

  // calcul du total des indemnites pour jours feries
  calcTotIndemnitesPourFeries (facture, prixEntretien) {
    facture.coutTotalIndemnitesJoursFeries = (facture.nbJourFeriesNonPayes + facture.nbJoursFériés) * prixEntretien
    console.log('calc tot indemnites jours feries ' + facture.coutTotalIndemnitesJoursFeries)
    return facture
  },

  // calcul du total des indemnites à ajouter pour presence exceptionnelle
  calcTotCoutSuppPresencesExcept (facture, prixEntretien) {
    facture.coutTotalJoursExceptionnels = facture.nbJoursPresenceExcept * prixEntretien
    console.log('calc tot cout supp presence exceptionnelle ' + facture.coutTotalJoursExceptionnels)
    return facture
  },

  // calcul indemnites entretien mensuelles --- A FAIRE EN FN DE COMMENT CA SE PASSE POUR LES GOUTERS
  calcTotIndemnitesMensuelles (facture, prixEntretien) {
    facture.indemnitesMensuelles = (prixEntretien * facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) / 12).toFixed(2)
    console.log('calc total indemnites mensuelles ' + facture.indemnitesMensuelles)
    return facture
  },

  // calcul du salaire net
  calcSalaireNet (facture) {
    facture.salaireNet = (facture.nombreHeuresNormales * facture.salaireHoraireNormal + facture.nombreHeuresMajorees * facture.salaireHoraireNormal * (1 + ((facture.taux_majore) / 100))).toFixed(2)
    console.log('calc salaire net ' + facture.salaireNet)
    return facture
  },

  // calcul des conges payés
  calcPrixCongesPayes (facture) {
    facture.coutCongesPayes = (facture.salaireNet * 0.1).toFixed(2)
    console.log('calc conges payes ' + facture.coutCongesPayes)
    return facture
  },

  // calcul du total des indemnites  --- SOUSTRAIRE EN PLUS LES GOUTERS SI BESOIN!!!!!
  calcTotalIndemnites (facture) {
    facture.coutTotalDesIndemnites = (facture.indemnitesMensuelles - facture.coutTotalIndemnitesAbs - facture.coutTotalIndemnitesJoursFeries + facture.coutTotalJoursExceptionnels).toFixed(2)
    console.log('calc total indemnites ' + facture.coutTotalDesIndemnites)
    return facture
  },

  // calcul du montant net à payer
  calcTotalNetAPayer (facture) {
    console.log(facture.salaireNet)
    console.log(facture.coutCongesPayes)
    console.log(facture.totalDesIndemnites)
    facture.montantNetAPayer = (parseInt(facture.salaireNet) + parseInt(facture.coutCongesPayes) + parseInt(facture.coutTotalDesIndemnites)).toFixed(2)
    console.log(facture.montantNetAPayer)
    return facture
  },

  // recupere tous les jours d'un mois auxquels l'ass mat a doit garder l enfant
  // presencesTheoriques est le tableau des presences theoriques de l'enfant

  getAllDaySupposedToBeWorkedForChild (numMois, annee, presencesTheoriques) {
    let nbJoursMois = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    var nbJours = 0 // nombre de jours dans le mois
    var joursTravailles = [] // tous les jours du mois où l'ass mat est supposée travailler pour l'enfant
    var idTypesJoursTheoriques = [] // tous les id des jours pendant lesquels l'ass mat est supposée travailler pour l'enfant

    // on commence par recuperer tous les id types jours auxquels l'ass mat doit travailler pour l'enfant
    var presTheo
    for (var i = 0; i < presencesTheoriques.presencestheoriques.length; i++) {
      presTheo = presencesTheoriques.presencestheoriques[i]
      if (presTheo.heure_arrivee != null) {
        if (presTheo.id_type_jour === 0) {
          presTheo.id_type_jour = 7
        }
        idTypesJoursTheoriques.push(presTheo.id_type_jour)
      }
    }

    // on recherche le nombre de jours du mois (cas particulier pour fevrier pris en compte)
    if (numMois === 2) {
      if (annee % 4 === 0) {
        nbJours = nbJoursMois[1][1]
      } else {
        nbJours = nbJoursMois[1][0]
      }
    } else {
      nbJours = nbJoursMois[numMois - 1]
    }

    // on récupère tous les jours du mois supposée être travaillés
    for (let j = 1; j < nbJours + 1; j++) {
      var date = new Date(annee, numMois - 1, j)
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
    var tempsJournee // contient le nombre d'heures travaillées theoriquement dans la journée

    facture.datesJoursFeries.push((new Date('2018-04-23')).getDate())
    console.log('feries : ', facture.datesJoursFeries)

    while (i < presencesTheoDuMois.length || j < presencesReellesDuMois.presencesreelles.length) {
      datereelle = new Date(presencesReellesDuMois.presencesreelles[j].datepresencereelle)

      // si une presence reelle a bien ete enregistrée pour cette date
      if (datereelle.getDate() === presencesTheoDuMois[i].getDate()) {
        idJour = datereelle.getDay()
        var depart = presencesTheo.presencestheoriques[idJour - 1].heure_depart
        var arrivee = presencesTheo.presencestheoriques[idJour - 1].heure_arrivee

        tempsJournee = this.calcDuree(arrivee, depart)

        // facture.nombreHeuresNormales = facture.nombreHeuresNormales + tempsJournee

        // regarde s'il s'agit d'une absence
        if ((presencesReellesDuMois.presencesreelles[j]).absence_justifiee != null) {
          // regarde si est une absence justifiee ou non
          if (presencesReellesDuMois.presencesreelles[j].absence_justifiee === true) {
            facture.nbJoursAbsJust = facture.nbJoursAbsJust + 1
            facture.nbHeuresAbsencesJust = facture.nbHeuresAbsencesJust + tempsJournee

            console.log('nb jours abs et nb heures normales  :  ' + facture.nbJoursAbsJust + '  ' + facture.nombreHeuresNormales)
          } else {
            facture.nbJoursAbsNonJust = facture.nbJoursAbsNonJust + 1
          }
        } else { // cas d'une presence normale
          // traitement sur l'heure d arrivee
          if (presencesReellesDuMois.presencesreelles[j].heure_arrivee_r !== presencesTheo.presencestheoriques[idJour - 1].heure_arrivee) {
            compHeureArrivee = this.calcDuree(presencesReellesDuMois.presencesreelles[j].heure_arrivee_r, presencesTheo.presencestheoriques[idJour - 1].heure_arrivee)

            // si c'est un retard 'justifié'
            if (compHeureArrivee > 0) {
              console.log('coomp h arr > 0', compHeureArrivee)
              facture.nbHeuresRetardsJustifies = facture.nbHeuresRetardsJustifies + compHeureArrivee

              // si arrive en avance
            } else if (compHeureArrivee < 0) {
              console.log('coomp h arr < 0', compHeureArrivee)
              facture.nombreHeuresSupp = facture.nombreHeuresSupp + compHeureArrivee
            }
          }

          // traitement sur l'heure de depart
          if (presencesReellesDuMois.presencesreelles[j].heure_depart_r !== presencesTheo.presencestheoriques[idJour - 1].heure_depart) {
            compHeureDepart = this.calcDuree(presencesReellesDuMois.presencesreelles[j].heure_depart_r, presencesTheo.presencestheoriques[idJour - 1].heure_depart)

            // si est un départ anticipé justifié (on le met dans retard justifie)
            if (compHeureDepart < 0) {
              facture.nbHeuresRetardsJustifies = facture.nbHeuresRetardsJustifies - compHeureDepart

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
        console.log('coucou du else')
        if (datereelle.getDate() > presencesTheoDuMois[i].getDate()) {
          idJour = presencesTheoDuMois[i].getDay()

          /* var depart = presencesTheo.presencestheoriques[idJour - 1].heure_depart
          var arrivee = presencesTheo.presencestheoriques[idJour - 1].heure_arrivee

          tempsJournee = this.calcDuree(arrivee, depart)

          facture.nombreHeuresNormales = facture.nombreHeuresNormales + tempsJournee */

          // si c'est un jour férié

          if (facture.datesJoursFeries.includes(presencesTheoDuMois[i].getDate())) {
            facture.nbJoursFériés = facture.nbJoursFériés + 1
          }

          i = i + 1

          // il y a une date reelle non renseignee dans les dates theoriques i.e. presence exceptionnelle
        } else {
          facture.nombreHeuresSupp = facture.nombreHeuresSupp + this.calcDuree(presencesReellesDuMois.presencesreelles[j].heure_arrivee_r, presencesReellesDuMois.presencesreelles[j].heure_depart_r)
          facture.nbJoursPresenceExcept = facture.nbJoursPresenceExcept + 1
          console.log('nb j excep : ', facture.nbJoursPresenceExcept)
          console.log('nb h supp  : ', facture.nombreHeuresSupp)

          j = j + 1
        }
      }
    }

    console.log('la nouvelle facture :  ', facture)
    return facture
  },

  // VOIR SI UTILE dateDeb correspond a la date du mois à laquelle debute la periode d'adaptation (sera 1 si adaptation commencée le mois précédent)
  // VOIR SI UTILE dateFin correspond à la date du mois à laquelle termine la periode d'adaptation (sera le dernier du mois si celle-ci n'est pas terminée le mois courant)
  // presencesReellesDuMois correspond au tableau des presences reelles trié par dates croissantes
  traitementPresencesPourAdaptation (dateDeb, dateFin, presencesReellesDuMois, facture) {
    for (let i = 0; i < presencesReellesDuMois.length; i++) {
      facture.nombreHeuresNormales = facture.nombreHeuresNormales + (presencesReellesDuMois[i].heure_depart_r - presencesReellesDuMois[i].heure_arrivee_r)
    }
    return facture
  },

  // calcule la difference en heures de deux temps avec temps2 > temps1
  calcDuree (temps1, temps2) {
    var heure1 = null
    var heure2 = null

    var minute1 = null
    var minute2 = null

    // split le temps de facon a obtenir les heures et les minutes distinctement
    let tempsMinute1 = null // temps total en minute
    let tempsMinute2 = null // temps total en heure
    let splitPetit = temps1.split(':', 2)
    let splitGrand = temps2.split(':', 2)

    heure1 = splitPetit[0]
    console.log(heure1)
    minute1 = splitPetit[1]
    console.log(minute1)

    heure2 = splitGrand[0]
    minute2 = splitGrand[1]

    tempsMinute1 = parseInt(heure1) * 60 + parseInt(minute1)
    tempsMinute2 = parseInt(heure2) * 60 + parseInt(minute2)

    // calcul de la duree
    console.log('les temps  ' + tempsMinute1 + '  ' + tempsMinute2)
    var duree = tempsMinute2 - tempsMinute1
    console.log('1   ', duree)
    duree = FonctionMath.arrondi(duree / 60, 1)
    console.log('2  ', duree)

    return duree
  },
  JoursFeries (an) {
    var JourAn = new Date(an + '-01-01')
    var FeteTravail = new Date(an + '-05-01')
    var mai45 = new Date(an + '-05-08')

    var FeteNationale = new Date(an + '-07-14')
    var Assomption = new Date(an + '-08-15')
    var Toussaint = new Date(an + '-11-01')
    var Armistice = new Date(an + '-11-11')
    var Noel = new Date(an + '-12-25')
    // var SaintEtienne = new Date(an +'-12-26')

    var G = an % 19
    var C = Math.floor(an / 100)
    var H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    var I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    var J = (an * 1 + Math.floor(an / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    var L = I - J
    var MoisPaques = 3 + Math.floor((L + 40) / 44)
    var JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    var Paques = new Date(an, MoisPaques, JourPaques)
    // var VendrediSaint = new Date(an, MoisPaques-1, JourPaques-2)
    var LundiPaques = new Date(an, MoisPaques - 1, JourPaques + 1)
    var Ascension = new Date(an, MoisPaques - 1, JourPaques + 39)
    var Pentecote = new Date(an, MoisPaques - 1, JourPaques + 49)
    var LundiPentecote = new Date(an, MoisPaques - 1, JourPaques + 50)

    console.log('LUNDI DE PAAAQUES : ' + LundiPaques)

    return [JourAn, Paques, LundiPaques, FeteTravail, mai45, Ascension, Pentecote, LundiPentecote,
      FeteNationale, Assomption, Toussaint, Armistice, Noel]
  }
}
