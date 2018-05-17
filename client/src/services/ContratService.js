import Api from '../services/Api'

export default {
  donneesContrat (credentials) {
    return Api().get('/contrat/getAllById/' + credentials)
  },

  donneesParents (credentials) {
    console.log('contrat service')
    return Api().get('/contrat/getTuteursById/' + credentials)
  },

  findOne (numContrat) {
    return Api().get('/contrat/getAllById/' + numContrat)
  },

  getAll () {
    return Api().get('/contrat/all')
  },

  create (data) {
    return Api().post('/contrat/create', data)
  },

  updateInfosEmp (numContrat, data) {
    return Api().put('/contrat/employeur/' + numContrat, data)
  },

  updateEnfant (numContrat, data) {
    return Api().put('/contrat/enfant/' + numContrat , data)
  },

  updateInfoG (numContrat, credential) {
    return Api().put('/contrat/infosGenerales/' + numContrat , credential)
  },
  updateHeureHebdo (numContrat, credential) {
    return Api().put('/contrat/presence/' + numContrat, credential)
  },
  updateTarif (numContrat, credential) {
    return Api().put('/contrat/tarifs/' + numContrat, credential)
  }

}
