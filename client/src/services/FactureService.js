import Api from './Api'

export default {

  /* ------------------------------------------ GET ------------------------------------------------------ */
  factureExistante (idContrat, mois, annee) {
    return Api().get(`/factures/existe?numcontrat=${idContrat}&mois=${mois}&annee=${annee}`)
  },

  getInfosBasics (idcontrat) {
    return Api().get('/factures/basics/' + idcontrat)
  },

  getDonneesFactureDuMois (idContrat, numMois, annee) {
    return Api().get('/factures/infos/' + idContrat + '/' + annee + '/' + numMois)
  },

  getAllByIdContrat (numContrat) {
    return Api().get('/factures/all/' + numContrat)
  },

  /* ------------------------------------------ POST ------------------------------------------------------ */

  createFacture (data) {
    return Api().post('/factures/create', data)
  },

  initFacture (data) {
    return Api().post('/factures/initFacture', data)
  },

  /* ------------------------------------------ PUT ------------------------------------------------------ */

  updateInfosFacture (data) {
    return Api().put('/factures/updateInfos', data)
  },

  updateHeuresMajo (data) {
    return Api().put('/factures/updateHeuresMajo', data)
  }
}
