import Api from '../services/Api'

export default {

  /* --------------------------------------- GET ----------------------------------------------------------- */


  /* --------------------------------------- POST ----------------------------------------------------------- */

  // creéer une présence réelle
  enregistrerPresence (credential) {
    return Api().post('/presencereelle/create', credential)
  },

  updatePresence (credential) {
    return Api().put('/presencereelle/update', credential)
  },

  supprimerPresent (id_presence) {
    return Api().delete('/presencereelle/supprimer/' + id_presence)
  },

  getAllPresenceBefore (date) {
    return Api().get('/presencereelle/allBefore/' + date)
  },

  getAllPresenceContratBefore (date, numContrat) {
    return Api().get('/presencereelle/allBefore/' + date + '/?numContrat=' + numContrat)
  }
}
