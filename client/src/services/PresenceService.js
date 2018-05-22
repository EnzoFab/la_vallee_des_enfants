import Api from '../services/Api'

export default {
  getAllChildrenOfTheDay () {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('presencetheo/' + day + '/allchildren')
  },
  getAllChildrenNotOfTheDay () {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('presencetheo/' + day + '/allchildrennp')
  },
  recupIdPresTheoDuJour (credential) {
    var date = new Date()
    var day = date.getDay()
    if (day === 0) {
      day = 7
    }
    return Api().get('presencetheo/' + credential + '/' + day)
  },
  estEnregistreAujourdhui (credential) {
    var date = new Date()
    return Api().get('presencereelle/existe/?date=' + date + '&enfant=' + credential)
  },
  enregistrerPresence (credential) {
    console.log(credential.presence.heure_arrivee)
    return Api().post('presencereelle/create', credential)
  },
  majHeureArrivee (credential) {
    return Api().put('presencereelle/majHeureArrivee', credential)
  },
  majHeureDepart (credential) {
    return Api().put('presencereelle/majHeureDepart', credential)
  },
  majGouter (credential) {
    console.log(credential.presence.a_pris_gouter)
    return Api().put('presencereelle/majGouter', credential)
  },
  enregistrerAbsence (credential) {
    return Api().post('presencereelle/createAbs', credential)
  },
  majAbsence (credential) {
    return Api().put('presencereelle/majAbs', credential)
  },
  enregistrerPresenceExc (credential) {
    return Api().post('presencereelle/createPresExc', credential)
  }
}
