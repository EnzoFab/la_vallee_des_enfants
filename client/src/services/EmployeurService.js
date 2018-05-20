import Api from '../services/Api'

export default {
  createEmployeur (credentials) {
    return Api().post('/employeurs/create', credentials)
  },

  updateEmp (data) {
    return Api().put('/employeurs/modifEmp', data)
  },

  getListTuteurEnfant () {
    return Api().get('/employeurs/employeursEnfants')
  },
  findOne (idEmployeur) {
    return Api().get('/employeur/' + idEmployeur)
  }
}
