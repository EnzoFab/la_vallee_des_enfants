import Api from '../services/Api'

export default {
  createEmployeur (credentials) {
    return Api().post('/employeurs/create', credentials)
  },

  updateEmp (data) {
    return Api().put('/employeurs/modifEmp', data)
  }
}
