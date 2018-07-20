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
