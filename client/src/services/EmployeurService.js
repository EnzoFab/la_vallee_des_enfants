import Api from '../services/Api'

export default {

  /* ------------------------------------------ GET ------------------------------------------------------ */

  getListTuteurEnfant () {
    return Api().get('/employeurs/employeursEnfants')
  },

  findOne (idEmployeur) {
    return Api().get('/employeur/' + idEmployeur)
  },

  /* ------------------------------------------ POST ------------------------------------------------------ */

  createEmployeur (credentials) {
    return Api().post('/employeurs/create', credentials)
  },

  /* ------------------------------------------ PUT ------------------------------------------------------ */

  updateEmp (data) {
    return Api().put('/employeurs/modifEmp', data)
  }
}
