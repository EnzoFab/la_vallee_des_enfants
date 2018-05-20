import FactureService from '../services/FactureService';
import PresenceService from '../services/PresenceService';
import TypeService from '../services/TypeService'
import ContratService from '../services/ContratService'


export default {
  async data () {
    // Recupere toutes les informations générales
    const basic = await FactureService.getInfosBasics('monprems1')
    let infosBasiques = basic.data

    const gouter = TypeService.gouter()
    let prixGouter = gouter.data.gouter

    const entretien = TypeService.indemnitesJour()
    let prixEntretien = entretien.data.entretien

    const presencesTheo = ContratService.getPresencesByContrat('monprems1')
    const presencesTheoriques = presencesTheo

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
      nbHeuresRetardsJustifies: 0 // nombre d'heures de retard à decompter car consideres comme justifies par l ass mat
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
      }
    }
  },
  // calcul du nombre de jours d'activites
  calcNbJoursActivite(facture) {
    facture.NombreJoursActivite = facture.nbJoursPresenceTheo*(52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) - facture.nbJoursAbsence + facture.nbJoursPresenceExcept
  },

  // calcul du nombre d'heures normales du mois
  calcNbHeuresNormales(facture) {
    facture.nombreHeuresNormales = (52 - facture.nbSemainesCongesEmployeur - facture.nbSemainesCongesAssMat)/12 + facture.nombreHeuresNormales - facture.nbHeuresAbsencesJust - facture.nbHeuresRetardsJustifies
  },

  // calcul date limite de paiement -> voir si est à faire
  calcDateLimiteDePaiement (facture) {

  },

  // calcul du total des indemnites pour absence
  calcTotIndemnitesPourAbs (facture) {
    facture.coutTotalIndemnitesAbs = facture.nbJoursAbsence * prixEntretien
  },

  // calcul du total des indemnites pour jours feries
  calcTotIndemnitesPourFeries (facture) {
    facture.coutTotalIndemnitesJoursFeries = (facture.nbJourFeriesNonPayes + facture.nbJoursFériés) * prixEntretien
  },

  // calcul du total des indemnites à ajouter pour presence exceptionnelle
  calcTotIndemnitesPresencesExcept (facture) {
    facture.coutTotalJoursExceptionnels = facture.nbJoursPresenceExcept * prixEntretien
  },

  // calcul indemnites entretien mensuelles --- A FAIRE EN FN DE COMMENT CA SE PASSE POUR LES GOUTERS
  calcTotIndemnitesMensuelles (facture) {
    facture.indemnitesMensuelles = prixEntretien * facture.nbJoursPresenceTheo * (52 - facture.nbSemainesCongesAssMat - facture.nbSemainesCongesEmployeur) / 12
  },

  // calcul du salaire net
  calcSalaireNet(facture) {
    facture.salaireNet = facture.nombreHeuresNormales * 3.25 + facture.nombreHeuresMajorees * 3.25 * (1 + ((facture.taux_majore) / 100))
  },

  // calcul des conges payés
  calcPrixCongesPayes (facture) {
    facture.coutCongesPayes = facture.salaireNet * 0.1
  },

  // calcul du total des indemnites  --- SOUSTRAIRE EN PLUS LES GOUTERS SI BESOIN!!!!!
  calcTotalIndemnites (facture) {
    facture.coutTotalDesIndemnites = facture.indemnitesMensuelles - facture.coutTotalIndemnitesAbs - facture.coutTotalIndemnitesJoursFeries + facture.coutTotalJoursExceptionnels
  },

  // calcul du montant net à payer
  calcTotalNetAPayer (facture) {
    facture.montantNetAPayer = facture.salaireNet + facture.coutcongesPayes + facture.totalDesIndemnites
  },

  // recupere tous les jours d'un mois auxquels l'ass mat a doit garder l enfant
  getAllDaySupposedToBeWorkedForChild(numMois, annee, presencesTheoriques) {
    var nbJours = 0

    var joursTravailles
  }
}

