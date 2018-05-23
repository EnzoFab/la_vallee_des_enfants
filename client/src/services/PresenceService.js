import Api from '../services/Api'

export default {

  // recuperer toutes les presences theo a partir de l id d'un contrat
  getAllPresencesTheoriquesByContrat (numContrat) {
    return Api().get('presencetheo/all/' + numContrat)
  },

  // recuperer toutes les presences reelles d'un mois (et annee)
  getAllPresencesReellesMoisByContrat (numContrat, mois, annee) {
    return Api().get('presencereelle/all/' + annee + '/' + mois + '/' + numContrat)
  },

  // recupere tous les enfants censés etre presents et etant presents exceptionnellemnt
  getAllChildrenOfTheDay () {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('presencetheo/' + day + '/allchildren')
  },

  // recupere tous les enfants ne devant pas etre presents
  getAllChildrenNotOfTheDay () {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('presencetheo/' + day + '/allchildrennp')
  },

  // recupere l'id de la presence reelle du jour
  recupIdPresTheoDuJour (credential) {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('presencetheo/' + credential + '/' + day)
  },

  // dit s'il existe une presence reelle pour l'enfant a la date du jour
  estEnregistreAujourdhui (credential) {
    var date = new Date()
    return Api().get('presencereelle/existe/?date=' + date + '&enfant=' + credential)
  },

  // creer une presence reelle
  enregistrerPresence (credential) {
    return Api().post('presencereelle/create', credential)
  },

  // mettre à jour l'heure d'arrivee reelle
  majHeureArrivee (credential) {
    return Api().put('presencereelle/majHeureArrivee', credential)
  },

  // mettre a jour l heure de depart reelle
  majHeureDepart (credential) {
    return Api().put('presencereelle/majHeureDepart', credential)
  },

  // mettre à jour le gouter de la presence reelle
  majGouter (credential) {
    return Api().put('presencereelle/majGouter', credential)
  },

  // enregistrer une absence
  enregistrerAbsence (credential) {
    return Api().post('presencereelle/createAbs', credential)
  },

  // mettre à jour une absence (ou transformer une presence en absence)
  majAbsence (credential) {
    return Api().put('presencereelle/majAbs', credential)
  },

  // enregistrer une presence exceptionnelle
  enregistrerPresenceExc (credential) {
    return Api().post('presencereelle/createPresExc', credential)
  },

  getAllPresenceBefore (date) {
    return Api().get('/presencereelle/allBefore/' + date)
  },

  getAllPresenceContratBefore (date, numContrat) {
    return Api().get('/presencereelle/allBefore/' + date + '/?numContrat=' + numContrat)
  }
}
