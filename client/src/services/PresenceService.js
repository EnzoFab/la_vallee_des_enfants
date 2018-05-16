import Api from '../services/Api'

export default {
  getAllChildrenOfTheDay () {
    var date = new Date()
    var day = date.getDay()
    return Api().get('presencetheo/' + day + '/allchildren')
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
    return Api().put('presencereelle/majGouter', credential)
  },
  enregistrerAbsence (credential) {
    return Api().post('presencereelle/createAbs', credential)
  }
}
