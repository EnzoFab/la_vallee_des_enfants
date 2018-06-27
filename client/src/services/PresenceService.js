import Api from '../services/Api'

export default {

  /* --------------------------------------- GET ----------------------------------------------------------- */

  // récupérer toutes les présences théo à partir de l'id d'un contrat
  getAllPresencesTheoriquesByContrat (numContrat) {
    return Api().get('presencetheo/all/' + numContrat)
  },

  // récupérer toutes les présences réelles d'un mois (et année)
  getAllPresencesReellesMoisByContrat (numContrat, mois, annee) {
    return Api().get('presencereelle/all/' + annee + '/' + mois + '/' + numContrat)
  },
  // recupere tous les enfants présent aujourd'hui
  getEnfantsDuJour () {
    return Api().get('/presencetheo/enfantDuJour')
  },
  getEnfantsNonPresebtDujour () {
    return Api().get('/presencetheo/enfantNonPresentDuJour')
  },

  // récupère tous les enfants censés être présents et étant présents exceptionnellemnt
  getAllChildrenOfTheDay () { // non valide
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('/presencetheo/' + day + '/allchildren')
  },

  // récupère tous les enfants ne devant pas être présents
  getAllChildrenNotOfTheDay () {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('/presencetheo/' + day + '/allchildrennp')
  },

  // récupère l'id de la présence réelle du jour
  recupIdPresTheoDuJour (credential) {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('/presencetheo/' + credential + '/' + day)
  },

  // dit s'il existe une présence réelle pour l'enfant à la date du jour
  estEnregistreAujourdhui (credential) {
    var date = new Date()
    return Api().get('/presencereelle/existe/?date=' + date + '&enfant=' + credential)
  },

  getAllPresenceBefore (date) {
    return Api().get('/presencereelle/allBefore/' + date)
  },

  getAllPresenceContratBefore (date, numContrat) {
    return Api().get('/presencereelle/allBefore/' + date + '/?numContrat=' + numContrat)
  },

  /* --------------------------------------- POST ----------------------------------------------------------- */

  // creéer une présence réelle
  enregistrerPresence (credential) {
    return Api().post('/presencereelle/create', credential)
  },

  // enregistrer une absence
  enregistrerAbsence (credential) {
    return Api().post('presencereelle/createAbs', credential)
  },

  // enregistrer une présence exceptionnelle
  enregistrerPresenceExc (credential) {
    return Api().post('/presencereelle/createPresExc', credential)
  },

  /* --------------------------------------- PUT ----------------------------------------------------------- */

  // mettre à jour l'heure d'arrivée réelle
  majHeureArrivee (credential) {
    return Api().put('/presencereelle/majHeureArrivee', credential)
  },

  // mettre à jour l'heure de depart réelle
  majHeureDepart (credential) {
    return Api().put('/presencereelle/majHeureDepart', credential)
  },

  // mettre à jour le gouter de la presence réelle
  majGouter (credential) {
    return Api().put('/presencereelle/majGouter', credential)
  },

  // mettre à jour une absence (ou transformer une présence en absence)
  majAbsence (credential) {
    return Api().put('/presencereelle/majAbs', credential)
  }
}
