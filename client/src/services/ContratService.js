import Api from '../services/Api'

export default {

  /* ------------------------------------------ GET ------------------------------------------------------ */

  donneesContrat (numContrat) {
    return Api().get('/contrat/getAllById/' + numContrat)
  },

  donneesParents (credentials) {
    return Api().get('/contrat/getTuteursById/' + credentials)
  },

  findOne (numContrat) {
    return Api().get('/contrat/getAllById/' + numContrat)
  },

  getAllEnCours () {
    return Api().get('/contrat/allEnCours')
  },

  getAllTermines () {
    return Api().get('/contrat/allTermines')
  },

  getAllByIdEmployeur (numEmployeur) {
    return Api().get('/contrat/getAllByIdEmployeur/' + numEmployeur)
  },

  getPresencesByContrat (numContrat) {
    return Api().get('/contrat/getPresences/' + numContrat)
  },

  /* ------------------------------------------ POST ------------------------------------------------------ */

  create (data) {
    return Api().post('/contrat/create', data)
  },

  /* ------------------------------------------ PUT ------------------------------------------------------ */

  updateInfosEmp (numContrat, data) {
    return Api().put('/contrat/employeur/' + numContrat, data)
  },

  updateEnfant (numContrat, data) {
    return Api().put('/contrat/enfant/' + numContrat, data)
  },

  updateInfoG (numContrat, credential) {
    return Api().put('/contrat/infosGenerales/' + numContrat, credential)
  },

  updateHeureHebdo (numContrat, credential) {
    return Api().put('/contrat/presence/' + numContrat, credential)
  },

  updateTarif (numContrat, credential) {
    return Api().put('/contrat/tarifs/' + numContrat, credential)
  },

  updateDateFin (numContrat) {
    return Api().put('/contrat/cloturer/' + numContrat)
  }

}
