import FactureService from '../services/FactureService'
import PresenceService from '../services/PresenceService'
import FonctionMath from './FonctionMath'
import moment from 'moment'
import 'moment/locale/fr'
import TypeService from '../services/TypeService'

export default {
  async generationFacture (factureParam) {
    /* ------------------------ INITIALISATION letIABLES ET CONSTANTES ------------------------- */
    try {
      let facture = factureParam // la facture qui va subir toutes les transformations nécessaires et qui sera renvoyée
      let debutAdapt = null // contient la date de debut d'adaptation du mois : si datedebutadapt du contrat = le 3 du mois ce sera le 3 du moi, si elle etait le mois precedent, ce sera le 1 du mois
      let finAdapt = null // contient la date de fin d'adaptation du mois : idem que pour le debut mais avec le 30 du mois si finit mois d'apres
      let dureePourForfait = null // null si pas de periode d'adaptation durant le mois sinon vaut la duree de la periode de non adaptation

      /* ~~~~ Recupere toutes les informations générales, perennes ~~~~ */
      const basic = await FactureService.getInfosBasics(facture.idContrat)
      let infosBasiques = basic.data

      /* ~~~~ recuperation de tous les feries du mois ~~~~ */
      let feries = this.JoursFeries(facture.annee)
      // console.log('FERIIIEES   ', feries)

      for (let i = 0; i < feries.length; i++) {
        if (feries[i].getMonth() === facture.mois - 1) {
          facture.datesJoursFeries.push(feries[i].getDate())
        }
      }
      facture.datesJoursFeries.push(23)

      /* ~~~~ récupération des présences ~~~~ */
      const presencesTheo = await PresenceService.getAllPresencesTheoriquesByContrat(facture.idContrat)
      let presencesTheoriques = presencesTheo.data // tableau des presences theoriques de l'enfant : ajouter .presencestheoriques
      // console.log('PRESENCES THEOOOOOOOOOO ', presencesTheoriques)

      const presencesReelles = await PresenceService.getAllPresencesReellesMoisByContrat(facture.idContrat, facture.mois, facture.annee)
      let presencesreelles = presencesReelles.data // tableau des presences reelles de l'enfant : ajouter .presences
      // console.log(presencesreelles.presencesreelles)
      // console.log(presencesreelles)

      /* ~~~~ récupération des frais (entretien + gouter ~~~~ */
      const gouter = await TypeService.gouter()
      let prixGouter = gouter.data.gouter

      const ent = await TypeService.indemnitesJour()
      let prixEntretien = ent.data.entretien

      let JoursNonAdapt = [] // contient les jours du mois qui ne sont pas de la periode d'adaptation et supposés etre travaillés
      let JoursreelsPourNonAdapt = [] // contient les jours reels du mois qui ne sont pas de la periode d'adaptation

      /* -------------------------- CORPS DE LA FONCTION / TRAITEMENT ----------------------------- */

      /* ~~~~ traitements préparatifs ~~~~ */
      // initialisation des parametres de base de la facture
      facture = await this.initDonneesBasics(facture, infosBasiques)

      // initialisation des jours
      facture = await this.calcNombreJoursTheoriques(facture, presencesTheoriques)

      // jours theoriques supposes etre travaillés
      let daySupposedToBeWorked = await this.getAllDaySupposedToBeWorkedForChild(4, 2018, presencesTheoriques)
      // console.log('DAYS SUPPOSED TO BE WORKED ', daySupposedToBeWorked)

      /* ~~~~ coeur du traitement ~~~~ */
      // on regarde si l'enfant a une periode d'adaptation courant du mois
      let datedebadapt = new Date(facture.dateDebAdaptation)
      // console.log('fdatedebfacture', facture.dateDebAdaptation)
      // console.log('datedebut ', datedebadapt)
      let datefinadapt = new Date(facture.dateFinAdaptation)
      // console.log('datefinadapt ', datefinadapt)
      // console.log('azertyuiopqsdfghjklmwxcvbn  ', datefinadapt)
      // console.log(datefinadapt.getMonth())

      // si la periode d adaptation passe par le mois de la facture
      // console.log(datedebadapt.getMonth() <= facture.mois -1 && datedebadapt.getFullYear() == facture.annee)
      // console.log((datefinadapt.getMonth() >= facture.mois - 1 && datefinadapt.getFullYear() == facture.annee))
      // console.log('esreseseseses  ', datefinadapt)
      if ((datedebadapt.getMonth() <= facture.mois - 1 && datedebadapt.getFullYear() === facture.annee) && (datefinadapt.getMonth() >= facture.mois - 1 && datefinadapt.getFullYear() === facture.annee)) {
        // console.log('et de 1')

        // si le debut de la periode d'adaptation se trouve courant du mois
        if (datedebadapt.getMonth() === facture.mois - 1 && datedebadapt.getFullYear() === facture.annee) {
          // console.log('et de 2')
          debutAdapt = datedebadapt
          // console.log('debhvyvyvyvyfv ', debutAdapt)
        } else {
          // console.log('et de 3')
          debutAdapt = new Date(facture.annee + '-' + facture.mois + '-1')
        }

        // console.log('et mtn????????', datefinadapt)
        // si la fin de periode d'adaptation se trouve courant du mois
        if (datefinadapt.getMonth() === facture.mois - 1 && datefinadapt.getFullYear() === facture.annee) {
          // console.log('et de 4')
          finAdapt = new Date(datefinadapt)
          // console.log('aqwzsxedcrfvtgbyhnujikolpm     ', finAdapt.getDate())
          finAdapt.setDate(finAdapt.getDate() - 1)
          // console.log('mlokijunhybgvfrcdexswqa   ', finAdapt.getDate())
        } else {
          // console.log('et de 5')
          // console.log(this.calcNbJourMois(facture.mois, facture.annee))
          finAdapt = new Date(facture.annee + '-' + facture.mois + '-' + this.calcNbJourMois(facture.mois, facture.annee))
        }
      }
      // console.log('verfytfytdytdt     '+ debutAdapt + ' ' + finAdapt)


      // s'il y a une periode d'adaptation dans le mois :
      if (debutAdapt != null && finAdapt != null) {
        JoursNonAdapt = this.getAllDayNonAdaptDuMois(daySupposedToBeWorked, debutAdapt, finAdapt, facture)
        // console.log('0000  jour non adapt du mois', JoursNonAdapt)
        JoursreelsPourNonAdapt = this.getAllDayReelsPourNonAdapt(presencesreelles.presencesreelles, finAdapt)
        // console.log('1111  jour reels non adapt ', JoursreelsPourNonAdapt)
        // console.log(presencesreelles.presencesreelles)
        dureePourForfait = this.calcNbJourMois(facture.mois, facture.annee) - JoursNonAdapt.length
      } else {
        JoursNonAdapt = daySupposedToBeWorked
        JoursreelsPourNonAdapt = presencesreelles.presencesreelles
        // console.log('on traite une presence normale  ', JoursNonAdapt + '   ', JoursreelsPourNonAdapt)
      }

      /* ~~~~ On commence par le traitement pour le forfait ~~~~ */

      // calculs des letiables pour facture (ou partie de facture au forfait */

      // console.log('--------------------------ICI------------------------------')
      // console.log(JoursNonAdapt)
      facture = this.traitementPresencesPourForfait(JoursNonAdapt, JoursreelsPourNonAdapt, presencesTheoriques, facture)
      // Tous les "petits" calculs
      facture = this.calcNbJoursActivite(facture, dureePourForfait)
      facture = this.calcNbHeuresNormales(facture, dureePourForfait)
      facture = this.calcDateLimiteDePaiement(facture)
      facture = this.calcTotJoursAbs (facture)
      facture = this.calcTotIndemnitesPourAbs(facture, prixEntretien)
      facture = this.calcTotIndemnitesPourFeries(facture, prixEntretien)
      facture = this.calcTotCoutSuppPresencesExcept(facture, prixEntretien)
      facture = this.calcTotIndemnitesMensuelles(facture, prixEntretien)

      /* ~~~~ traitement pour adaptation lorsqu'il y en a une ~~~~ */

      if (debutAdapt != null && finAdapt != null) {
        let dayOfAdaptReels = this.getAllDayReelsPourAdapt(presencesreelles.presencesreelles, debutAdapt, finAdapt)
        // console.log('---------------**********  DAY OF ADATRYTIDYYRDYU DRDVDTDRT g  ', dayOfAdaptReels )
        // console.log(datedebadapt  + ' ' + datefinadapt)
        facture = this.traitementPresencesPourAdaptation(dayOfAdaptReels, facture)
      }

      // calculs finaux
      facture.coutIndemniteAuReel = this.calcIndemnitesJoursAuReel(prixEntretien)
      facture.coutGouter = this.calcCoutGouter(facture, prixGouter)
      facture.salaireNet = this.calcSalaireNet(facture)
      facture.coutCongesPayes = this.calcPrixCongesPayes(facture)
      facture.coutTotalDesIndemnites = this.calcTotalIndemnites(facture)
      facture.montantNetAPayer = this.calcTotalNetAPayer(facture)

      console.log('azertytfghgh   ', facture)
      return facture
    } catch (e) {
      console.log('ICI', e)
    }

  },

  // donne à la facture les parametres de base
  initDonneesBasics(facture, infosBasiques) {
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

  //calcul du nombre de jours où l'enfant est theoriquement présent
  calcNombreJoursTheoriques(facture, presencesTheoriques) {
    let presTheo = null
    for (let i = 0; i < presencesTheoriques.presencestheoriques.length; i++) {
      presTheo = presencesTheoriques.presencestheoriques[i]
      if (presTheo.heure_arrivee != null) {
        facture.nbJoursPresenceTheo = facture.nbJoursPresenceTheo + 1
      }
    }
    return facture
  },
  // calcul du nombre de jours d'activites
  calcNbJoursActivite(facture, dureeForfait) {

    // si tout le mois est payé au forfait
    if (dureeForfait == null) {
      facture.nombreJoursActivite = facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur)/12 - facture.nbJoursAbsence + facture.nbJoursPresenceExcept
    } else {
      facture.nombreJoursActivite = (facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur)/12)*(dureeForfait/30.4) - facture.nbJoursAbsence + facture.nbJoursPresenceExcept
    }

    // console.log('calc nb de jours d\'activite ' + facture.nombreJoursActivite)

    return facture
  },

  // calcul du nombre d'heures normales du mois
  calcNbHeuresNormales(facture, dureeForfait) {

    // si tout le mois est paye au forfait
    if (dureeForfait == null) {
      facture.nombreHeuresNormales = ((52 - facture.nbSemainesCongesEmployeur - facture.nbSemainesCongesAssMat) / 12) * facture.nbHeureSemaine - facture.nbHeuresAbsencesJust - facture.nbHeuresRetardsJustifies
    } else {
      facture.nombreHeuresNormales = (((52 - facture.nbSemainesCongesEmployeur - facture.nbSemainesCongesAssMat) / 12) * facture.nbHeureSemaine) * (dureeForfait/30.4) - facture.nbHeuresAbsencesJust - facture.nbHeuresRetardsJustifies
    }

    // console.log('calc nb heures normales ' + facture.nombreHeuresNormales)

    return facture
  },

  // calcul date limite de paiement -> voir si est à faire
  calcDateLimiteDePaiement(facture) {
    let date = new Date(facture.annee, facture.mois, (facture.dateLimitePaiement + 4))
    facture.dateLimitePaiement = moment(date).format('L')
    // console.log(date)
    return facture
  },

  // calcul du nombre total de jours d'absence
  calcTotJoursAbs (facture) {
    facture.nbJoursAbsence = facture.nbJoursAbsJust + facture.nbJoursAbsNonJust
    return facture
  },

  // calcul du total des indemnites pour absence
  calcTotIndemnitesPourAbs(facture, prixEntretien) {
    facture.coutTotalIndemnitesAbs = facture.nbJoursAbsence * prixEntretien
    // console.log('calc total indemnites pour absences ' + facture.coutTotalIndemnitesAbs)
    return facture
  },

  // calcul du total des indemnites pour jours feries
  calcTotIndemnitesPourFeries(facture, prixEntretien) {
    facture.coutTotalIndemnitesJoursFeries = (facture.nbJourFeriesNonPayes + facture.nbJoursFériés) * prixEntretien
    // console.log('calc tot indemnites jours feries ' + facture.coutTotalIndemnitesJoursFeries)
    return facture
  },

  // calcul du total des indemnites à ajouter pour presence exceptionnelle
  calcTotCoutSuppPresencesExcept(facture, prixEntretien) {
    facture.coutTotalJoursExceptionnels = facture.nbJoursPresenceExcept * prixEntretien
    // console.log('calc tot cout supp presence exceptionnelle ' + facture.coutTotalJoursExceptionnels)
    return facture
  },

  // calcul indemnites entretien mensuelles
  calcTotIndemnitesMensuelles(facture, prixEntretien, dureeForfait) {
    if (dureeForfait == null){
      facture.indemnitesMensuelles = (prixEntretien * facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) / 12).toFixed(2)
    } else {
      facture.indemnitesMensuelles = ((prixEntretien * facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) / 12).toFixed(2))*(dureeForfait/30.4)
    }
    // console.log('calc total indemnites mensuelles ' + facture.indemnitesMensuelles)
    return facture
  },

  // calcul le cout des gouters pris dans le mois
  calcCoutGouter(facture, prixGouter) {
    // facture.coutGouter = facture.nbGouters * prixGouter
    // console.log('prix des gouters  ', facture.coutGouter)
    return facture.nbGouters * prixGouter
  },

  // calcul du cout d entretien des jours au reel
  calcIndemnitesJoursAuReel (facture, prixEntretien) {
    // facture.coutIndemniteAuReel = facture.nombreJoursAuReel * prixEntretien
    return facture.nombreJoursAuReel * prixEntretien
  },

  // calcul du salaire net
  calcSalaireNet(facture) {
    // facture.salaireNet = (facture.nombreHeuresNormales * facture.salaireHoraireNormal + facture.nombreHeuresMajorees * facture.salaireHoraireNormal * (1 + ((facture.taux_majore) / 100))).toFixed(2)
    // console.log('calc salaire net ' + facture.salaireNet)
    return (facture.nombreHeuresNormales * facture.salaireHoraireNormal + facture.nombreHeuresMajorees * facture.salaireHoraireNormal * (1 + ((facture.taux_majore) / 100))).toFixed(2)
  },

  // calcul des conges payés
  calcPrixCongesPayes(facture) {
    // facture.coutCongesPayes = (facture.salaireNet * 0.1).toFixed(2)
    // console.log('calc conges payes ' + facture.coutCongesPayes)
    return (facture.salaireNet * 0.1).toFixed(2)
  },

  // calcul du total des indemnites (gouters y compris)
  calcTotalIndemnites(facture) {
    // facture.coutTotalDesIndemnites = (facture.indemnitesMensuelles - facture.coutTotalIndemnitesAbs - facture.coutTotalIndemnitesJoursFeries + facture.coutTotalJoursExceptionnels + facture.coutGouter + facture.coutIndemniteAuReel).toFixed(2)
    // console.log('calc total indemnites ' + facture.coutTotalDesIndemnites)
    return (facture.indemnitesMensuelles - facture.coutTotalIndemnitesAbs - facture.coutTotalIndemnitesJoursFeries + facture.coutTotalJoursExceptionnels + facture.coutGouter + facture.coutIndemniteAuReel).toFixed(2)

  },

  // calcul du montant net à payer
  calcTotalNetAPayer(facture) {
    // console.log(facture.salaireNet)
    // console.log(facture.coutCongesPayes)
    // console.log(facture.totalDesIndemnites)
   // facture.montantNetAPayer = (parseInt(facture.salaireNet) + parseInt(facture.coutCongesPayes) + parseInt(facture.coutTotalDesIndemnites)).toFixed(2)
    // console.log(facture.montantNetAPayer)
    return (parseInt(facture.salaireNet) + parseInt(facture.coutCongesPayes) + parseInt(facture.coutTotalDesIndemnites)).toFixed(2)
  },

  // donne le nombre de jours du mois
  calcNbJourMois (numMois, annee) {
    let nbJoursMois = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let nbJours

    if (numMois == 2) {
      if (annee % 4 == 0) {
        nbJours = nbJoursMois[1][1]
      } else {
        nbJours = nbJoursMois[1][0]
      }
    } else {
      nbJours = nbJoursMois[numMois - 1]
    }
    return nbJours
  },

  // recupere tous les jours d'un mois auxquels l'ass mat a doit garder l enfant
  // presencesTheoriques est le tableau des presences theoriques de l'enfant

  getAllDaySupposedToBeWorkedForChild(numMois, annee, presencesTheoriques) {
    let nbJoursMois = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let nbJours = 0  // nombre de jours dans le mois
    let joursTravailles = [] // tous les jours du mois où l'ass mat est supposée travailler pour l'enfant
    let idTypesJoursTheoriques = [] //tous les id des jours pendant lesquels l'ass mat est supposée travailler pour l'enfant

    // console.log('111111111111111111111111111111111111111111111111111111111111111111111111111111111')
    // console.log(presencesTheoriques)

    // on commence par recuperer tous les id types jours auxquels l'ass mat doit travailler pour l'enfant
    let presTheo
    for (let i = 0; i < presencesTheoriques.presencestheoriques.length; i++) {
      presTheo = presencesTheoriques.presencestheoriques[i]
      if (presTheo.heure_arrivee != null) {
        if (presTheo.id_type_jour == 0) {
          presTheo.id_type_jour = 7
        }
        idTypesJoursTheoriques.push(presTheo.id_type_jour)
        // console.log('ID TYPES JOUTRS THEO :')
        // console.log(idTypesJoursTheoriques)
      }
    }

    // on recherche le nombre de jours du mois (cas particulier pour fevrier pris en compte)
    if (numMois == 2) {
      if (annee % 4 == 0) {
        nbJours = nbJoursMois[1][1]
      } else {
        nbJours = nbJoursMois[1][0]
      }
    } else {
      nbJours = nbJoursMois[numMois - 1]
      // console.log('nb jours moooooooooooooooooooooooooooooooois   ', nbJours)
    }
    // let date2 = new Date('2018-04-01')
    // console.log(date2.getDay())
    // console.log('date2  ', date2)
    // on récupère tous les jours du mois supposée être travaillés
    for (let i = 1; i < nbJours + 1; i++) {
      let date = new Date(annee + '-' + numMois+ '-' + i)
      // console.log('date du i ', date)
      // console.log('serais-tu le coupable ', date.getDay())
      if (idTypesJoursTheoriques.includes(date.getDay())) {
        joursTravailles.push(date)
      }
    }
    return joursTravailles
  },

  // on fait le traitement des jours, fonction des preseneces reelles et theoriques
  // Ici s'occupe du cas où on n'est pas en periode d'adaptation
  // presencesTheoDuMois est un tableau des jours du mois où l'enfant est supposé etre present (obtenu par getAllDaySupposedToBeWorkedForChild)
  // presencesReellessDuMois est un tableau des jours (triés par date croissante) du mois où l'enfant a ete present (et avec toutes les infos heure arrivee reelle etc)
  // presencesTheo est le tableau des presences theoriques de l'enfant correspond à presencesTheo (ecrit plus avant)
  // facture est la facture qu on traite et qui va etre modifiée au fur et à mesure du traitement
  traitementPresencesPourForfait (presencesTheoDuMois, presencesReellesDuMois, presencesTheo, facture) {
    let i = 0 // indice sur presencesTheoDuMois
    let j = 0 // indice sur presencesReellesDuMois
    let datereelle // contient la valeur sous forme de date de la date de la presence reelle
    let idJour // contient la valeur de l'id type jour
    let compHeureArrivee // contient la difference entre l'heure d'arrivee reelle et theorique
    let compHeureDepart // contient la difference entre l'heure de depart reelle et theorique
    let tempsJournee // contient le nombre d'heures travaillées theoriquement dans la journée

    // console.log('PRESENCES THEO MOIS ', presencesTheoDuMois)
    // console.log('PRESENCES REELLES MOIS ', presencesReellesDuMois)
    // console.log('taille r  ', presencesReellesDuMois.length)
    // console.log('taille t  ', presencesTheoDuMois.length)
    while (i < presencesTheoDuMois.length && j < presencesReellesDuMois.length ) {
      // console.log('here i = ' + i, 'j = ' + j)
      // console.log('presence reelle = ', presencesReellesDuMois[j].datepresencereelle)
      // console.log('presence theo = ', presencesTheoDuMois[i])

      datereelle = new Date(presencesReellesDuMois[j].datepresencereelle)
      datereelle.setDate(datereelle.getDate() - 1)

      // console.log('a ', datereelle)
      // console.log('a ',datereelle.getDate())
      // console.log('a ',presencesTheoDuMois[i].getDate())
      // console.log('a ',datereelle.getDate() == presencesTheoDuMois[i].getDate())

      // si une presence reelle a bien ete enregistrée pour cette date
      if (datereelle.getDate() === presencesTheoDuMois[i].getDate()) {
        // console.log('meme jour')
        idJour = datereelle.getDay()
        let depart = presencesTheo.presencestheoriques[idJour - 1].heure_depart
        let arrivee = presencesTheo.presencestheoriques[idJour - 1].heure_arrivee

        tempsJournee = this.calcDuree(arrivee, depart)

        // regarde s'il s'agit d'une absence
        if ((presencesReellesDuMois[j]).absence_justifiee != null) {
          // console.log('abs')

          // regarde si est une absence justifiee ou non
          if (presencesReellesDuMois[j].absence_justifiee === true) {
            facture.nbJoursAbsJust = facture.nbJoursAbsJust + 1
            // console.log('ICIICICICICCICIICICICICICICIICIC ', facture.nbJoursAbsJust)
            facture.nbHeuresAbsencesJust = facture.nbHeuresAbsencesJust + tempsJournee
            // console.log('abs just')
          } else {
            facture.nbJoursAbsNonJust = facture.nbJoursAbsNonJust + 1
            // console.log('ICIICICICICCICIICICICICICICIICIC ', facture.nbJoursAbsNonJust)
            // console.log('abs nn just')
          }
        } else { // cas d'une presence normale
          // console.log('presence normale')

          // traitement sur l'heure d arrivee
          if (presencesReellesDuMois[j].heure_arrivee_r !== presencesTheo.presencestheoriques[idJour - 1].heure_arrivee) {
            compHeureArrivee = this.calcDuree(presencesReellesDuMois[j].heure_arrivee_r, presencesTheo.presencestheoriques[idJour - 1].heure_arrivee)

            // si c'est un retard 'justifié'
            if (compHeureArrivee > 0) {
              facture.nbHeuresRetardsJustifies = facture.nbHeuresRetardsJustifies + compHeureArrivee
              // console.log('retard arr just')

              // si arrive en avance
            } else if (compHeureArrivee < 0) {
              facture.nombreHeuresSupp = facture.nombreHeuresSupp + compHeureArrivee
              // console.log('arr en avance')
            }
          }

          // traitement sur l'heure de depart
          if (presencesReellesDuMois[j].heure_depart_r !== presencesTheo.presencestheoriques[idJour - 1].heure_depart) {
            compHeureDepart = this.calcDuree(presencesReellesDuMois[j].heure_depart_r, presencesTheo.presencestheoriques[idJour - 1].heure_depart)

            // si est un départ anticipé justifié (on le met dans retard justifie)
            if (compHeureDepart < 0) {
              facture.nbHeuresRetardsJustifies = facture.nbHeuresRetardsJustifies - compHeureDepart
              // console.log('parti plus tot justifie')

              // si part plus tard
            } else if (compHeureDepart > 0) {
              facture.nombreHeuresSupp = facture.nombreHeuresSupp + compHeureDepart
              // console.log('parti plus tard')
            }
          }
          if (presencesReellesDuMois[j].prends_gouter_r === true) {
            facture.nbGouters = facture.nbGouters + 1
          }
        }
        j = j + 1
        i = i + 1
        if (j === presencesReellesDuMois.length && i < presencesTheoDuMois.length) {
          // console.log('j (reelle) a atteint limite et i non')
        }
        if (j < presencesReellesDuMois.length && i === presencesTheoDuMois.length) {
          // console.log('i (theo) a atteint limite et j non')
        }
      } else {
        // console.log('pas meme date')
        // s'il n'y a pas d'enregistrement de presence reelle correspondant a la presence theorique dans le mois
        // i.e. c'est un jour férié ou un jour de conges
        if (datereelle.getDate() > presencesTheoDuMois[i].getDate()) {
          idJour = presencesTheoDuMois[i].getDay()
          // console.log('date r > date t')
          /* let depart = presencesTheo.presencestheoriques[idJour - 1].heure_depart
          let arrivee = presencesTheo.presencestheoriques[idJour - 1].heure_arrivee

          tempsJournee = this.calcDuree(arrivee, depart)

          facture.nombreHeuresNormales = facture.nombreHeuresNormales + tempsJournee */

          // si c'est un jour férié

          if (facture.datesJoursFeries.includes(presencesTheoDuMois[i].getDate())) {
            facture.nbJoursFériés = facture.nbJoursFériés + 1
            // console.log('jour ferie')
          }
          i = i + 1
          // il y a une date reelle non renseignee dans les dates theoriques i.e. presence exceptionnelle
        } else {
          // console.log('presence except')
          facture.nombreHeuresSupp = facture.nombreHeuresSupp + this.calcDuree(presencesReellesDuMois[j].heure_arrivee_r, presencesReellesDuMois[j].heure_depart_r)
          facture.nbJoursPresenceExcept = facture.nbJoursPresenceExcept + 1
          if (presencesReellesDuMois[j].prends_gouter_r === true) {
            facture.nbGouters = facture.nbGouters + 1
          }

          j = j + 1
        }
      }
    }

    // console.log('la nouvelle facture :  ', facture)
    return facture
  },

  // recupere tous les jours du mois constituant la periode d'adaptation a partir des jours supposés etre travaillés
  getAllDayNonAdaptDuMois (presencesTheoDuMois, dateDebAdapt, dateFinAdapt, facture) {
    // console.log('zerfcvfgbvhjuhnjnjnhhjuhnujhbujhnjuh ', presencesTheoDuMois)
    // console.log('zerfcvfgbvhjuhnjnjnhhjuhnujhbujhnjuh ', dateFinAdapt)
    // console.log('zerfcvfgbvhjuhnjnjnhhjuhnujhbujhnjuh ', dateDebAdapt)
    let presencesNondAdaptation = []
    console.log('coucou1')
    for (let i = 0; i < presencesTheoDuMois.length; i++) {
      if (presencesTheoDuMois[i].getDate() >= dateFinAdapt.getDate()) {
        presencesNondAdaptation.push(new Date(facture.annee + '-' + facture.mois + '-' + presencesTheoDuMois[i].getDate()))
      }
    }
    // console.log('getalldaynonadapt retourne  ' + presencesNondAdaptation)
    return presencesNondAdaptation
  },

  getAllDayReelsPourNonAdapt (presencesReellesDuMois, dateFinAdapt) {
    let presReellesNonAdapt = []
    let datecourante // date que l on traite dans le for
    for (let i = 0; i < presencesReellesDuMois.length; i++) {
      // console.log('on traite la date ', presencesReellesDuMois[i].datepresencereelle)
      datecourante = new Date(presencesReellesDuMois[i].datepresencereelle)
      datecourante.setDate(datecourante.getDate() - 1)
      if (datecourante.getDate() > dateFinAdapt.getDate()) {
        // console.log('hey')
        presReellesNonAdapt.push(presencesReellesDuMois[i])
      }
    }
    // console.log('le retour de presence reelle non adapt = ', presReellesNonAdapt)
    // console.log('le retour de presence reelle non adapt = ', presReellesNonAdapt[0])
    return presReellesNonAdapt
  },

  getAllDayReelsPourAdapt (presencesReellesDuMois, dateDebutAdapt, dateFinAdapt) {
    let presReellesAdapt = []
    let datecourante
    // console.log('LES DAAAATES ' + dateDebutAdapt + '  ' + dateFinAdapt)
    for (let i = 0; i < presencesReellesDuMois.length; i++) {
      datecourante = new Date(presencesReellesDuMois[i].datepresencereelle)
      datecourante.setDate(datecourante.getDate() - 1)
      // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa ', presencesReellesDuMois[i])
      // console.log('get date de courante ', datecourante.getDate())
      // console.log('date fin ad ', dateFinAdapt.getDate())
      // console.log('date deb ad ', dateDebutAdapt.getDate())
      if (datecourante.getDate() <= dateFinAdapt.getDate() && datecourante.getDate() >= dateDebutAdapt.getDate()) {
        // console.log('coucou toi')
        presReellesAdapt.push(presencesReellesDuMois[i])
      }
    }
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    // console.log('le retour de presence reelle adapt = ', presReellesAdapt)
    return presReellesAdapt
  },

  // presencesReellesDuMois correspond au tableau des presences reelles trié par dates croissantes
  traitementPresencesPourAdaptation (presencesReellesAdap, facture) {
    // console.log('helloe ' + facture.nombreHeuresNormales)
    // console.log('helloe2 ' + facture.nombreJoursActivite)
    // console.log('helloe3 ' + facture.nbGouters)
    for (let i = 0; i < presencesReellesAdap.length; i++) {
      // console.log('PRESENCEEEEUUUHHH ', presencesReellesAdap[i].datepresencereelle)
      if (presencesReellesAdap[i].heure_arrivee_r != null) {
        facture.nombreJoursAuReel = facture.nombreJoursAuReel + 1
        facture.nombreHeuresNormales = facture.nombreHeuresNormales + this.calcDuree(presencesReellesAdap[i].heure_arrivee_r, presencesReellesAdap[i].heure_depart_r)
        facture.nombreJoursActivite = parseInt(facture.nombreJoursActivite) + 1
        if (presencesReellesAdap[i].prends_gouter_r === true) {
          facture.nbGouters = facture.nbGouters + 1
        }
        // console.log('hello ' + facture.nombreHeuresNormales)
        // console.log('hello2 ' + facture.nombreJoursActivite)
        // console.log('hello3 ' + facture.nbGouters)
      }
    }
    return facture
  },

  // calcule la difference en heures de deux temps avec temps2 > temps1
  calcDuree (temps1, temps2) {
    let heure1 = null
    let heure2 = null

    let minute1 = null
    let minute2 = null

    // split le temps de facon a obtenir les heures et les minutes distinctement
    let tempsMinute1 = null // temps total en minute
    let tempsMinute2 = null // temps total en heure
    let splitPetit = temps1.split(':', 2)
    let splitGrand = temps2.split(':', 2)

    heure1 = splitPetit[0]
    minute1 = splitPetit[1]

    heure2 = splitGrand[0]
    minute2 = splitGrand[1]

    tempsMinute1 = parseInt(heure1) * 60 + parseInt(minute1)
    tempsMinute2 = parseInt(heure2) * 60 + parseInt(minute2)

    // calcul de la duree
    let duree = tempsMinute2 - tempsMinute1
    duree = FonctionMath.arrondi(duree / 60, 1)

    return duree
  },

  JoursFeries (an) {
    let JourAn = new Date(an + '-01-01')
    let FeteTravail = new Date(an + '-05-01')
    let mai45 = new Date(an + '-05-08')

    let FeteNationale = new Date(an + '-07-14')
    let Assomption = new Date(an + '-08-15')
    let Toussaint = new Date(an + '-11-01')
    let Armistice = new Date(an + '-11-11')
    let Noel = new Date(an + '-12-25')
    // let SaintEtienne = new Date(an +'-12-26')

    let G = an % 19
    let C = Math.floor(an / 100)
    let H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
    let I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
    let J = (an * 1 + Math.floor(an / 4) + I + 2 - C + Math.floor(C / 4)) % 7
    let L = I - J
    let MoisPaques = 3 + Math.floor((L + 40) / 44)
    let JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
    let Paques = new Date(an, MoisPaques, JourPaques)
    // let VendrediSaint = new Date(an, MoisPaques-1, JourPaques-2)
    let LundiPaques = new Date(an, MoisPaques - 1, JourPaques + 1)
    let Ascension = new Date(an, MoisPaques - 1, JourPaques + 39)
    let Pentecote = new Date(an, MoisPaques - 1, JourPaques + 49)
    let LundiPentecote = new Date(an, MoisPaques - 1, JourPaques + 50)

    return [JourAn, Paques, LundiPaques, FeteTravail, mai45, Ascension, Pentecote, LundiPentecote,
      FeteNationale, Assomption, Toussaint, Armistice, Noel]
  }
}
